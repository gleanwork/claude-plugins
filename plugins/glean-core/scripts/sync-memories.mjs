#!/usr/bin/env node

// sync-memories.mjs — Stop hook for glean-core plugin.
// Periodically uploads Claude Code memory files to Glean Memory via MCP.
// Receives JSON on stdin: { "session_id": "...", "cwd": "...", "hook_event_name": "Stop" }
// Cross-platform: macOS (Keychain), Windows (Credential Manager), Linux (credentials file).

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join, sep } from "path";
import { homedir, platform } from "os";
import { execSync } from "child_process";
import { request } from "https";

const CADENCE_SECONDS = 3600; // 1 hour
const HOME = homedir();
const STATE_DIR = join(HOME, ".claude", "hooks-state");
const STATE_FILE = join(STATE_DIR, "glean-memory-sync.jsonl");
const CLAUDE_CONFIG_PATH = join(HOME, ".claude.json");

// ---------------------------------------------------------------------------
// 1. Read hook input from stdin
// ---------------------------------------------------------------------------
function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

const input = readStdin();
let cwd;
try {
  cwd = JSON.parse(input).cwd;
} catch {}
if (!cwd) process.exit(0);

// ---------------------------------------------------------------------------
// 2. Resolve project directory from CWD
//    Claude Code stores projects in ~/.claude/projects/<encoded-path>/
//    Encoding: replace path separators with "-" and remove "." chars.
//    We find the matching project by checking ~/.claude.json projects keys.
// ---------------------------------------------------------------------------
let claudeConfig;
try {
  claudeConfig = JSON.parse(readFileSync(CLAUDE_CONFIG_PATH, "utf8"));
} catch {
  process.exit(0);
}

const projects = claudeConfig.projects || {};
let bestMatch = "";
for (const projPath of Object.keys(projects)) {
  if (cwd.startsWith(projPath) && projPath.length > bestMatch.length) {
    bestMatch = projPath;
  }
}
if (!bestMatch) process.exit(0);

// Encode path: replace separators with "-" and remove dots
// On Windows paths use \, on Unix /. Both become "-".
const projectEncoded = bestMatch
  .replace(/[\\/]/g, "-")
  .replace(/\./g, "");
const projectDir = join(HOME, ".claude", "projects", projectEncoded);

// ---------------------------------------------------------------------------
// 3. Cadence check — skip if last sync for this project was less than 1 hour ago
//    State is stored as JSONL, one {"project":"...","ts":...} per line.
// ---------------------------------------------------------------------------
mkdirSync(STATE_DIR, { recursive: true });
const now = Math.floor(Date.now() / 1000);

if (existsSync(STATE_FILE)) {
  try {
    const lines = readFileSync(STATE_FILE, "utf8").split("\n");
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const entry = JSON.parse(line);
        if (entry.project === projectEncoded) {
          const elapsed = now - (entry.ts || 0);
          if (elapsed < CADENCE_SECONDS) process.exit(0);
          break;
        }
      } catch {}
    }
  } catch {}
}

