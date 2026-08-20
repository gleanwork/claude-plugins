---
name: using-glean-productivity
description: Synthesize the user's own work activity, priorities, and recent context using Glean — use when the user asks about their recent work, what they accomplished, what is urgent, what needs their attention, or wants help with status updates, 1:1 prep, or weekly summaries. Trigger phrases include what have I been working on, what did I do last week, what should I focus on, summarize my week, help me with my status update, what's blocking me, morning briefing, what happened while I was out. Do not use for general enterprise queries (use the using-glean skill), for someone else's activity, or for project-status questions where the user is not the subject (use a project-awareness skill).
---

# Using Glean for Personal Productivity

This skill drives queries about the user's own work life — their recent activity, what they accomplished, what's pending, what's urgent. It pulls from `user_activity`, `meeting_lookup`, `search` (with `from:me` / `owner:me`), and `memory` to assemble a personal view rather than an enterprise-wide one.

## Two shapes of question

Most personal-productivity asks fall into two shapes:

- **Activity / accomplishments** — "what did I work on?", "summarize my week", "what shipped?". See [reference/activity.md](reference/activity.md).
- **Priorities / blockers** — "what's urgent?", "what needs my attention?", "what's waiting on me?". See [reference/priorities.md](reference/priorities.md).

The two overlap (a recent activity feed is the substrate for triaging priorities), but the *output* the user wants is different: activity is retrospective, priorities are prospective.

## Tool reference lives in using-glean

`user_activity`, `memory`, `search`, and `meeting_lookup` are documented canonically in the `using-glean` skill:

- [`../using-glean/reference/user-activity.md`](../using-glean/reference/user-activity.md) — date-range mechanics, the inclusive/exclusive end-date pitfall
- [`../using-glean/reference/memory.md`](../using-glean/reference/memory.md) — `memory` + `memory_schema` for personalization
- [`../using-glean/reference/search.md`](../using-glean/reference/search.md) — for documents the user authored or was mentioned in
- [`../using-glean/reference/meeting-lookup.md`](../using-glean/reference/meeting-lookup.md) — for meetings the user attended

This skill carries the *workflow* on top.

## Cross-cutting rules

1. **Quality over volume.** A status update of 5 real accomplishments beats a list of 20 trivial activities. Filter aggressively per [reference/activity.md](reference/activity.md).
2. **Distinguish "did" from "viewed".** `user_activity` returns both. Surface creates / edits / decisions; demote pure views.
3. **Cite sources.** Every claim should link back to a doc, meeting, or commit so the user can verify and dig deeper.
4. **Personalize via memory.** When framing a summary, `memory` (especially `RolesAndResponsibilities` and `ActiveProjects`) tells you what *themes* the user thinks they work on. Group by those themes when possible.
5. **Apply vetting.** Even self-activity should be filtered. See [`../using-glean/reference/vetting.md`](../using-glean/reference/vetting.md).

## Related skills

- **project-awareness** — quick status read on a project (when the user isn't the subject)
- **using-glean** — general enterprise knowledge search
