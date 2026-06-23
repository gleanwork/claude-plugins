# `user_activity` — the user's own work history

Retrieve the calling user's activity log over a date range: documents they created or edited, comments they made, items they viewed, mentions they received. The data source for "what did I do?" questions.

## When to use

- "What have I been working on?" — weekly / daily summary
- "What did I do last week?" — status updates, standup notes
- "What documents have I touched recently?" — recall after time away
- 1:1 prep, performance-review evidence, project handoff
- The user forgot a doc name but remembers they edited it recently

**Don't** use for:
- Other people's activity — `user_activity` is calling-user only
- Activity outside Glean's connected sources
- Discovery of unfamiliar documents — use `search`

## Parameters

| Parameter | Type | Notes |
|---|---|---|
| `start_date` | string (required) | YYYY-MM-DD. **Inclusive.** |
| `end_date` | string (required) | YYYY-MM-DD. **Exclusive** — must be strictly after `start_date`. |

## Date conventions

- For "last week" (assuming today is Monday): `start_date: 2025-09-29`, `end_date: 2025-10-06` (a 7-day window).
- For "yesterday": `start_date: 2025-10-12`, `end_date: 2025-10-13`.
- For "today's activity": `start_date: 2025-10-13`, `end_date: 2025-10-14`.

The exclusive end date catches users off-guard. To include all of a target day, set `end_date` to the day *after*.

## Examples

```
user_activity(start_date="2025-10-06", end_date="2025-10-13")  // last week
user_activity(start_date="2025-10-01", end_date="2025-11-01")  // October
```

## Pitfalls

- **`end_date` is exclusive.** Off-by-one is the most common mistake.
- **Activity ≠ contributions.** A document the user briefly viewed shows up alongside one they authored. Filter for significance when summarizing — a status report should highlight creates/edits, not views.
- **No filter by app or type.** The result mixes docs, code, meetings, comments. You filter post-hoc.
- **Time zones.** Dates are interpreted in the user's profile time zone — consistent with how the user thinks about their week.

## Typical follow-up

For "what did I work on?" reports, combine `user_activity` (what they touched) with `read_memory` ([memory.md](memory.md), what their stated active projects are) for thematic grouping. For accomplishment summaries, vet results per [vetting.md](vetting.md) — exclude trivial views, surface decisions and shipped work.
