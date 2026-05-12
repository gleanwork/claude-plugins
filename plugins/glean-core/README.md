# Glean Core

**Required foundation for all Glean plugins.**

Provides the canonical skill for using Glean's MCP tools, plus the commands and hook that configure your Glean MCP server connection.

## Installation

```bash
claude plugin install glean-core
```

## What's included

### Skill

- **`using-glean`** — Auto-triggers when the user asks about anything in enterprise systems (documents, people, meetings, internal code, email, the user's own activity, structured memory, the knowledge graph). The skill teaches Claude how to map the user's question to the right Glean MCP tool and links to per-tool reference files.

  Reference files live under [`skills/using-glean/reference/`](skills/using-glean/reference/) and are loaded only when needed:

  | File | Covers |
  |---|---|
  | `search.md` | The `search` tool: structured params, filters, pitfalls |
  | `chat.md` | The `chat` tool: when synthesis beats raw search |
  | `code-search.md` | The `code_search` tool: inline filters, query patterns |
  | `employee-search.md` | The `employee_search` tool: people, teams, org structure |
  | `meeting-lookup.md` | The `meeting_lookup` tool: dates, transcripts, peer calendars |
  | `gmail-search.md` | The `gmail_search` tool (Google Workspace email) |
  | `outlook-search.md` | The `outlook_search` tool (Microsoft 365 email) |
  | `read-document.md` | The `read_document` tool: full content by URL |
  | `user-activity.md` | The `user_activity` tool: the user's own work history |
  | `memory.md` | `read_memory` + `memory_schema` |
  | `knowledge-graph.md` | `knowledge_graph_query` + `knowledge_graph_schema` |
  | `agents-as-tools.md` | Discovering and invoking dynamic Glean platform agents |
  | `synthesis.md` | Combining multiple tools for cross-source answers |
  | `vetting.md` | Source quality, freshness, authority — before presenting |

### Commands

- `/glean-core:mcp-setup` — Configure your Glean MCP server connection
- `/glean-core:status` — Check MCP connection status

### Hooks

- **SessionStart** — Automatically checks MCP configuration on session start

## Requirements

- Claude Code CLI
- Glean MCP server configured (run `/glean-core:mcp-setup` to configure)

## Next steps

After installing glean-core, install the feature plugins you need:

| Plugin | Purpose |
|---|---|
| [glean-search](../glean-search) | Quick enterprise search workflow |
| [glean-people](../glean-people) | People discovery and expertise workflows |
| [glean-meetings](../glean-meetings) | Meeting catch-up and prep workflows |
| [glean-docs](../glean-docs) | Onboarding and RFC verification workflows |
| [glean-code](../glean-code) | Cross-repo code exploration |
| [glean-productivity](../glean-productivity) | Personal activity, priorities, briefings |
| [glean-project](../glean-project) | Project status and handoff |
| [glean-skills](../glean-skills) | Generate new Claude Code skills from your work patterns |
| [glean-dev-docs](../glean-dev-docs) | Glean platform / SDK documentation |

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
