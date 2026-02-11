---
description: What happened in the last 24 hours - mentions, shared docs, decisions, action items
argument-hint: Optional focus area (e.g., "payments team", "Q1 planning")
---

# Daily Briefing

You are generating a personalized daily briefing for someone starting their workday. Gather what happened in the last 24 hours that's relevant to them.

## Input

**Focus Area:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", generate a general briefing covering all areas. If a focus area is provided, emphasize that area while still covering other important items.

---

## Core Principles

- **Actionable first**: Lead with things requiring response
- **Scannable format**: Busy people need to skim quickly
- **Use TodoWrite**: Track progress throughout

---

## Phase 1: Gather Your Context

**Goal**: Understand who you are and what matters to you

**Actions**:
1. Create todo list with all phases
2. Get your profile and recent context:
   ```
   memory - read all categories for roles, responsibilities, active projects
   ```
3. Note active projects and focus areas for filtering

---

## Phase 2: Collect Last 24 Hours Activity

**Goal**: Gather everything relevant from the past day

**Actions**:
1. Get your activity from the past 24 hours:
   ```
   user_activity - start_date: [yesterday's date], end_date: [today's date]
   ```

2. Use Glean AI synthesis for a quick overview:
   ```
   chat "What happened in the last 24 hours that would affect [user's role/context]? Include mentions of me, decisions made, documents shared with me, and important announcements. Focus on: [focus area if provided]"
   ```

3. Search for direct mentions and assignments:
   ```
   search "[user name] updated:today sort_by_recency:true"
   ```

4. Check meetings from yesterday/today for decisions:
   ```
   meeting_lookup "after:yesterday before:tomorrow extract_transcript:\"true\""
   ```

---

## Phase 3: Prioritize and Categorize

**Goal**: Organize findings by urgency

**Actions**:
1. Spawn `activity-analyzer` agent to categorize all findings into:

   **Needs Your Response**
   - Direct mentions requiring reply
   - Questions asked to you
   - Action items assigned to you
   - Blockers waiting on you

   **Decisions Made**
   - Decisions from meetings
   - Approvals or rejections affecting your work
   - Policy or process changes

   **New Information**
   - Documents shared with you
   - Updates to projects you follow
   - Announcements

   **FYI**
   - General team updates
   - Context that may be useful later

---

## Phase 4: Generate Daily Briefing

**Goal**: Present a scannable morning briefing

**Actions**:
1. Mark all todos complete
2. Present the briefing:

```markdown
# Daily Briefing: [Date]

## TL;DR
[2-3 sentence summary of the most important things]

## Needs Your Response

### Action Items for You
| Priority | Item | From | Deadline |
|----------|------|------|----------|
| High | [Action] | [Person/Source] | [Date if known] |
| Medium | [Action] | [Person/Source] | - |

### Questions Waiting for You
- **[Person]** asked: [Question] ([source link])

## Decisions Made (Yesterday)

| Decision | Made By | Affects | Link |
|----------|---------|---------|------|
| [Decision] | [Person] | [Your area] | [link] |

## New Information

### Documents Shared With You
- **[Doc Title]** by [Author] - [1-line summary] ([link])

### Project Updates
- **[Project]**: [What changed]

## Today's Meetings
| Time | Meeting | Prep Needed |
|------|---------|-------------|
| [Time] | [Meeting] | [Key item to prep] |

## Suggested First Actions
1. Respond to [most urgent item]
2. Review [decision] that affects your work
3. Prepare for [first important meeting]
```

---

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing `mcp__glean` tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### No Activity Found
If user_activity returns empty:
- Check if the user was active yesterday
- Fall back to search-based discovery
- Note that it may have been a quiet day

### Too Much Information
If overwhelmed with results:
- Focus on direct mentions and action items first
- Summarize rather than list all items
- Offer to dive deeper into specific areas
