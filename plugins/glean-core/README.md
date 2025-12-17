# Glean Core

**Required foundation for all Glean plugins.**

This plugin provides shared skills, MCP tool guidance, and configuration commands that all other Glean plugins depend on.

## Installation

```bash
claude plugin install glean-core
```

## What's Included

### Skills
- **glean-tools-guide** - Comprehensive guidance for selecting and using Glean MCP tools
- **enterprise-search** - Triggers for document search queries
- **people-lookup** - Triggers for people/org queries
- **meeting-context** - Triggers for meeting queries

### Commands
- `/glean-core:mcp-setup` - Configure your Glean MCP server connection
- `/glean-core:status` - Check MCP connection status

### Hooks
- **SessionStart** - Automatically checks MCP configuration on session start

## Requirements

- Claude Code CLI
- Glean MCP server configured (run `/glean-core:mcp-setup` to configure)

## Next Steps

After installing glean-core, install the feature plugins you need:

| Plugin | Purpose |
|--------|---------|
| [glean-search](../glean-search) | Enterprise document search |
| [glean-people](../glean-people) | People discovery and expertise |
| [glean-meetings](../glean-meetings) | Meeting intelligence |
| [glean-docs](../glean-docs) | Document analysis |
| [glean-code](../glean-code) | Cross-repo code exploration |

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
