#!/usr/bin/env node

// session-start.mjs — SessionStart hook for glean-core plugin.
//
// Non-memory behavior matches main: silent when configured, setup prompt when not.
// Memory disclaimer: shown once when Glean MCP is configured, then silent forever.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pluginRoot = dirname(__dirname);
const templatesDir = join(__dirname, "templates");
const HOME = homedir();
const STATE_DIR = join(HOME, ".claude", "hooks-state");
const SENTINEL = join(STATE_DIR, "glean-memory-disclaimer-shown");

// Read version from plugin.json
let version = "unknown";
try {
  const pluginJson = JSON.parse(
    readFileSync(join(pluginRoot, ".claude-plugin", "plugin.json"), "utf8")
  );
  version = pluginJson.version || "unknown";
} catch {}

// Check if any Glean MCP servers are configured
let gleanConfigured = false;
try {
  const claudeConfig = JSON.parse(
    readFileSync(join(HOME, ".claude.json"), "utf8")
  );
  const servers = claudeConfig.mcpServers || {};
  gleanConfigured = Object.keys(servers).some((k) =>
    k.toLowerCase().includes("glean")
  );
} catch {}

// --- Not configured: show setup prompt (same as main) ---
if (!gleanConfigured) {
  let content;
  try {
    content = readFileSync(join(templatesDir, "session-unconfigured.txt"), "utf8");
  } catch {
    process.exit(0);
  }
  content = content.replace(/\{\{VERSION\}\}/g, version);
  console.log(`{\n  "systemMessage": ${JSON.stringify(content)}\n}`);
  process.exit(0);
}

// --- Configured + already shown disclaimer: silent (same as main) ---
if (existsSync(SENTINEL)) {
  process.exit(0);
}

// --- Configured + first time: show one-time memory disclaimer ---
let content;
try {
  content = readFileSync(join(templatesDir, "session-configured.txt"), "utf8");
} catch {
  process.exit(0);
}
content = content.replace(/\{\{VERSION\}\}/g, version);
content +=
  "\nGlean is continuously learning your preferences. To disable, edit your settings.json hooks config or run `claude config` to remove the glean-core Stop hook.";

try {
  mkdirSync(STATE_DIR, { recursive: true });
  writeFileSync(SENTINEL, new Date().toISOString());
} catch {}

console.log(`{\n  "systemMessage": ${JSON.stringify(content)}\n}`);
