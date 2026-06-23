# Glean Plugins for Claude Code

> **Generated repository.** Built from
> [gleanwork/agent-plugins](https://github.com/gleanwork/agent-plugins) via
> [pluginpack](https://github.com/gleanwork/pluginpack). Don't hand-edit managed
> files here — changes are made in `agent-plugins` and synced down automatically.

Official Glean plugins for [Claude Code](https://claude.com/claude-code) —
enterprise knowledge, search, people, code, and meetings, right in your
development workflow.

## ⚠️ v3.0.0 — plugins consolidated (one-time migration)

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

```
/plugin marketplace add gleanwork/claude-plugins
/plugin install glean@glean-plugins
/plugin install glean-dev-docs@glean-plugins
```

Then connect a Glean MCP server — ask Claude to "set up Glean" and the `glean`
plugin's `connect-glean` skill walks you through it. Skills auto-trigger by task.

## Plugins

| Plugin | Description |
|--------|-------------|
| **[glean](plugins/glean)** | Enterprise knowledge — search docs/Slack/email, cross-repo code exploration, people & experts, meeting prep & catch-up, onboarding, productivity. |
| **[glean-dev-docs](plugins/glean-dev-docs)** | Search Glean's public developer documentation — APIs, SDKs, MCP, and integration guides. |

## Requirements

- [Claude Code](https://claude.com/claude-code) (latest version)
- A Glean account with MCP access
- Your Glean MCP server URL (find it at [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean)); format: `[server-url]/mcp/[server-name]`

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [Glean Support](https://help.glean.com)
- [GitHub Issues](https://github.com/gleanwork/claude-plugins/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.
