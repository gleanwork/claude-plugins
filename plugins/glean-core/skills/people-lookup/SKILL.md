---
name: people-lookup
description: Use when the user asks about people, employees, team members, org structure, or expertise. Triggers on phrases like "who works on", "who is responsible for", "who owns", "find someone who knows", "who should I talk to", "who reports to", "team members", "org chart", or any question starting with "who" about the company.
---

# People Lookup via Glean

When users ask about people in the organization, use Glean's employee search and activity signals to find the right person.

## Tool Naming

See the `glean-tools-guide` skill for Glean MCP tool naming conventions. Tools follow the pattern `mcp__glean_[server-name]__[tool]` where the server name is dynamic. Use whatever Glean server is available in your tool list.

## When This Applies

Use this approach when users ask:
- "Who works on [system/project]?"
- "Who is [name]?" or "What team is [name] on?"
- "Who should I talk to about [topic]?"
- "Who owns [component/service]?"
- "Who reports to [manager]?"
- "Find someone who knows about [technology]"

## Tool Selection

| User Intent | Glean Tool |
|-------------|------------|
| Find by name, role, team | `employee_search` |
| Find by code contributions | `code_search` |
| Find by document authorship | `search` with `owner:` filter |
| Complex expertise analysis | `chat` |

## Critical: Use employee_search for People Queries

**Never use regular `search` for people lookups.** The `employee_search` tool is specifically designed for:
- Name lookups
- Role/title searches
- Team/department queries
- Org chart navigation
- Reporting relationships

## Query Examples

```
# Find by name
employee_search "John Smith"

# Find by team
employee_search "payments team"

# Find direct reports
employee_search "reportsto:\"Jane Doe\""

# Find by role type
employee_search "engineering managers"

# Find recent hires
employee_search "startafter:2024-01-01"
```

## Finding Expertise (Not Just Role)

For "who actually knows about X" questions, combine signals:

1. **Official role**: `employee_search "[topic]"`
2. **Code activity**: `code_search "[topic] owner:\"name\""`
3. **Doc authorship**: `search "[topic] RFC owner:\"name\""`

People with multiple signals are true experts.

## Relationship to Commands

For comprehensive expertise discovery, suggest:
- `/glean-people:find-expert <topic>` - Multi-signal expertise analysis
- `/glean-people:stakeholders <change>` - Find who needs to be involved
- `/glean-docs:onboarding <team>` - Get to know a new team