// ---------------------------------------------------------------------------
// 4. Extract OAuth token — platform-specific credential retrieval
//    macOS:   Keychain via `security find-generic-password`
//    Windows: Credential Manager via `cmdkey` / PowerShell
//    Linux:   ~/.claude/.credentials.json file fallback
// ---------------------------------------------------------------------------
function getCredentialsFromKeychain() {
  const os = platform();

  if (os === "darwin") {
    // macOS Keychain
    try {
      const raw = execSync(
        'security find-generic-password -s "Claude Code-credentials" -w',
        { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
      );
      return JSON.parse(raw.trim());
    } catch {
      return null;
    }
  }

  if (os === "win32") {
    // Windows: try PowerShell to read from Credential Manager
    try {
      const psScript = `
        Add-Type -AssemblyName System.Security
        $cred = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto(
          [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR(
            (Get-StoredCredential -Target "Claude Code-credentials").Password
          )
        )
        Write-Output $cred
      `.trim();
      const raw = execSync(
        `powershell -NoProfile -Command "${psScript.replace(/"/g, '\\"')}"`,
        { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
      );
      return JSON.parse(raw.trim());
    } catch {
      // Fallback: try the credentials file
      return readCredentialsFile();
    }
  }

  // Linux and other platforms: file-based credentials
  return readCredentialsFile();
}

function readCredentialsFile() {
  const paths = [
    join(HOME, ".claude", ".credentials.json"),
    join(HOME, ".claude", "credentials.json"),
  ];
  for (const p of paths) {
    try {
      return JSON.parse(readFileSync(p, "utf8"));
    } catch {}
  }
  return null;
}

const creds = getCredentialsFromKeychain();
if (!creds) process.exit(0);

const mcpOAuth = creds.mcpOAuth || {};

// Find configured Glean MCP server URLs from ~/.claude.json
const configuredUrls = new Set();
for (const [name, server] of Object.entries(claudeConfig.mcpServers || {})) {
  if (name.toLowerCase().includes("glean") && server.url) {
    configuredUrls.add(server.url);
  }
}
// Also check project-level mcpServers
for (const projConfig of Object.values(projects)) {
  for (const [name, server] of Object.entries(projConfig.mcpServers || {})) {
    if (name.toLowerCase().includes("glean") && server.url) {
      configuredUrls.add(server.url);
    }
  }
}
if (configuredUrls.size === 0) process.exit(0);

// Find a keychain entry with a valid token matching a configured URL
const nowMs = Date.now();
let bestToken = null;
let bestUrl = null;
let bestExpires = 0;

for (const entry of Object.values(mcpOAuth)) {
  const { serverUrl, accessToken, expiresAt } = entry;
  if (!accessToken || !serverUrl) continue;
  if (expiresAt <= nowMs) continue;
  if (!configuredUrls.has(serverUrl)) continue;
  if (expiresAt > bestExpires) {
    bestToken = accessToken;
    bestUrl = serverUrl;
    bestExpires = expiresAt;
  }
}
if (!bestToken || !bestUrl) process.exit(0);

// ---------------------------------------------------------------------------
// 5. Collect memory files and upload each to Glean Memory
// ---------------------------------------------------------------------------
function mcpCall(serverUrl, token, toolArgs) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: "read_memory",
        arguments: toolArgs,
      },
    });

    const url = new URL(serverUrl);
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "claude-code",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    });
    req.on("error", () => resolve(null));
    req.write(body);
    req.end();
  });
}

async function uploadMemory(filePath) {
  let content;
  try {
    content = readFileSync(filePath, "utf8");
  } catch {
    return;
  }
  if (!content.trim()) return;

  await mcpCall(bestUrl, bestToken, {
    action: "add",
    category: "Preferences",
    content,
  });
}

// Upload global CLAUDE.md
const globalClaudeMd = join(HOME, ".claude", "CLAUDE.md");
if (existsSync(globalClaudeMd)) {
  await uploadMemory(globalClaudeMd);
}

// Upload project memory files
const memoryDir = join(projectDir, "memory");
if (existsSync(memoryDir)) {
  try {
    for (const file of readdirSync(memoryDir)) {
      if (file.endsWith(".md")) {
        await uploadMemory(join(memoryDir, file));
      }
    }
  } catch {}
}

// ---------------------------------------------------------------------------
// 6. Update cadence timestamp for this project
//    Rewrite the JSONL file: update existing project entry or append new one.
// ---------------------------------------------------------------------------
let stateLines = [];
let found = false;

if (existsSync(STATE_FILE)) {
  try {
    for (const line of readFileSync(STATE_FILE, "utf8").split("\n")) {
      if (!line.trim()) continue;
      try {
        const entry = JSON.parse(line);
        if (entry.project === projectEncoded) {
          entry.ts = now;
          found = true;
        }
        stateLines.push(JSON.stringify(entry));
      } catch {
        stateLines.push(line);
      }
    }
  } catch {}
}

if (!found) {
  stateLines.push(JSON.stringify({ project: projectEncoded, ts: now }));
}

writeFileSync(STATE_FILE, stateLines.join("\n") + "\n");
