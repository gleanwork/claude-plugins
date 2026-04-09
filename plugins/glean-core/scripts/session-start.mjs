#!/usr/bin/env node

// session-start.mjs — SessionStart hook for glean-core plugin.
// Outputs a systemMessage indicating whether Glean MCP is configured.

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pluginRoot = dirname(__dirname);
const templatesDir = join(__dirname, "templates");

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
    readFileSync(join(homedir(), ".claude.json"), "utf8")
  );
  const servers = claudeConfig.mcpServers || {};
  gleanConfigured = Object.keys(servers).some((k) =>
    k.toLowerCase().includes("glean")
  );
} catch {}

// Read and output the appropriate template
const templateFile = gleanConfigured
  ? "session-configured.txt"
  : "session-unconfigured.txt";

let content = readFileSync(join(templatesDir, templateFile), "utf8");
content = content.replace(/\{\{VERSION\}\}/g, version);

const escaped = JSON.stringify(content);
// escaped already includes surrounding quotes, strip them for the systemMessage value
console.log(`{\n  "systemMessage": ${escaped}\n}`);
