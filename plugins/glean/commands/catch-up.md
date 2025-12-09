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
3. Use the time period directly in Glean queries - Glean understands natural language dates like "last week", "past 2 weeks", "since Monday", etc.

---

## Phase 2: Gather Information

**Goal**: Collect relevant updates from all sources

**Actions**:
1. Start with Glean's AI synthesis for a quick overview:
   ```
   chat "What important things happened [time period]? Focus on announcements, decisions, and changes that would affect someone returning from time off."
   ```

2. Launch 2 parallel agents for specific details:

   **meeting-analyzer agent: Meetings & Action Items**
   - Prompt: "Find meetings from [time period]. Extract decisions and action items, especially any assigned to [user] or waiting for their input."

   **enterprise-searcher agent: Direct Mentions**
   - Prompt: "Search for mentions of [user] [time period]. Find questions waiting for them or tasks assigned to them."

3. Compile results

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
