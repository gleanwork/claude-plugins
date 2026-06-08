---
name: using-glean-productivity
description: "Retrieve, filter, and summarize the user's own work activity, priorities, and recent context from Glean. Use when the user asks about their recent work, what they accomplished, what's urgent, what needs their attention, or wants help with status updates, 1:1 prep, or weekly summaries."
when_to_use: |
  Trigger phrases include "what have I been working on", "what did I do last week", "what should I focus on", "what's urgent", "what needs my attention", "summarize my week", "help me with my status update", "1:1 prep", "what's blocking me", "what can't wait", "morning briefing", "what happened while I was out".

  Don't use this skill for general enterprise queries (use `using-glean`), for someone else's activity (you can't query that directly), or for project-status questions where the user isn't the subject (use `glean-project`).
---

# Using Glean for Personal Productivity

This skill drives queries about the user's own work life — their recent activity, what they accomplished, what's pending, what's urgent. It pulls from `user_activity`, `meeting_lookup`, `search` (with `from:me` / `owner:me`), and `read_memory` to assemble a personal view rather than an enterprise-wide one.

## Two shapes of question

- **Activity / accomplishments** — "what did I work on?", "summarize my week", "what shipped?". See [reference/activity.md](reference/activity.md).
- **Priorities / blockers** — "what's urgent?", "what needs my attention?", "what's waiting on me?". See [reference/priorities.md](reference/priorities.md).

Activity is retrospective; priorities are prospective. The workflow below covers both.

## Core workflow

1. **Load personalization context.** Call `read_memory(action="read", category="ActiveProjects")` and optionally `RolesAndResponsibilities`. These themes drive how results are grouped.

2. **Pull the activity feed.** Call `user_activity(start_date="YYYY-MM-DD", end_date="YYYY-MM-DD")` for the requested window. Remember `end_date` is exclusive — to include all of Friday, set `end_date` to Saturday.

3. **Supplement with meetings and docs.** Call `meeting_lookup` for the same window, and `search` with `from:me` or `owner:me` to catch authored documents.

4. **Filter and classify.** From the combined results:
   - **Include**: created docs, shipped code, decisions made, tasks completed, meaningful comments
   - **Demote**: brief views, auto-generated notifications, mass announcements, peripheral involvement
   - For priority queries, apply the urgency triage from [reference/priorities.md](reference/priorities.md)

5. **Validate before presenting.** Check that results are non-empty. If the feed is sparse, say so honestly — don't pad. Suggest a wider date range if appropriate.

6. **Group and format.** Use `ActiveProjects` themes as the grouping axis when available. Otherwise group by repo, project, or topic. Cite every claim with a link to its source doc, meeting, or commit.

### Example: "summarize my week"

```
→ read_memory(action="read", category="ActiveProjects")
  # Returns: ["Auth migration", "API v3 launch", "Onboarding revamp"]

→ user_activity(start_date="2025-05-19", end_date="2025-05-24")
  # Returns: 34 items — filter down to 8 meaningful contributions

→ meeting_lookup(start_date="2025-05-19", end_date="2025-05-24")
  # Returns: 6 meetings — extract action items assigned to user

→ Output grouped by ActiveProjects themes, with citations:
  ## May 19–23 — your week
  ### Auth migration
  - Merged token-rotation PR (#412) — [link]
  - Resolved session-storage compliance flag with legal — [meeting notes]
  ### API v3 launch
  - Published updated rate-limit docs — [link]
```

## Tool reference lives in glean-core

`user_activity`, `read_memory`, `search`, and `meeting_lookup` are documented canonically in the `using-glean` skill (in the `glean-core` plugin):

- [`reference/user-activity.md`](../../../../glean-core/skills/using-glean/reference/user-activity.md) — date-range mechanics, the inclusive/exclusive end-date pitfall
- [`reference/memory.md`](../../../../glean-core/skills/using-glean/reference/memory.md) — `read_memory` + `memory_schema` for personalization
- [`reference/search.md`](../../../../glean-core/skills/using-glean/reference/search.md) — for documents the user authored or was mentioned in
- [`reference/meeting-lookup.md`](../../../../glean-core/skills/using-glean/reference/meeting-lookup.md) — for meetings the user attended

## Cross-cutting rules

1. **Quality over volume.** A status update of 5 real accomplishments beats a list of 20 trivial activities. Filter aggressively per [reference/activity.md](reference/activity.md).
2. **Distinguish "did" from "viewed".** `user_activity` returns both. Surface creates / edits / decisions; demote pure views.
3. **Cite sources.** Every claim should link back to a doc, meeting, or commit so the user can verify and dig deeper.
4. **Personalize via memory.** When framing a summary, `read_memory` (especially `RolesAndResponsibilities` and `ActiveProjects`) tells you what *themes* the user thinks they work on. Group by those themes when possible.
5. **Apply vetting.** Even self-activity should be filtered. See [`using-glean/reference/vetting.md`](../../../../glean-core/skills/using-glean/reference/vetting.md).

## Related commands

- `/glean-productivity:my-week` — full weekly summary with analysis
- `/glean-productivity:daily-briefing` — what happened in the last 24 hours
