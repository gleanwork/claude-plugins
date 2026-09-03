# Glean Plugins for Claude

> **Generated repository.** Built from
> [gleanwork/agent-plugins](https://github.com/gleanwork/agent-plugins) via
> [pluginpack](https://github.com/gleanwork/pluginpack). Don't hand-edit managed
> files here — changes are made in `agent-plugins` and synced down automatically.

Official Glean plugins for [Claude](https://claude.com) — enterprise knowledge,
search, people, code, and meetings.

> **Surface support:** The shared skills are designed to work across Claude Code,
Claude Desktop chat, and Claude Cowork. Hooks and supporting agents require host
support: Claude Code and Cowork support them, while Claude Desktop chat does not
run them. The plugin provides a local Glean MCP server where the host supports
bundled MCP; otherwise, configure the remote server in the host's MCP settings.
The automated checks validate package structure, not full runtime parity in every
host.

## ⚠️ v3.0.0 — plugins consolidated (one-time migration)

The commands below are for Claude Code. In Claude Desktop or Cowork, use
**Customize → Plugins** to remove the old marketplace and install the consolidated
**Glean** plugin instead.

The nine area-specific plugins (`glean-core`, `glean-search`, `glean-people`,
`glean-meetings`, `glean-docs`, `glean-code`, `glean-skills`,
`glean-productivity`, `glean-project`) are now a **single `glean` plugin**. Same
skills and agents — they auto-trigger by task, so there's no per-area install
anymore. `glean-dev-docs` is unchanged.

Claude Code doesn't auto-migrate renamed plugins, so the old ones will show
**`failed to load`** after you refresh the marketplace. Switch once:

```
/plugin marketplace remove glean-plugins
/plugin marketplace add gleanwork/claude-plugins
/plugin install glean@glean-plugins
/plugin install glean-dev-docs@glean-plugins
```

Restart Claude Code if prompted. `glean` carries everything the old plugins did.

<details><summary>Prefer to migrate plugin-by-plugin?</summary>

```
/plugin marketplace update glean-plugins
/plugin uninstall glean-core@glean-plugins
/plugin uninstall glean-search@glean-plugins
/plugin uninstall glean-people@glean-plugins
/plugin uninstall glean-meetings@glean-plugins
/plugin uninstall glean-docs@glean-plugins
/plugin uninstall glean-code@glean-plugins
/plugin uninstall glean-skills@glean-plugins
/plugin uninstall glean-productivity@glean-plugins
/plugin uninstall glean-project@glean-plugins
/plugin install glean@glean-plugins
```

(`glean-dev-docs` stays as-is.)

</details>

## Quick start (new install)

### Claude Code

```
/plugin marketplace add gleanwork/claude-plugins
/plugin install glean@glean-plugins
/plugin install glean-dev-docs@glean-plugins
```

Then set up Glean by prompting the harness, for example: `Set up Glean for me`.
Complete the browser OAuth flow when prompted. Skills auto-trigger by task.

### Claude Desktop or Cowork

Open **Customize → Plugins**, choose **Add marketplace**, and add
`gleanwork/claude-plugins`. Install **Glean** and **Glean Developer Docs**.

Then ask Claude to `Set up Glean for me` and complete the browser OAuth flow
when prompted. Skills auto-trigger by task.

## Plugins

| Plugin | Description |
|--------|-------------|
| **[glean](plugins/glean)** | Enterprise knowledge — search docs/Slack/email, cross-repo code exploration, people & experts, meeting prep & catch-up, onboarding, productivity. |
| **[glean-dev-docs](plugins/glean-dev-docs)** | Search Glean's public developer documentation — APIs, SDKs, MCP, and integration guides. |

## Requirements

- A current Claude host that supports plugins: [Claude Code](https://claude.com/claude-code), [Claude Desktop](https://claude.com/download), or [Claude Cowork](https://claude.com/product/cowork)
- A Glean account with MCP access
- Your Glean MCP server URL (find it at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean)); format: `[server-url]/mcp/[server-name]`

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [Glean Support](https://help.glean.com)
- [GitHub Issues](https://github.com/gleanwork/claude-plugins/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.
