# Glean Productivity

Personal productivity tools powered by Glean — daily briefings, weekly summaries, activity synthesis, and priority triage.

## Overview

This plugin helps you stay on top of your work by synthesizing activity from across your enterprise tools. Get morning briefings, weekly summaries, and priority-focused views of what needs your attention.

## Installation

```bash
claude plugins add gleanwork/claude-plugins/glean-productivity
```

**Requires**: `glean-core` plugin for Glean MCP configuration.

## What's included

### Skill

- **`using-glean-productivity`** — Auto-triggers on personal-productivity questions ("what have I been working on", "what's urgent", "summarize my week"). The canonical Glean tool references (`user_activity`, `read_memory`, `search`, `meeting_lookup`) live in `glean-core`; this skill carries the workflow.

  Reference files under [`skills/using-glean-productivity/reference/`](skills/using-glean-productivity/reference/):

  | File | Covers |
  |---|---|
  | `activity.md` | Retrospective questions: what the user did, accomplishments, status updates |
  | `priorities.md` | Prospective questions: urgent items, blockers, attention triage |

### Commands

| Command | Description |
|---|---|
| `/glean-productivity:daily-briefing` | What happened in the last 24 hours — mentions, shared docs, decisions, action items |
| `/glean-productivity:my-week` | Weekly summary of your activity, accomplishments, and collaborations |

### Agents

| Agent | Purpose |
|---|---|
| `activity-analyzer` | Analyzes activity data to categorize by priority, identify patterns, and extract accomplishments |

## Example: Daily Briefing

```
/glean-productivity:daily-briefing

# Or with a focus area:
/glean-productivity:daily-briefing payments team
```

**Output includes:**
- TL;DR summary
- Action items assigned to you
- Questions waiting for your response
- Decisions made that affect you
- Documents shared with you
- Today's meetings with prep suggestions

## Example: Weekly Summary

```
/glean-productivity:my-week

# Or with a specific time period:
/glean-productivity:my-week past 2 weeks
```

**Output includes:**
- Narrative overview of your week
- Key accomplishments with evidence
- Projects worked on
- Collaboration map (who you worked with)
- Meetings summary
- Open items to carry forward
- Reflection prompts for 1:1s

## Use cases

- **Morning routine**: `/glean-productivity:daily-briefing` to know what needs attention
- **Status updates**: `/glean-productivity:my-week` for standups and status reports
- **1:1 prep**: the reflection prompts in `/my-week` are ready-made discussion points
- **After PTO**: combine with `/glean-meetings:catch-up` for comprehensive catch-up

## Troubleshooting

### Glean MCP not connected
If commands fail with missing tool errors:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### Limited activity data
If activity data is sparse:
- You may work primarily in systems not indexed by Glean
- Commands will supplement with meeting and document data
- Consider which data sources are connected to your Glean instance

## Related plugins

- `glean-core` — required foundation
- `glean-meetings` — meeting prep and catch-up
- `glean-people` — find experts and stakeholders
