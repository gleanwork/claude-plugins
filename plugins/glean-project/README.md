# glean-project

Project handoff documents powered by Glean - generate comprehensive handoff documents when transitioning project ownership.

## Overview

This plugin helps you create thorough handoff documents by synthesizing documentation, people, meetings, and decisions from across your enterprise tools. Perfect for team transitions, PTO coverage, or project ownership changes.

## Installation

```bash
claude plugins add gleanwork/claude-plugins/glean-project
```

**Requires**: `glean-core` plugin for Glean MCP configuration.

## Commands

| Command | Description |
|---------|-------------|
| `/glean-project:project-handoff` | Generate a comprehensive handoff document |

### Example: Project Handoff

```
/glean-project:project-handoff search v2
```

**Output includes:**
- Executive summary
- Complete project overview
- People and relationships
- Essential knowledge and tribal wisdom
- Documentation guide (must-read docs)
- All open items categorized
- Operational details (recurring tasks, meetings)
- First 30 days plan for new owner

## Skills

These skills trigger automatically when relevant:

| Skill | Triggers On |
|-------|-------------|
| `project-awareness` | "What's the status of X?", "who owns Y project?", "what's happening with Z?" |

## Agents

| Agent | Purpose |
|-------|---------|
| `project-synthesizer` | Gathers and synthesizes all project information from multiple sources |

## Glean Tools Used

- `search` - Project documentation
- `meeting_lookup` - Project meetings and decisions
- `employee_search` - People involved
- `code_search` - Code contributions
- `read_document` - Full document content
- `chat` - AI synthesis across sources

## Use Cases

### Team Transitions
Use `/project-handoff` when someone is taking over a project, going on PTO, or leaving the team.

### Quick Project Status
Ask "What's the status of [project]?" and the `project-awareness` skill provides a concise summary.

### Deep Project Context
For getting up to speed on a project, use `/glean-docs:onboarding <project>` which provides comprehensive context including people, docs, and first steps.

## Troubleshooting

### Glean MCP Not Connected
If commands fail with missing tool errors:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### Project Not Found
If the project isn't found:
- Try alternative names or acronyms
- Search for key people known to be on the project
- Check if it's a codename vs official name

### Incomplete Information
If information is sparse:
- Some projects may be new or poorly documented
- The handoff command will note gaps
- Consider supplementing with direct conversations

## Related Plugins

- `glean-core` - Required foundation
- `glean-docs` - Onboarding and RFC verification
- `glean-people` - Find experts and stakeholders
- `glean-meetings` - Meeting prep and catch-up
