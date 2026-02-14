---
name: activity-synthesis
description: Use when the user asks about their recent work, what they've been doing, their contributions, or needs to recall past activity. Triggers on phrases like "what have I been working on", "what did I do last week", "my recent activity", "what have I accomplished", "summarize my work", "what projects am I on", or when the user needs to recall or reflect on their own work.
---

# Activity Synthesis

When users ask about their own work activity, use Glean's user_activity and memory tools to provide a synthesized view of their contributions.

## Tool Naming

See the `glean-tools-guide` skill for Glean MCP tool naming conventions. Tools follow the pattern `mcp__glean_[server-name]__[tool]` where the server name is dynamic.

## When This Applies

Use this approach when users ask:
- "What have I been working on?"
- "What did I do last week?"
- "Summarize my recent activity"
- "What projects have I touched?"
- "Help me remember what I worked on"
- "What should I put in my status update?"

## BE SKEPTICAL

Not every activity is worth highlighting. Before including items, evaluate:

**Significance Test**
- Is this a meaningful contribution?
- ✅ INCLUDE: Created docs, made decisions, completed tasks
- ⚠️ MAYBE: Reviewed items, attended meetings
- ❌ EXCLUDE: Just viewed something, minor edits, noise

**Accomplishment Test**
- Did the user actually accomplish something?
- ✅ INCLUDE: Finished tasks, shipped features, resolved issues
- ⚠️ CONTEXT: In-progress work (note the status)
- ❌ EXCLUDE: Started but abandoned, just browsing

**Relevance Test**
- Does this reflect real work the user did?
- ✅ INCLUDE: Direct contributions with clear ownership
- ❌ EXCLUDE: Auto-generated, mass-distributed, tangential CC's

**Filter Out**:
- Automated notifications
- Documents the user only viewed briefly
- Mass emails or announcements received
- Activity with no meaningful outcome

**Quality over quantity**: A focused summary of 5-7 accomplishments is better than 20 trivial activities.

## Primary Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `user_activity` | Get work activity feed | Primary source for user's actions |
| `memory` | Get context about user | Roles, projects, responsibilities |
| `search` | Find documents by user | Documents created/updated |
| `meeting_lookup` | Find meetings | Meetings attended |

## Query Patterns

### Get Activity Feed
```
user_activity start_date:[YYYY-MM-DD] end_date:[YYYY-MM-DD]
```
Note: end_date is exclusive.

### Get User Context
```
memory - read all categories
```
Returns roles, responsibilities, active projects, recent topics.

### Find User's Documents
```
search query="*" from="me" updated="past_week"
search query="*" owner="me"
```

## Synthesis Approach

1. **Gather raw data** from user_activity and search
2. **Group by theme**: Projects, meetings, documents, collaborations
3. **Identify patterns**: What topics appear repeatedly?
4. **Highlight accomplishments**: Completed items, decisions made
5. **Note open items**: Things still in progress

## Output Format

Present activity in a scannable format:

```markdown
## Your Recent Activity: [Time Period]

### By Project
- **[Project A]**: [X activities] - [summary]
- **[Project B]**: [Y activities] - [summary]

### Key Actions
- [Action 1] - [date]
- [Action 2] - [date]

### Collaborations
- Worked with [Person] on [topic]
```

## Relationship to Commands

For comprehensive activity summaries, suggest:
- `/glean-productivity:my-week` - Full weekly summary with analysis
- `/glean-productivity:daily-briefing` - What happened in last 24 hours
