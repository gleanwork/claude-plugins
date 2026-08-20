#!/usr/bin/env node
// PreToolUse hook for Claude Code.
//
// When HITL is enabled, run_tool is gated by the plugin's own elicitation
// prompt, so Claude Code's separate native "allow this tool?" prompt is
// redundant (the double-prompt). With ENABLE_HITL=true we auto-approve the
// run_tool call, leaving the HITL elicitation as the single gate.
//
// Safety: run_tool is read-only ONLY while HITL gates it. This hook runs only
// under Claude Code, which always advertises the elicitation capability, so
// ENABLE_HITL=true means run_tool's HITL prompt is active — never an ungated
// write. When ENABLE_HITL is not "true" the hook does nothing and the normal
// permission flow runs.
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
  // Malformed/empty input: do nothing, let the normal permission flow run.
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
  // No readable config: do nothing.
}

if (env.ENABLE_HITL === "true") {
  // Record Claude Code's live permission mode so the MCP server can skip its
  // own elicitation gate when the user launched with
  // --dangerously-skip-permissions (permission_mode "bypassPermissions").
  // Written on every run_tool call and keyed by session id, so it is always
  // fresh for the call that immediately follows and never leaks across
  // sessions. The base dir and session-id sanitization MUST match
  // run-tool.ts (permissionModeMarkerPath) and start.sh's PLUGIN_DATA_DIR:
  // CLAUDE_PLUGIN_DATA when set, else ~/.glean. Best-effort — marker I/O must
  // never break the approval decision below.
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
    // Ignore: a failed marker write just means the server keeps prompting.
  }

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "allow",
        permissionDecisionReason:
          "Glean run_tool is gated by its own HITL elicitation prompt; suppressing the redundant native prompt while ENABLE_HITL is on.",
      },
    }),
  );
}
process.exit(0);
