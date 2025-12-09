---
description: Catch up on what you missed while away (PTO, sick days, etc.)
argument-hint: Time period (e.g., "last week", "since Monday")
---

# Catch Up

You are helping someone who's been away catch up on what they missed. Follow a systematic approach to gather, prioritize, and present information.

## Core Principles

- **Prioritize ruthlessly**: They're already behind, don't overwhelm them
- **Action items first**: Things assigned to them are highest priority
- **Use TodoWrite**: Track progress throughout

---

## Phase 1: Establish Time Window

**Goal**: Understand how long they were away

Input: $ARGUMENTS

**Actions**:
1. Create todo list with all phases
2. If time period unclear, ask: "How long were you away?"
3. Convert to date range:
   - "last week" → `after:now-1w before:now`
   - "since Monday" → `after:[last Monday] before:now`
   - "2 weeks" → `after:now-2w before:now`

---

## Phase 2: Gather Information

**Goal**: Collect relevant updates from all sources

**Actions**:
1. Launch 3 parallel agents:

   **enterprise-searcher agent #1: Documents & Announcements**
   - Search for docs updated during the period
   - Focus on announcements, policy changes, project updates
   - Prompt: "Search for important documents and announcements updated [time period]. Focus on company announcements, policy changes, and project status updates."

   **meeting-analyzer agent #2: Meetings**
   - Find meetings during the time away
   - Extract decisions and action items
   - Prompt: "Find meetings from [time period] and extract decisions made, action items assigned, and key discussion topics. Flag anything that might need immediate attention."

   **enterprise-searcher agent #3: Direct Mentions**
   - Search for mentions of the user
   - Find questions or requests directed at them
   - Prompt: "Search for mentions of [user] during [time period] in Slack and documents. Find any questions waiting for them or action items assigned to them."

2. Compile results from all agents

---

## Phase 3: Prioritize & Triage

**Goal**: Categorize by urgency

**Actions**:
1. Review all findings and categorize:

   **Needs Immediate Attention**
   - Action items assigned to the user
   - Questions waiting for their response
   - Blockers on their work

   **Review Soon**
   - Decisions affecting their area
   - New proposals to weigh in on
   - Project status changes

   **FYI**
   - Company announcements
   - Team updates
   - General context

---

## Phase 4: Generate Report

**Goal**: Present a scannable catch-up summary

**Actions**:
1. Mark all todos complete
2. Present the catch-up report:

```markdown
# Catch-Up Summary: [Time Period]

## TL;DR
[2-3 sentence summary of the most important things]

## Needs Immediate Attention

### Action Items for You
- [ ] [Action] - from [source] - [deadline if known]

### Questions Waiting for You
- [Question] - asked by [person] in [source]

## Review Soon

### Decisions Made
- **[Decision]**: [summary] ([link])

### New Proposals
- **[Title]**: [summary] ([link])

## FYI

### Key Updates
- [Update 1]
- [Update 2]

## Meetings You Missed
| Meeting | Key Takeaways | Action Items |
|---------|---------------|--------------|
| [Meeting] | [summary] | [items] |

## Suggested First Actions
1. [Most urgent]
2. [Second priority]
3. [Third priority]
```

---
