---
name: meeting-prep
description: Prepare for an upcoming meeting — surface context from past meetings, related docs, and attendee information. Trigger phrases include "prep for my meeting", "context for the meeting", "what should I know before", "1:1 prep with", "prepare for [name]", "background on this meeting", "agenda context", "talking points for".
---

# Meeting Prep

You are helping someone prepare for an upcoming meeting. Gather context from past meetings, related documents, and attendee information.

## Input

Determine the meeting, topic, or person from the user's request. If it is not clear, ask: "Which meeting would you like to prep for? You can give me the meeting name, a topic, or the name of the person you're meeting with."

---

## Core Principles

- **Actionable prep**: Focus on what they need to know, not exhaustive history
- **Scannable output**: Busy people need quick context
- **Be skeptical of relevance**: Not everything from past meetings matters
- **Quality over completeness**: 5 good talking points beats 20 random ones

---

## Phase 1: Identify the Meeting

**Goal**: Find the specific meeting

**Actions**:
1. Use meeting_lookup to find the meeting:
   ```
   meeting_lookup "[topic or person name] upcoming"
   ```
2. If multiple matches, ask the user to clarify
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
   search query="[meeting topic]" updated="past_month"
   ```

2. For 1:1s or meetings with unfamiliar attendees, look up people:
   ```
   employee_search "[attendee name]"
   ```

3. If key documents are found, use read_document to get details

---

## Phase 4: Vet Content (CRITICAL)

**Goal**: Filter to what's actually useful for prep — BE SKEPTICAL

For each piece of context, evaluate:

**Relevance to THIS Meeting Test**
- Will this actually come up in this meeting?
- ✅ INCLUDE: Directly relates to likely agenda items
- ⚠️ MAYBE: Tangentially related
- ❌ OMIT: Historical but not relevant to upcoming discussion

**Actionability Test**
- Can they DO something with this info?
- ✅ INCLUDE: Leads to a question, decision point, or prep action
- ❌ OMIT: Just background noise

**Recency Test**
- Is this still current?
- ✅ INCLUDE: Recent and still relevant
- ⚠️ CAUTION: Old — verify if still applicable
- ❌ OMIT: Superseded or resolved

**Open Items Test**
- Is this action item actually still open?
- ✅ INCLUDE: Clearly still pending
- ⚠️ VERIFY: May have been completed
- ❌ OMIT: Likely completed or no longer relevant

**For Attendee Info**:
- Only include if the user is unfamiliar with them
- Focus on relevant context, not full bio

---

## Phase 5: Generate Prep Document

**Goal**: Create focused, actionable meeting prep

**Actions**:
Present the prep doc:

```markdown
# Meeting Prep: [Meeting Name]

## Meeting Details
- **When**: [date/time]
- **Attendees**: [list]
- **Recurring**: [Yes/No, frequency]

## Key Context (vetted for relevance)

### Open Action Items Still Pending
[Only items that are genuinely still open]
- [ ] [Action] - assigned to [person] - [status if known]

### Recent Decisions to Reference
[Only if likely to come up]
- [Decision] - [date] - [why it matters for this meeting]

### Recurring Topics
[Only if there's a pattern worth noting]
- [Topic that comes up regularly and likely will again]

## Relevant Documents
[Only documents they should actually review]
| Document | Why It Matters | Quick Summary |
|----------|----------------|---------------|
| [Title] | [Relevance to meeting] | [1-2 sentences] |

## Attendee Notes
[Only for unfamiliar attendees]
- **[Person]**: [relevant context for this meeting]

## Suggested Talking Points
[Prioritized list - what should they definitely bring up]
1. [Most important topic/question]
2. [Second priority]
3. [Third priority]

## Questions to Consider
- [Question they might want to ask]
- [Question they should be prepared to answer]
```

---

## If First Meeting / No History

Don't pad with irrelevant context:

```markdown
# Meeting Prep: [Meeting Name]

## Meeting Details
- **When**: [date/time]
- **Attendees**: [list]
- **First Instance**: Yes - no meeting history available

## Attendee Context
[Brief relevant info about attendees]

## Related Documents
[Relevant documents if any were found]

## Suggested Approach
Since this is the first instance:
1. [Goal-setting suggestion]
2. [Agenda clarification suggestion]
```

---

## Troubleshooting

### Meeting Not Found
If the meeting can't be found:
- Ask the user for more specific details
- Check if this is a new/first-time meeting
- Offer to prepare based on the topic alone

### No Past Meetings
If this is a first instance:
- Focus on attendee context and relevant documents
- Don't apologize — just pivot to useful info
