# Activity & accomplishments synthesis

Retrospective questions: what the user did, what they shipped, what they touched.

## Trigger shapes

- "What have I been working on?"
- "What did I do last week?"
- "Summarize my recent activity"
- "What projects have I touched?"
- "Help me write my status update"
- "What should I put in my standup?"

## Workflow

1. **Pull the activity feed.** `user_activity(start_date=..., end_date=...)` for the requested window. Remember `end_date` is exclusive — to include all of "last Friday" set `end_date` to the day after.

2. **Pull personalization context.** `read_memory(action="read", category="ActiveProjects")` (and optionally `RolesAndResponsibilities`) to learn what *themes* the user organizes their work around.

3. **Vet the activity items.** From the raw feed, filter aggressively:
   - **Include**: created docs, made decisions, completed tasks, shipped code, posted updates, ran reviews
   - **Maybe**: meaningful comments, design reviews attended
   - **Exclude**: brief views, auto-generated notifications, mass announcements, items the user only had peripheral involvement with

4. **Group by theme.** Use the `ActiveProjects` memory entries as the grouping axis when they exist. Otherwise group by repo / project / topic inferred from the activities.

5. **Rank within theme.** Most significant first. "Shipped feature X" beats "edited doc Y".

6. **Surface collaboration.** Note who the user worked with (co-authors, commenters, meeting attendees) — this often makes status updates more useful than a list of artifacts.

## Output template

```markdown
## [Time period] — your activity

### Highlights
- [Most significant accomplishment with link]
- [Next-most]
- [Next-most]

### By project / theme

**[Project A]** — N items
- [Significant item 1] ([link])
- [Significant item 2] ([link])

**[Project B]** — N items
- ...

### Collaborations
- Worked with [Person] on [thread/topic] — [link]
- ...

### In progress
- [Item] — [where you left it]
```

## When activity is sparse

If the requested window has very little, say so cleanly:

```markdown
Limited activity in [window]. Found [N] items, of which [M] were meaningful contributions.

Possible reasons:
- Time off, focused-work mode, or work in systems not indexed by Glean
- The window is short; consider a longer one

Items found:
- [List the few that exist]
```

Don't pad. The user will trust a sparse-but-honest report; they will distrust a padded one.
