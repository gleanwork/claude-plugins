---
name: priority-signals
description: Use when the user asks about urgent items, what needs attention, priorities, or blockers. Triggers on phrases like "what's urgent", "what needs my attention", "what's blocking", "what should I focus on", "priorities", "critical items", "what's on fire", "what can't wait", or when helping the user triage their workload.
---

# Priority Signals

When users ask about urgent or priority items, use Glean to identify what needs immediate attention based on activity signals.

## Tool Naming

See the `glean-tools-guide` skill for Glean MCP tool naming conventions.

## When This Applies

Use this approach when users ask:
- "What's urgent?"
- "What needs my attention?"
- "What should I focus on first?"
- "Are there any blockers waiting on me?"
- "What's critical right now?"
- "Help me prioritize"

## Priority Signal Sources

| Signal Type | Glean Tool | What to Look For |
|-------------|------------|------------------|
| Direct mentions | `search` | People tagging/mentioning the user |
| Action items | `meeting_lookup` | Items assigned in meetings |
| Waiting on you | `search` | Questions awaiting response |
| Urgent keywords | `search` | "urgent", "ASAP", "blocking" |
| Recent activity | `user_activity` | Items you've engaged with |

## Query Patterns

### Find Urgent Mentions
```
search query="urgent OR ASAP OR blocking [user name]" updated="past_week" sort_by_recency=true
```

### Find Assignments from Meetings
```
chat "What action items were assigned to [user] in meetings over the past week?"
```

### Find Waiting Questions
```
search query="[user name] question OR asking" updated="past_week"
```

## Priority Tiers

When presenting results, categorize by urgency:

**Tier 1: Immediate (Today)**
- Explicit deadlines today
- Items marked urgent/ASAP
- Blockers on others

**Tier 2: Soon (This Week)**
- Action items from recent meetings
- Questions awaiting response
- Review requests

**Tier 3: Awareness**
- Decisions affecting your area
- Updates to watch
- FYI items

## Output Format

```markdown
## Priority Triage

### Immediate Attention
| Item | Source | Why Urgent |
|------|--------|------------|
| [Item] | [Source] | [Reason] |

### This Week
| Item | Source | Deadline |
|------|--------|----------|
| [Item] | [Source] | [Date if known] |

### On Your Radar
- [Item] - [Context]
```

## Relationship to Commands

For comprehensive briefings, suggest:
- `/glean-productivity:daily-briefing` - Full morning briefing with prioritized items
- `/glean-meetings:catch-up` - Catch up after time away
