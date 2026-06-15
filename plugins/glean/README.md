# Glean for Claude Code

Official Glean plugin for [Claude Code](https://claude.com/claude-code) — enterprise search,
code exploration, and people discovery directly in your development workflow.

## Setup

### 1. Install the plugin

Install from the Claude Code plugin marketplace.

### 2. Configure your Glean MCP server

Add your Glean MCP server (get your server URL from the [Glean MCP configurator](https://app.glean.com/settings/install?mcpConfigure=true)):

```bash
claude mcp add glean https://YOUR-INSTANCE-be.glean.com/mcp/default --transport http --scope user
```

Restart Claude Code after adding — OAuth authentication is handled automatically on first use.

## What's Included

The plugin ships a library of skills (plus supporting agents) that auto-trigger
by task — there's no per-skill install. They cover:

- **Enterprise search & knowledge** — find documents, Slack messages, and email; vet results for freshness and authority.
- **Code across repos** — explore implementations, find usage examples and similar code, identify code owners, and gather architectural context.
- **People & org** — find experts by contribution, and identify stakeholders for a change or project.
- **Meetings** — prep for upcoming meetings and catch up on what you missed.
- **Onboarding & projects** — ramp up on a team or area, read quick project status, and generate comprehensive project handoffs.
- **Personal productivity** — summarize your own activity, prep status updates, and surface what needs your attention.
- **Skill authoring** — discover automation opportunities and generate new skills.

Glean tools are used through whatever Glean MCP server is connected in Claude
Code; if none is configured, see the setup above.

## Requirements

- [Claude Code](https://claude.com/claude-code) (latest version)
- A Glean account with MCP access
- Your Glean MCP server URL (get it from the [Glean MCP configurator](https://app.glean.com/settings/install?mcpConfigure=true))

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [Glean Support](https://help.glean.com)
- [GitHub Issues](https://github.com/gleanwork/agent-plugins/issues)

## License

MIT — see [LICENSE](LICENSE) for details.
