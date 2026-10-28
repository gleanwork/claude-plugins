#!/usr/bin/env node
// PreToolUse hook for Claude Code.
//
// Records Claude Code's live permission mode before each Glean run_tool call,
// so the MCP server can skip its own elicitation gate when the user launched
// with --dangerously-skip-permissions (permission_mode "bypassPermissions").
//
// This hook makes no permission decision and prints nothing. Claude Code's
// normal permission flow always runs. The server's elicitation prompt still
// gates writes, except for tools the user told it to stop asking about.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

function readStdin() {
  try {
    return fs.readFileSync(0, "utf-8");
  } catch {
    return "";
  }
}

let input = {};
try {
  input = JSON.parse(readStdin());
} catch {
  // Malformed/empty input: nothing to record.
}

const toolName = String(input.tool_name ?? "");
const bareName = toolName.split("__").pop() ?? "";
// Scope strictly to this plugin's run_tool — the tool name carries the glean
// plugin/server prefix (e.g. mcp__plugin_local-mcp_glean_plugin__run_tool).
if (!toolName.includes("glean") || bareName !== "run_tool") {
  process.exit(0);
}

// The hook process does not inherit the MCP server's env, so read the flag
// from the plugin's own .mcp.json.
let env = {};
try {
  const root = process.env.CLAUDE_PLUGIN_ROOT ?? ".";
  const cfg = JSON.parse(fs.readFileSync(path.join(root, ".mcp.json"), "utf-8"));
  // The server is named "glean_plugin" in the shipped .mcp.json (namespaced
  // under "glean" so it's recognizable alongside a user-connected remote
  // Glean server, e.g. "glean_default"). Keep fallbacks to the prior names
  // ("glean-local", then the original "glean") for backwards compatibility
  // with older installs.
  env =
    cfg?.mcpServers?.["glean_plugin"]?.env ??
    cfg?.mcpServers?.["glean-local"]?.env ??
    cfg?.mcpServers?.glean?.env ??
    {};
} catch {
  // No readable config: nothing to record.
}

// The server reads the marker only when its own elicitation gate is on.
if (env.ENABLE_HITL === "true") {
  // Written on every run_tool call and keyed by session id, so it is always
  // fresh for the call that immediately follows and never leaks across
  // sessions. The base dir and session-id sanitization MUST match
  // run-tool.ts (permissionModeMarkerPath) and start.sh's PLUGIN_DATA_DIR:
  // CLAUDE_PLUGIN_DATA when set, else ~/.glean. Best-effort — a failed write
  // just means the server keeps prompting.
  try {
    const permissionMode = String(input.permission_mode ?? "");
    const sessionId = String(input.session_id ?? "")
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .slice(0, 64);
    if (permissionMode && sessionId) {
      const base =
        process.env.CLAUDE_PLUGIN_DATA || path.join(os.homedir(), ".glean");
      const dir = path.join(base, "glean-hitl-mode");
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(
        path.join(dir, `${sessionId}.json`),
        JSON.stringify({ permission_mode: permissionMode, ts: Date.now() }),
      );
    }
  } catch {
    // Ignore: see above.
  }
}
process.exit(0);
