---
name: catch-up
description: Catch up on what you missed while away — meetings, decisions, action items, mentions, and important threads from a defined time window. Trigger phrases include "what did I miss", "catch me up", "I was out", "I'm back from PTO", "summarize while I was away", "what happened last week while I was off", "I just got back", "fill me in on what I missed".
---

# Catch Up

You are helping someone who's been away catch up on what they missed. Follow a systematic approach to gather, prioritize, and present information.

## Input

Determine the time period from the user's request. If it is not clear, ask: "How long were you away? For example: last week, since Monday, or the past two weeks."

---

## Core Principles

- **Prioritize ruthlessly**: They're already behind, don't overwhelm them
- **Action items first**: Things assigned to them are highest priority
- **Be skeptical**: Not everything that happened matters to them
- **Less is more**: Better to miss something minor than overwhelm with noise

---

## Phase 1: Establish Time Window

**Goal**: Understand how long they were away

**Actions**:
1. Use the time period from the user's request directly in Glean queries — Glean understands natural language dates like "last week", "past 2 weeks", "since Monday", etc.

---

## Phase 2: Gather Information

**Goal**: Collect relevant updates from all sources

**Actions**:
1. Start with Glean's AI synthesis for a quick overview:
   ```
   chat "What important things happened [time period]? Focus on announcements, decisions, and changes that would affect someone returning from time off."
   ```

2. Gather specific details — in parallel via subagents if your host supports them, otherwise sequentially:

   **Meetings and Action Items**
   - Find meetings from [time period]. Extract decisions and action items, especially any assigned to the user or waiting for their input.
   - Use: `meeting_lookup "[time period]"`

   **Direct Mentions**
   - Search for mentions of the user during [time period]. Find questions waiting for them or tasks assigned to them.
   - Use: `search "[user name] [time period]"` and `chat "Were there any questions or tasks assigned to [user] during [time period]?"`

3. Compile results

---

## Phase 3: Vet Each Item (CRITICAL)

**Goal**: Filter aggressively — BE SKEPTICAL

For each item found, evaluate:

**Direct Impact Test**
- Does this directly involve them or just happen near them?
- ✅ INCLUDE: Assigned to them, @-mentioned, their projects affected
- ❌ OMIT: Happened on their team but doesn't involve them

**Action Required Test**
- Do they need to DO something?
- 🔴 URGENT: Blocking someone, deadline passed/soon, explicit request
- 🟡 SHOULD ACT: They should respond but not time-critical
- 🟢 FYI: No action required, just awareness
- ❌ OMIT: Nothing for them to do and not significant to know

**Still Relevant Test**
- Is this still relevant or was it handled?
- ✅ INCLUDE: Still open, still needs their input
- ⚠️ MAYBE: Was urgent but may have been resolved
- ❌ OMIT: Already resolved by others, no longer relevant

**Noise Signals — OMIT these**:
- Mass announcements they'll see in Slack anyway
- Decisions in areas they don't own
- Updates on projects they're not involved in
- Routine meeting notes with no action for them
- Things that were urgent but got resolved

**Ask yourself**: "If they don't see this, what's the worst that happens?"
- If "nothing" or "minor inconvenience" → OMIT

---

## Phase 4: Generate Report

**Goal**: Present a focused, vetted catch-up summary

**Actions**:
Present the catch-up report:

```markdown
# Catch-Up Summary: [Time Period]

## TL;DR
[2-3 sentence summary - focus on what requires action]

## Vetting Summary
| Items Found | Included | Filtered Out |
|-------------|----------|--------------|
| [X] | [Y] | [Z] |

## Needs Immediate Attention
[Only include items that genuinely require their action]

### Action Items for You
| Priority | Item | Source | Why Urgent |
|----------|------|--------|------------|
| 🔴 | [Action] | [from] | [blocking/deadline] |
| 🟡 | [Action] | [from] | [should address soon] |

### Questions Waiting for You
- [Question] - asked by [person] in [source]

## Important Decisions Made
[Only decisions that affect their work]

| Decision | Impact on You | Link |
|----------|---------------|------|
| [Decision] | [How it affects them] | [link] |

## FYI (Low Priority)
[Brief list - they can skip this section if busy]
- [Update 1]
- [Update 2]

## Suggested First Actions
1. [Most urgent - with specific action]
2. [Second priority]

## What You Can Ignore
Things that happened but don't require your attention:
- [Category]: [summary of what was filtered]
```

---

## If Nothing Critical Happened

This is a valid outcome — be clear about it:

```markdown
# Catch-Up Summary: [Time Period]

## TL;DR
No critical items require your immediate attention. Welcome back!

## What I Checked
- Meetings: [X] meetings, [Y] with your involvement
- Mentions: [Z] mentions of you
- Action items: None assigned to you

## Minor Updates
If you have time, these may be of interest:
- [Low-priority update 1]
- [Low-priority update 2]

## Suggested Action
Check your direct messages for anything you may have received.
```

---

## Troubleshooting

### Glean Not Connected
If you see errors about missing Glean tools, see the using-glean reference for setup instructions (using-glean/reference/).

### Time Period Unclear
If the user's time period is ambiguous:
- Ask for clarification with specific options
- Default to "past week" if the user confirms they want a general catch-up

### No Action Items Found
If no action items are found:
- This is good news — report it clearly
- Don't pad with low-value items to seem comprehensive
