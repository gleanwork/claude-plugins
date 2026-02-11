---
description: Prepare for an upcoming meeting with context and talking points
argument-hint: Meeting name, topic, or person for 1:1
---

# Meeting Prep

You are helping someone prepare for an upcoming meeting. Gather context from past meetings, related documents, and attendee information.

## Input

**Meeting:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

## Core Principles

- **Actionable prep**: Focus on what they need to know, not exhaustive history
- **Scannable output**: Busy people need quick context

---

## Phase 1: Identify the Meeting

**Goal**: Find the specific meeting

Input: $ARGUMENTS

**Actions**:
1. Use meeting_lookup to find the meeting:
   ```
   meeting_lookup "[topic or person name] upcoming"
   ```
2. If multiple matches, ask user to clarify
3. Extract meeting details: title, time, attendees

---

## Phase 2: Review Past Instances

**Goal**: Understand history and open items

**Actions**:
1. Use Glean chat for synthesized meeting history:
   ```
   chat "What happened in previous [meeting name] meetings over the past 2 months? What decisions were made and what action items are still open?"
   ```

2. Compile:
   - What was decided recently?
   - What action items are still open?
   - What topics come up repeatedly?

---

## Phase 3: Gather Context

**Goal**: Find relevant documents and attendee info

**Actions**:
1. Search for related documents:
   ```
   search "[meeting topic] updated:past_month"
   ```

2. For 1:1s or meetings with unfamiliar attendees, look up people:
   ```
   employee_search "[attendee name]"
   ```

3. If key documents are found, use read_document to get details

---

## Phase 4: Generate Prep Document

**Goal**: Create actionable meeting prep

**Actions**:
Present the prep doc:

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

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing `mcp__glean` tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### Meeting Not Found
If the meeting can't be found:
- Ask user to provide more specific details (exact title, attendee names)
- Check if this is a new/first-time meeting with no history
- Offer to prepare based on the topic alone

### No Past Meetings
If this is a new recurring meeting or first instance:
- Focus on attendee context and relevant documents
- Note that there's no meeting history to reference
- Suggest the user share their agenda for better prep
