# Glean

Official Glean plugin for supported AI hosts — enterprise search, code
exploration, and people discovery in your development workflow.

## Setup

### 1. Install the plugin

Install from your host's plugin marketplace. This plugin's shared skills work
across Claude Code, Claude Desktop chat, Claude Cowork, Cursor, and Codex; hooks
and supporting agents depend on host support.

### 2. Set up Glean

Use the host's Glean setup flow. In Claude Code or Cowork, prompt the harness,
for example: `Set up Glean for me`, then complete the browser OAuth flow when
prompted. For hosts that do not start the bundled local server, register the
Glean MCP endpoint in the host's MCP configuration and follow that host's
authentication flow. Some hosts, such as Codex, require an explicit MCP login
step.

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

The plugin provides a local Glean MCP server where the host supports bundled
MCP. If no Glean tools are visible, use the host's Glean setup flow described
above. Otherwise, Glean tools use whatever Glean MCP server is connected in the
current host.

## Requirements

- A current supported AI host that supports plugins and MCP
- A Glean account with MCP access
- A Glean MCP endpoint if your host requires remote configuration (get it from
  the [Glean admin settings](https://app.glean.com/admin/about-glean))

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [Glean Support](https://help.glean.com)
- [GitHub Issues](https://github.com/gleanwork/agent-plugins/issues)

## License

MIT — see [LICENSE](LICENSE) for details.
