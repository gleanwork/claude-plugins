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
- **Be skeptical**: Not every mention is important - filter aggressively
- **Quality over noise**: A quiet day is valid - don't manufacture urgency

---

## Phase 1: Gather Your Context

**Goal**: Understand who you are and what matters to you

**Actions**:
1. Get your profile and recent context:
   ```
   memory - read all categories for roles, responsibilities, active projects
   ```
2. Note active projects and focus areas for filtering

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
   search query="[user name]" updated="today" sort_by_recency=true
   ```

4. Check meetings from yesterday/today for decisions:
   ```
   meeting_lookup "my meetings yesterday extract_transcript:\"true\""
   ```

---

## Phase 3: Vet Each Item (CRITICAL)

**Goal**: Filter out noise - BE SKEPTICAL

For each item found, evaluate:

**Actionability Test**
- Does this require the user to DO something?
- ✅ NEEDS RESPONSE: Direct question, explicit action item, blocking someone
- 📋 DECISION: Affects their work, they should know
- 📰 FYI: Informational, no action needed
- ❌ REJECT: Tangential mentions, CC'd on threads they don't need to act on

**Relevance Test**
- Is this actually about the user's work?
- ✅ INCLUDE: Directly about their projects/responsibilities
- ⚠️ MAYBE: Related but not directly their area
- ❌ REJECT: Just happens to mention similar keywords

**Urgency Test**
- Is this genuinely urgent, or just new?
- 🔴 Urgent: Blocking others, deadline today, explicit request
- 🟡 Important: Should address today but not blocking
- 🟢 Normal: Can address this week
- ❌ REJECT: Not actually urgent, just recent

**Noise Signals - REJECT these**:
- Mass announcements not requiring their action
- CC'd on threads where they're not the primary audience
- Automated notifications they've likely already seen
- Mentions in contexts unrelated to their work
- "FYI" threads with no action for them

**Ask yourself**: "Would they regret not knowing this?"
- If "no" or "probably not" → don't include or demote to FYI

---

## Phase 4: Generate Daily Briefing

**Goal**: Present a scannable morning briefing with only vetted items

**Actions**:
Present the briefing:

```markdown
# Daily Briefing: [Date]

## TL;DR
[2-3 sentence summary of the most important things - or "Quiet day, no urgent items"]

## Needs Your Response
[Only include if there ARE items requiring response]

### Action Items for You
| Priority | Item | From | Why Urgent |
|----------|------|------|------------|
| 🔴 | [Action] | [Person/Source] | [Blocking/deadline] |
| 🟡 | [Action] | [Person/Source] | [Should address today] |

### Questions Waiting for You
- **[Person]** asked: [Question] ([source link])

## Decisions Made (Yesterday)
[Only include decisions that actually affect their work]

| Decision | Made By | How It Affects You |
|----------|---------|-------------------|
| [Decision] | [Person] | [Specific impact] |

## New Information
[Only include if genuinely relevant]

### Documents Shared With You
- **[Doc Title]** by [Author] - [why it matters to them] ([link])

## Today's Meetings
| Time | Meeting | Prep Needed |
|------|---------|-------------|
| [Time] | [Meeting] | [Key item to prep] |

## Suggested First Actions
1. [Most urgent - only if there is one]
2. [Second priority]
```

---

## If It Was a Quiet Day

This is valid! Don't manufacture urgency:

```markdown
# Daily Briefing: [Date]

## TL;DR
Quiet day - no urgent items requiring your attention.

## Summary
- No direct action items found
- No decisions affecting your immediate work
- [X] documents were updated in your areas (none requiring immediate attention)

## Today's Meetings
| Time | Meeting | Prep Needed |
|------|---------|-------------|
| [Time] | [Meeting] | [Key item to prep] |

## Optional Review
If you have time, these updates might be of interest:
- [Low-priority item 1]
- [Low-priority item 2]
```

---

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing Glean MCP tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### No Activity Found
If user_activity returns empty:
- Check if the user was active yesterday
- Fall back to search-based discovery
- It may have genuinely been a quiet day - that's valid

### Too Much Information
If overwhelmed with results:
- Apply vetting criteria strictly
- Only include items with clear action required
- Summarize rather than list all items
