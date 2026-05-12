---
name: using-glean-productivity
description: Synthesize the user's own work activity, priorities, and recent context using Glean. Use when the user asks about their recent work, what they accomplished, what's urgent, what needs their attention, or wants help with status updates, 1:1 prep, or weekly summaries.
when_to_use: |
  Trigger phrases include "what have I been working on", "what did I do last week", "what should I focus on", "what's urgent", "what needs my attention", "summarize my week", "help me with my status update", "1:1 prep", "what's blocking me", "what can't wait", "morning briefing", "what happened while I was out".

  Don't use this skill for general enterprise queries (use `using-glean`), for someone else's activity (you can't query that directly), or for project-status questions where the user isn't the subject (use `glean-project`).
---

# Using Glean for Personal Productivity

This skill drives queries about the user's own work life — their recent activity, what they accomplished, what's pending, what's urgent. It pulls from `user_activity`, `meeting_lookup`, `search` (with `from:me` / `owner:me`), and `read_memory` to assemble a personal view rather than an enterprise-wide one.

## Two shapes of question

Most personal-productivity asks fall into two shapes:

- **Activity / accomplishments** — "what did I work on?", "summarize my week", "what shipped?". See [reference/activity.md](reference/activity.md).
- **Priorities / blockers** — "what's urgent?", "what needs my attention?", "what's waiting on me?". See [reference/priorities.md](reference/priorities.md).

The two overlap (a recent activity feed is the substrate for triaging priorities), but the *output* the user wants is different: activity is retrospective, priorities are prospective.

## Tool reference lives in glean-core

`user_activity`, `read_memory`, `search`, and `meeting_lookup` are documented canonically in the `using-glean` skill (in the `glean-core` plugin):

- [`reference/user-activity.md`](../../../../glean-core/skills/using-glean/reference/user-activity.md) — date-range mechanics, the inclusive/exclusive end-date pitfall
- [`reference/memory.md`](../../../../glean-core/skills/using-glean/reference/memory.md) — `read_memory` + `memory_schema` for personalization
- [`reference/search.md`](../../../../glean-core/skills/using-glean/reference/search.md) — for documents the user authored or was mentioned in
- [`reference/meeting-lookup.md`](../../../../glean-core/skills/using-glean/reference/meeting-lookup.md) — for meetings the user attended

This skill carries the *workflow* on top.

## Cross-cutting rules

1. **Quality over volume.** A status update of 5 real accomplishments beats a list of 20 trivial activities. Filter aggressively per [reference/activity.md](reference/activity.md).
2. **Distinguish "did" from "viewed".** `user_activity` returns both. Surface creates / edits / decisions; demote pure views.
3. **Cite sources.** Every claim should link back to a doc, meeting, or commit so the user can verify and dig deeper.
4. **Personalize via memory.** When framing a summary, `read_memory` (especially `RolesAndResponsibilities` and `ActiveProjects`) tells you what *themes* the user thinks they work on. Group by those themes when possible.
5. **Apply vetting.** Even self-activity should be filtered. See [`using-glean/reference/vetting.md`](../../../../glean-core/skills/using-glean/reference/vetting.md).

## Related commands

- `/glean-productivity:my-week` — full weekly summary with analysis
- `/glean-productivity:daily-briefing` — what happened in the last 24 hours
