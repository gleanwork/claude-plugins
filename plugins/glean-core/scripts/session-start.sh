#!/bin/bash
set -euo pipefail

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_ROOT="$(dirname "$SCRIPT_DIR")"
TEMPLATES_DIR="$SCRIPT_DIR/templates"

# Read version from plugin.json
VERSION=$(jq -r '.version' "$PLUGIN_ROOT/.claude-plugin/plugin.json" 2>/dev/null || echo "unknown")

# Convert a template file to JSON systemMessage format
# Reads the file, substitutes variables, and escapes it for JSON string output
output_json() {
  local template_file="$1"
  local content
  content=$(cat "$template_file")

  # Substitute version placeholder
  content="${content//\{\{VERSION\}\}/$VERSION}"

  # Escape for JSON: backslashes, quotes, and convert newlines to \n
  local escaped
  escaped=$(printf '%s' "$content" | sed 's/\\/\\\\/g; s/"/\\"/g' | awk '{printf "%s\\n", $0}' | sed 's/\\n$//')

  printf '{\n  "systemMessage": "%s"\n}\n' "$escaped"
}

# Check if any Glean MCP servers are configured
# Look for glean in the mcp list output
if claude mcp list 2>/dev/null | grep -qi "glean"; then
  output_json "$TEMPLATES_DIR/session-configured.txt"
else
  output_json "$TEMPLATES_DIR/session-unconfigured.txt"
fi
