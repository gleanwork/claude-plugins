# Priorities & blockers triage

Prospective questions: what needs the user's attention right now.

## Trigger shapes

- "What's urgent?"
- "What needs my attention?"
- "What should I focus on?"
- "What's blocking me?"
- "What's waiting on me?"
- "What can't wait?"
- "Daily briefing" / "morning briefing"

## Signal sources

| Source | What it surfaces |
|---|---|
| `search` for direct mentions of the user | People tagging or @-mentioning them |
| `meeting_lookup` for recent meetings | Action items assigned to them |
| `search` for "urgent" / "ASAP" / "blocking" + their name | Explicit urgency markers |
| Email tools (`gmail_search` / `outlook_search`) with `is:important is:unread` | Unread important threads |
| `user_activity` (recent) | Threads they have been engaged in |

## Workflow

1. **Cast the net wide.** Pull from each signal source above for the past 1–7 days (depending on whether it's a daily briefing or a weekly look).

2. **Vet for genuine urgency.** Most "urgent" items aren't. Apply:
   - **Truly urgent**: explicit deadline today / tomorrow, blocking a person who's actively waiting, marked urgent with evidence (not just a label)
   - **Important**: action assigned to user, question awaiting their response, decision due
   - **Noise** (filter out): mass announcements, CC'd threads they're not the primary audience for, "urgent" labels on resolved or stale items

3. **Tier the rest.** Three levels:
   - **Tier 1 — Today**: explicit deadlines today, blockers on others, items that will hurt if not addressed today
   - **Tier 2 — This week**: action items, awaiting-response questions, review requests
   - **Tier 3 — Awareness**: decisions affecting their area, FYI updates worth knowing

4. **Order Tier 1 by impact.** Within Tier 1, sort by who's blocked and how badly. A teammate waiting to ship beats a low-impact deadline.

## Output template

```markdown
## Priority triage — [date]

### Tier 1: Today
| Item | Source | Why it's urgent |
|---|---|---|
| [Item] | [link / source] | [Specific reason — deadline, blocker, etc.] |

### Tier 2: This week
| Item | Source | When |
|---|---|---|
| [Item] | [link / source] | [Date if known] |

### Tier 3: Awareness
- [Item] — [why worth knowing]

### Filtered (looked urgent but isn't)
- [Item] — [why filtered: CC'd only, already resolved, low impact]
```

## When nothing is urgent

This is a valid and valuable answer:

```markdown
## Priority triage — [date]

No urgent items requiring immediate attention.

Checked: direct mentions, meeting action items, blocking requests, urgent-marked threads.

Suggestion: this might be a good window for [deep work / planning / catching up on a deferred item].
```

The user will trust this report. Padding it with false urgency burns trust on every alarm that turns out to be nothing.
