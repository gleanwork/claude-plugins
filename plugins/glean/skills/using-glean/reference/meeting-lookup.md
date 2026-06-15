# `meeting_lookup` — meetings, transcripts, and attendees

Find calendar meetings and (optionally) extract their transcripts. Scope: the user's own calendar by default; another person's calendar via `peer`; shared / resource calendars via `calendar_ids`.

## When to use

- "What was decided in the X meeting?" — find + extract transcript
- "When did we discuss Y?" — meetings on a topic
- "What's on my calendar today?" — your schedule
- "What meetings does Alice have tomorrow?" — peer schedule
- "Action items from last week's standup" — transcript content for a known meeting

**Don't** use for:
- Documents *attached* to meetings (the linked docs are reachable via `search`)
- Email threads about meetings (use `gmail_search` / `outlook_search`)

## Parameters

| Parameter | Type | Notes |
|---|---|---|
| `query` | string | Topic / title keywords. Optional. |
| `participants` | string array | Names or emails to filter by attendees. Use `participants` when filtering the user's own calendar; for someone else's calendar, use `peer`. |
| `peer` | string | Email of another person whose calendar to look up. ONE per call. |
| `calendar_ids` | string array | Google Calendar IDs only. Use `"primary"` for the user's own. Other IDs must be discovered from a prior result's `attendees` / `organizer_email` — never invented. |
| `before` / `after` | string | Date filters. Accepts `today`, `yesterday`, `tomorrow`, `now`, or `YYYY-MM-DD`. **Filtering is exclusive** — to include all meetings on `2025-10-08`, set `after:2025-10-07` and `before:2025-10-09`. |
| `extract_transcript` | boolean | When `true`, returns transcript content alongside metadata. Skip for simple listings. |
| `exhaustive` | boolean | Return all results, e.g., for "what is my calendar today" or "show me every meeting on this topic". |

## Date handling

- **Use `before` / `after` for date constraints.** Older skills used inline filters in the query string — those are unreliable here.
- **Buffer for inclusive dates.** Filtering is exclusive on both ends; pad by one day to include a target date fully.
- **Natural language keywords work** in `before` / `after`: `today`, `yesterday`, `tomorrow`, `now`. Use them when relative is what the user said.

## Examples

```
meeting_lookup(query="quarterly planning", after="2025-10-01", before="2025-10-31")
meeting_lookup(participants=["Alice Chen"], extract_transcript=true)
meeting_lookup(peer="bob@example.com", after="today", before="tomorrow")
meeting_lookup(calendar_ids=["primary"], after="today", before="2025-10-09")
meeting_lookup(query="design review", extract_transcript=true, exhaustive=true)
```

## Pitfalls

- **Don't invent `calendar_ids`.** Only use `"primary"` or IDs that appeared verbatim in a prior `meeting_lookup` result's `attendees` / `organizer_email`. Inventing IDs will return empty.
- **`peer` and `calendar_ids` interact.** `peer` wins when both are set.
- **Transcript extraction has cost.** Don't pass `extract_transcript=true` for simple "list my meetings today" queries.
- **Inline date filters in `query` don't work reliably.** Prefer `before` / `after`.

## Typical follow-up

Action items from a transcript usually need follow-on `search` (the doc they reference) or `gmail_search` (the email thread). For multi-source synthesis, see [synthesis.md](synthesis.md).

## When to extract transcripts

Pass `extract_transcript=true` when you need:
- Specific quotes or exact statements from participants
- Detailed discussion content to understand reasoning
- Action item context (what was said around an assignment)
- Decision rationale (why something was chosen)

Skip transcript extraction when:
- Just listing meetings (time, attendees, titles)
- Checking who attended
- Quick schedule lookups

Transcript extraction has cost — don't use it for simple listing queries.

## What to focus on when reading transcripts

When analyzing meeting transcript content, extract and surface:

1. **Decisions made** — What was agreed? Who agreed? Is it reversible?
2. **Action items** — Tasks assigned, owners, deadlines
3. **Open questions** — Items left unresolved; follow-up required
4. **Key discussion points** — Important debates, rejected alternatives, context that explains the decision
