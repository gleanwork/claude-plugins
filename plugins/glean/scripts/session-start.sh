#!/bin/bash
set -euo pipefail

# Check if any Glean MCP servers are configured
# Look for glean in the mcp list output
if claude mcp list 2>/dev/null | grep -qi "glean"; then
  # Glean is configured
  cat <<'EOF'
{
  "systemMessage": "Glean enterprise search is available. Commands:\n- /glean:catch-up - Catch up on what you missed\n- /glean:meeting-prep - Prepare for meetings\n- /glean:find-expert - Find who knows about a topic\n- /glean:stakeholders - Find stakeholders for a change\n- /glean:onboarding - Onboard to a new team\n- /glean:verify-rfc - Verify RFC against implementation\n- /glean:search <query> - Quick enterprise search\n- /glean:status - Check connection status"
}
EOF
else
  # Glean is not configured
  cat <<'EOF'
{
  "systemMessage": "Glean plugin is installed but no Glean MCP server is configured.\n\nRun /glean:mcp-setup to configure your Glean connection.\n\nOnce configured, you'll have access to:\n- /glean:catch-up - Catch up on what you missed\n- /glean:meeting-prep - Prepare for meetings\n- /glean:find-expert - Find who knows about a topic\n- /glean:stakeholders - Find stakeholders for a change\n- /glean:onboarding - Onboard to a new team\n- /glean:verify-rfc - Verify RFC against implementation"
}
EOF
fi
