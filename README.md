# Glean Claude Code Plugins

[![Experimental](https://img.shields.io/badge/-Experimental-D8FD49?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNC4zMDA2IDIuOTU0MjdMMjAuNzY1NiAwLjE5OTk1MUwxNy45MDI4IDMuOTk1MjdDMTMuNTY1MyAxLjkzNDk1IDguMjMwMTkgMy4wODQzOSA1LjE5Mzk0IDcuMDA5ODNDMS42NTg4OCAxMS41NjQyIDIuNDgzIDE4LjExMzggNy4wMzczOCAyMS42NDg5QzguNzcyMzggMjIuOTkzNSAxMC43ODkzIDIzLjcwOTIgMTIuODI3OSAyMy44MTc3QzE2LjE0NjEgMjQuMDEyOCAxOS41MDc3IDIyLjYyNDggMjEuNjc2NSAxOS44MDU1QzI0LjczNDQgMTUuODggMjQuNTE3NSAxMC40MTQ4IDIxLjQ1OTYgNi43Mjc4OUwyNC4zMDA2IDIuOTU0MjdaTTE4LjExOTcgMTcuMDUxMkMxNi4xMDI4IDE5LjYzMiAxMi4zNzI1IDIwLjEwOTEgOS43NzAwMSAxOC4wOTIyQzcuMTg5MTkgMTYuMDc1MiA2LjcxMjA3IDEyLjMyMzMgOC43MjkwMSA5Ljc0MjQ2QzkuNzA0OTQgOC40ODQ1OCAxMS4xMTQ2IDcuNjgyMTQgMTIuNjc2MSA3LjQ4Njk2QzEzLjA0NDggNy40NDM1OCAxMy40MTM1IDcuNDIxOSAxMy43ODIyIDcuNDQzNThDMTQuOTc1IDcuNTA4NjUgMTYuMTI0NCA3Ljk0MjM5IDE3LjA3ODcgOC42Nzk3N0MxOS42NTk1IDEwLjcxODQgMjAuMTM2NiAxNC40NzAzIDE4LjExOTcgMTcuMDUxMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yNC41MTc2IDIxLjY5MjJDMjMuOTMyIDIyLjQ1MTMgMjMuMjgxNCAyMy4xMjM2IDIyLjU2NTcgMjMuNzUyNUMyMS44NzE3IDI0LjMzODEgMjEuMTEyNyAyNC44ODAzIDIwLjMxMDIgMjUuMzM1N0MxOS41Mjk1IDI1Ljc2OTUgMTguNjgzNyAyNi4xMzgyIDE3LjgzNzggMjYuNDIwMUMxNi45OTIgMjYuNzAyIDE2LjEwMjggMjYuODk3MiAxNS4yMTM3IDI3LjAwNTdDMTQuMzI0NSAyNy4xMTQxIDEzLjQzNTMgMjcuMTU3NSAxMi41MjQ0IDI3LjA5MjRDMTEuNjEzNSAyNy4wMjczIDEwLjcyNDMgMjYuODc1NSA5Ljg1Njg0IDI2LjY1ODdMOS42NjE2NSAyNy4zNzQzTDguNzcyNDYgMzAuOTk2MkM5LjkwMDIxIDMxLjI5OTggMTEuMDQ5NyAzMS40NzMzIDEyLjIyMDggMzEuNTZDMTIuMjY0MiAzMS41NiAxMi4zMjkyIDMxLjU2IDEyLjM3MjYgMzEuNTZDMTMuNTAwMyAzMS42MjUxIDE0LjY0OTggMzEuNTgxNyAxNS43NTU4IDMxLjQ1MTZDMTYuOTI3IDMxLjI5OTggMTguMDk4MSAzMS4wMzk1IDE5LjIyNTggMzAuNjcwOEMyMC4zNTM2IDMwLjMwMjIgMjEuNDU5NyAyOS44MjUgMjIuNTAwNyAyOS4yMzk1QzIzLjU2MzQgMjguNjUzOSAyNC41NjEgMjcuOTM4MiAyNS40OTM1IDI3LjE1NzVDMjYuNDQ3OCAyNi4zNTUgMjcuMzE1MyAyNS40NDQyIDI4LjA3NDQgMjQuNDQ2NUMyOC4xODI4IDI0LjMxNjQgMjguMjY5NSAyNC4xNjQ2IDI4LjM3OCAyNC4wMTI4TDI0Ljc3NzkgMjEuMzQ1MkMyNC42Njk0IDIxLjQ1MzcgMjQuNjA0NCAyMS41ODM4IDI0LjUxNzYgMjEuNjkyMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==&labelColor=343CED)](https://github.com/gleanwork/.github/blob/main/docs/repository-stability.md#experimental)

Official Glean plugins for [Claude Code](https://claude.com/claude-code), enabling enterprise knowledge integration directly in your development workflow.

## Quick Start

```bash
# Add the Glean marketplace
/plugin marketplace add gleanwork/claude-plugins

# Install core (required)
/plugin install glean-core

# Install feature plugins you need
/plugin install glean-search
/plugin install glean-meetings
/plugin install glean-people
/plugin install glean-docs
/plugin install glean-code

# Configure your Glean connection
/glean-core:mcp-setup
```

## Plugins

| Plugin | Description | Docs |
|--------|-------------|------|
| **[glean-core](plugins/glean-core)** | Foundation plugin with MCP setup, skills, and agents. **Required by all other plugins.** | [README](plugins/glean-core/README.md) |
| **[glean-search](plugins/glean-search)** | Enterprise search across docs, Slack, email, and more | [README](plugins/glean-search/README.md) |
| **[glean-meetings](plugins/glean-meetings)** | Meeting prep, catch-up, and transcript analysis | [README](plugins/glean-meetings/README.md) |
| **[glean-people](plugins/glean-people)** | Find experts and identify stakeholders | [README](plugins/glean-people/README.md) |
| **[glean-docs](plugins/glean-docs)** | RFC verification and team onboarding | [README](plugins/glean-docs/README.md) |
| **[glean-code](plugins/glean-code)** | Cross-repo code exploration and examples | [README](plugins/glean-code/README.md) |

## Which Plugin Do I Need?

| I want to... | Install |
|--------------|---------|
| Search company docs, Slack, wikis | `glean-core` + `glean-search` |
| Prepare for meetings or catch up after PTO | `glean-core` + `glean-meetings` |
| Find who knows about a topic | `glean-core` + `glean-people` |
| Verify specs match implementation | `glean-core` + `glean-docs` |
| Find code examples across repos | `glean-core` + `glean-code` |
| All of the above | Install all plugins |

## Requirements

- [Claude Code](https://claude.com/claude-code) (latest version)
- A Glean account with MCP access
- Your Glean MCP server URL (format: `https://[instance]-be.glean.com/mcp/[server-name]`)

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [Glean Support](https://help.glean.com)
- [GitHub Issues](https://github.com/gleanwork/claude-plugins/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.
