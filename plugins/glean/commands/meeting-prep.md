---
description: Prepare for an upcoming meeting with context and talking points
argument-hint: Meeting name, topic, or person for 1:1
---

# Meeting Prep

You are helping someone prepare for an upcoming meeting. Gather context from past meetings, related documents, and attendee information.

## Core Principles

- **Actionable prep**: Focus on what they need to know, not exhaustive history
- **Scannable output**: Busy people need quick context
- **Use TodoWrite**: Track progress throughout

---

## Phase 1: Identify the Meeting

**Goal**: Find the specific meeting

Input: $ARGUMENTS

**Actions**:
1. Create todo list with all phases
2. Launch a meeting-analyzer agent to find the meeting:
   - If given topic: "Find upcoming meeting about [topic] in the next week"
   - If given person: "Find upcoming meeting with [person] in the next week"
3. If multiple matches, ask user to clarify
4. Extract meeting details: title, time, attendees

---

## Phase 2: Review Past Instances

**Goal**: Understand history and open items

**Actions**:
1. Launch a meeting-analyzer agent:
   - Prompt: "Find previous instances of [meeting name] in the past 2 months. Extract: decisions made, open action items, recurring topics, and unresolved questions."

2. Compile:
   - What was decided recently?
   - What action items are still open?
   - What topics come up repeatedly?

---

## Phase 3: Gather Context

**Goal**: Find relevant documents and attendee info

**Actions**:
1. Launch 2 parallel agents:

   **enterprise-searcher agent: Related Documents**
   - Prompt: "Search for documents related to [meeting topic] updated in the past month. Focus on status updates, proposals, and relevant project docs."

   **people-finder agent: Attendee Context** (for 1:1s or new meetings)
   - Prompt: "Find information about [attendee names]. Include their role, team, and recent activity relevant to [meeting topic]."

2. For key documents found, use doc-reader agent if deeper analysis needed

---

## Phase 4: Generate Prep Document

**Goal**: Create actionable meeting prep

**Actions**:
1. Mark all todos complete
2. Present the prep doc:

```markdown
# Meeting Prep: [Meeting Name]

## Meeting Details
- **When**: [date/time]
- **Attendees**: [list]
- **Recurring**: [Yes/No, frequency]

## Context from Past Meetings

### Recent Decisions
- [Decision] - [date]

### Open Action Items
- [ ] [Action] - assigned to [person]

### Recurring Topics
- [Topic that comes up regularly]

## Relevant Updates
- **[Document]**: [what changed or why it matters]

## Attendee Notes
- **[Person]**: [relevant context]

## Suggested Talking Points
1. Follow up on [open item]
2. Discuss [recent update]
3. Address [unresolved question]
```

---
