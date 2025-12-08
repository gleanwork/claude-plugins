#!/bin/bash
set -euo pipefail

# Check if any Glean MCP servers are configured
# Look for glean in the mcp list output
if claude mcp list 2>/dev/null | grep -qi "glean"; then
  # Glean is configured
  cat << 'EOF'
{
  "systemMessage": "Glean enterprise search is available. You can:\n- Search documents: search tool\n- Find people: employee_search tool\n- Lookup meetings: meeting_lookup tool\n- Search code: code_search tool\n- Get document details: read_document tool\n- Get synthesized answers: chat tool\n\nUse /glean-search for quick searches or /glean-status to check connection."
}
EOF
else
  # Glean is not configured
  cat << 'EOF'
{
  "systemMessage": "Glean plugin is installed but no Glean MCP server is configured. Run /glean-setup to configure your Glean connection. Once configured, you'll have access to enterprise search, document lookup, people finder, meeting intelligence, and code search across your company's knowledge base."
}
EOF
fi
