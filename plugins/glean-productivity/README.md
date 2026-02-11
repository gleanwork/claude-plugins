# glean-productivity

Personal productivity tools powered by Glean - daily briefings, weekly summaries, and activity analysis.

## Overview

This plugin helps you stay on top of your work by synthesizing activity from across your enterprise tools. Get morning briefings, weekly summaries, and priority-focused views of what needs your attention.

## Installation

```bash
claude plugins add gleanwork/claude-plugins/glean-productivity
```

**Requires**: `glean-core` plugin for Glean MCP configuration.

## Commands

| Command | Description |
|---------|-------------|
| `/daily-briefing` | What happened in the last 24 hours - mentions, shared docs, decisions, action items |
| `/my-week` | Weekly summary of your activity, accomplishments, and collaborations |

### Example: Daily Briefing

```
/daily-briefing

# Or with a focus area:
/daily-briefing payments team
```

**Output includes:**
- TL;DR summary
- Action items assigned to you
- Questions waiting for your response
- Decisions made that affect you
- Documents shared with you
- Today's meetings with prep suggestions

### Example: Weekly Summary

```
/my-week

# Or with a specific time period:
/my-week past 2 weeks
```

**Output includes:**
- Narrative overview of your week
- Key accomplishments with evidence
- Projects worked on
- Collaboration map (who you worked with)
- Meetings summary
- Open items to carry forward
- Reflection prompts for 1:1s

## Skills

These skills trigger automatically when relevant:

| Skill | Triggers On |
|-------|-------------|
| `activity-synthesis` | "What have I been working on?", "my recent activity", "what did I do last week" |
| `priority-signals` | "What's urgent?", "what needs my attention?", "what should I focus on?" |

## Agents

| Agent | Purpose |
|-------|---------|
| `activity-analyzer` | Analyzes activity data to categorize by priority, identify patterns, and extract accomplishments |

## Glean Tools Used

- `user_activity` - Your work activity feed
- `meeting_lookup` - Meetings and transcripts
- `search` - Documents and mentions
- `chat` - AI synthesis across sources
- `memory` - Your roles, projects, preferences

## Use Cases

### Morning Routine
Start your day with `/daily-briefing` to know exactly what needs your attention.

### Status Updates
Use `/my-week` to quickly generate content for standups or status reports.

### 1:1 Prep
The "Reflection Prompts" section in `/my-week` provides ready-made discussion points.

### After PTO
Combine with `/glean-meetings:catch-up` for comprehensive catch-up after time away.

## Troubleshooting

### Glean MCP Not Connected
If commands fail with missing tool errors:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### Limited Activity Data
If activity data is sparse:
- You may work primarily in systems not indexed by Glean
- Commands will supplement with meeting and document data
- Consider which data sources are connected to your Glean instance

## Related Plugins

- `glean-core` - Required foundation
- `glean-meetings` - Meeting prep and catch-up
- `glean-people` - Find experts and stakeholders
