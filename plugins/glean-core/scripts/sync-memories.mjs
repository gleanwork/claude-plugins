#!/usr/bin/env node

// sync-memories.mjs — Stop hook for glean-core plugin.
// Periodically uploads Claude Code memory files to Glean Memory via MCP.
// Receives JSON on stdin: { "session_id": "...", "cwd": "...", "hook_event_name": "Stop" }
// Cross-platform: macOS (Keychain), Windows (Credential Manager), Linux (credentials file).

import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join, sep } from "path";
import { homedir, platform } from "os";
import { execSync } from "child_process";
import { request } from "https";

const CADENCE_SECONDS = 86400; // 24 hours
const HOME = homedir();
const STATE_DIR = join(HOME, ".claude", "hooks-state");
const STATE_FILE = join(STATE_DIR, "glean-memory-sync.jsonl");
const CLAUDE_CONFIG_PATH = join(HOME, ".claude.json");
const LOG_FILE = join(STATE_DIR, "glean-memory-sync.log");

function log(msg) {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${msg}\n`;
  try {
    mkdirSync(STATE_DIR, { recursive: true });
    appendFileSync(LOG_FILE, line);
  } catch {}
}

log("--- sync-memories.mjs invoked ---");

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
log(`stdin: ${input.trim() || "(empty)"}`);
let cwd;
try {
  cwd = JSON.parse(input).cwd;
} catch (e) {
  log(`ERROR parsing stdin JSON: ${e.message}`);
}
if (!cwd) {
  log("EXIT: no cwd in input");
  process.exit(0);
}

// ---------------------------------------------------------------------------
// 2. Resolve project directory from CWD
//    Claude Code stores projects in ~/.claude/projects/<encoded-path>/
//    Encoding: replace path separators and "." chars with "-".
//    We find the matching project by checking ~/.claude.json projects keys.
// ---------------------------------------------------------------------------
let claudeConfig;
try {
  claudeConfig = JSON.parse(readFileSync(CLAUDE_CONFIG_PATH, "utf8"));
} catch (e) {
  log(`EXIT: cannot read ${CLAUDE_CONFIG_PATH}: ${e.message}`);
  process.exit(0);
}

const projects = claudeConfig.projects || {};
let bestMatch = "";
for (const projPath of Object.keys(projects)) {
  if (cwd.startsWith(projPath) && projPath.length > bestMatch.length) {
    bestMatch = projPath;
  }
}
if (!bestMatch) {
  log(`EXIT: no matching project for cwd=${cwd} (keys: ${Object.keys(projects).join(", ")})`);
  process.exit(0);
}
log(`matched project: ${bestMatch}`);

// Encode path: replace separators and dots with "-".
// On Windows paths use \, on Unix /. Both become "-". Dots in path segments
// (e.g. usernames like "first.last") also become "-" — Claude Code does the
// same when computing ~/.claude/projects/<encoded> dir names.
const projectEncoded = bestMatch
  .replace(/[\\/]/g, "-")
  .replace(/\./g, "-");
const projectDir = join(HOME, ".claude", "projects", projectEncoded);

// ---------------------------------------------------------------------------
// 3. Cadence check — skip if last sync for this project was less than 24 hours ago
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
          if (elapsed < CADENCE_SECONDS) {
            log(`EXIT: cadence skip — last sync ${elapsed}s ago (< ${CADENCE_SECONDS}s)`);
            process.exit(0);
          }
          log(`cadence OK — last sync ${elapsed}s ago`);
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
if (!creds) {
  log("EXIT: no credentials found");
  process.exit(0);
}
log("credentials retrieved OK");

const mcpOAuth = creds.mcpOAuth || {};

// Find configured Glean MCP server hostnames from ~/.claude.json
const configuredHosts = new Set();
for (const [name, server] of Object.entries(claudeConfig.mcpServers || {})) {
  if (name.toLowerCase().includes("glean") && server.url) {
    try { configuredHosts.add(new URL(server.url).hostname); } catch {}
  }
}
// Also check project-level mcpServers
for (const projConfig of Object.values(projects)) {
  for (const [name, server] of Object.entries(projConfig.mcpServers || {})) {
    if (name.toLowerCase().includes("glean") && server.url) {
      try { configuredHosts.add(new URL(server.url).hostname); } catch {}
    }
  }
}
if (configuredHosts.size === 0) {
  log("EXIT: no Glean MCP server hosts found in config");
  process.exit(0);
}
log(`found ${configuredHosts.size} Glean MCP host(s): ${[...configuredHosts].join(", ")}`);

// Find a keychain entry with a valid token matching a configured host
const nowMs = Date.now();
let bestToken = null;
let bestUrl = null;
let bestExpires = 0;

for (const entry of Object.values(mcpOAuth)) {
  const { serverUrl, accessToken, expiresAt } = entry;
  if (!accessToken || !serverUrl) continue;
  if (expiresAt <= nowMs) continue;
  let entryHost;
  try { entryHost = new URL(serverUrl).hostname; } catch { continue; }
  if (!configuredHosts.has(entryHost)) continue;
  if (expiresAt > bestExpires) {
    bestToken = accessToken;
    bestUrl = serverUrl;
    bestExpires = expiresAt;
  }
}
if (!bestToken || !bestUrl) {
  log(`EXIT: no valid OAuth token (checked ${Object.keys(mcpOAuth).length} entries, ${configuredHosts.size} configured hosts)`);
  process.exit(0);
}
log(`using token for ${bestUrl} (expires ${new Date(bestExpires).toISOString()})`);

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
        name: "memory",
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
      res.on("end", () => {
        log(`MCP response (${res.statusCode}): ${data.substring(0, 200)}`);
        resolve(data);
      });
    });
    req.on("error", (e) => {
      log(`MCP request error: ${e.message}`);
      resolve(null);
    });
    req.write(body);
    req.end();
  });
}

async function uploadMemory(content, projectName) {
  if (!content.trim()) {
    log(`SKIP empty content for project=${projectName}`);
    return;
  }

  log(`uploading for project=${projectName} (${content.length} chars)`);
  // Always use "add" — the server enforces keep(1) per project_name via
  // evict_oldest policy, which only triggers on add (not update).
  await mcpCall(bestUrl, bestToken, {
    action: "add",
    memory_source: "ClaudeCode",
    category: "NativeMemories",
    content,
    options: { project_name: projectName },
  });
}

// Upload global CLAUDE.md
const globalClaudeMd = join(HOME, ".claude", "CLAUDE.md");
if (existsSync(globalClaudeMd)) {
  log("uploading global CLAUDE.md");
  try {
    const content = readFileSync(globalClaudeMd, "utf8");
    await uploadMemory(content, "~");
  } catch (e) {
    log(`ERROR reading global CLAUDE.md: ${e.message}`);
  }
} else {
  log("no global CLAUDE.md found");
}

// Upload project memory files — concat all .md files into one entry
const memoryDir = join(projectDir, "memory");
log(`checking memory dir: ${memoryDir}`);
if (existsSync(memoryDir)) {
  try {
    const files = readdirSync(memoryDir).filter(f => f.endsWith(".md"));
    log(`found ${files.length} memory files: ${files.join(", ")}`);
    const parts = [];
    for (const file of files) {
      try {
        const text = readFileSync(join(memoryDir, file), "utf8");
        if (text.trim()) parts.push(`# ${file}\n\n${text}`);
      } catch (e) {
        log(`ERROR reading ${file}: ${e.message}`);
      }
    }
    if (parts.length > 0) {
      const merged = parts.join("\n\n---\n\n");
      log(`merged ${parts.length} files into ${merged.length} chars`);
      await uploadMemory(merged, bestMatch);
    } else {
      log("no non-empty memory files to upload");
    }
  } catch (e) {
    log(`ERROR reading memory dir: ${e.message}`);
  }
} else {
  log(`memory dir does not exist: ${memoryDir}`);
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
log("sync complete, state file updated");
