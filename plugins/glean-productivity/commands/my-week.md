---
description: Weekly summary of your activity, accomplishments, and collaborations
argument-hint: Optional time period (e.g., "last week", "past 2 weeks")
---

# My Week Summary

You are generating a weekly summary of someone's work activity, collaborations, and accomplishments for reflection, status updates, or 1:1 prep.

## Input

**Time Period:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", default to "past week" (last 7 days). Otherwise use the specified period.

---

## Core Principles

- **Patterns over lists**: Highlight trends and themes
- **Accomplishment-focused**: Emphasize what was completed
- **Be skeptical of significance**: Not every activity is an accomplishment
- **Quality over quantity**: A focused summary is more useful than exhaustive

---

## Phase 1: Establish Time Window

**Goal**: Define the week to summarize

**Actions**:
1. Parse time period from input (default: past 7 days)
2. Calculate start_date and end_date for queries

---

## Phase 2: Gather Week's Activity

**Goal**: Collect all activity data

**Actions**:
1. Get your profile context:
   ```
   memory - read all categories
   ```

2. Get full week's activity:
   ```
   user_activity - start_date: [week start], end_date: [week end]
   ```

3. Gather parallel information:

   **Meetings participated in:**
   ```
   meeting_lookup "my meetings [time period] extract_transcript:\"true\""
   ```

   **Documents you touched:**
   ```
   search query="*" from="me" after="[week start YYYY-MM-DD]" before="[week end YYYY-MM-DD]"
   ```

   **Code contributions (if applicable):**
   ```
   code_search "from:me after:[week start]"
   ```

---

## Phase 3: Vet & Categorize (CRITICAL)

**Goal**: Separate accomplishments from routine activity - BE SKEPTICAL

For each item found, evaluate:

**Accomplishment Test**
- Is this a genuine accomplishment, or just routine activity?
- ✅ ACCOMPLISHMENT: Completed something, shipped a feature, closed a project, made a decision
- 📋 PROGRESS: Made progress but not complete
- 🔄 ROUTINE: Regular activity (attending meetings, reading docs)
- ❌ OMIT: Trivial activity not worth mentioning

**Significance Test**
- Would this matter in a status update or 1:1?
- ✅ INCLUDE: Manager would care, stakeholders should know
- ⚠️ MAYBE: Context-dependent
- ❌ OMIT: Routine work that doesn't stand out

**Evidence Test**
- Can you point to concrete output?
- ✅ STRONG: Document, commit, decision, shipped feature
- ⚠️ WEAK: Participated, contributed, discussed
- ❌ OMIT: No tangible evidence

**Noise Signals - Don't list these as accomplishments**:
- Attended meetings (unless outcome-focused)
- Read documents (unless led to action)
- Participated in discussions (unless you drove decisions)
- Reviewed things (unless your review was consequential)

---

## Phase 4: Generate Weekly Summary

**Goal**: Present a focused, accomplishment-driven summary

**Actions**:
Present the summary:

```markdown
# Weekly Summary: [Date Range]

## Overview
[3-4 sentence narrative - focus on themes and accomplishments, not exhaustive activity]

## Key Accomplishments
[Only include genuine completions with evidence]

| # | Accomplishment | Evidence |
|---|----------------|----------|
| 1 | [What you completed] | [Link to doc/commit/decision] |
| 2 | [What you completed] | [Link] |

## Projects Worked On

### [Project 1]
- **Status**: [Where it stands after this week]
- **Key Progress**: [What moved forward - be specific]
- **Next Steps**: [What's coming]

### [Project 2]
- **Status**: [Where it stands]
- **Key Progress**: [What moved forward]
- **Next Steps**: [What's coming]

## Collaboration Map

### Key Collaborators This Week
| Person | Context | Outcome |
|--------|---------|---------|
| [Name] | [Project/Topic] | [What you produced together] |

## Open Items

### Carry Forward
- [ ] [Specific unfinished item]
- [ ] [Specific unfinished item]

### Blocked On
- [ ] [Waiting on X from Y]

## Reflection
- **What went well**: [Based on accomplishments]
- **What could improve**: [Based on blockers or gaps]
```

---

## If It Was a Quiet/Routine Week

Don't inflate accomplishments. Be honest:

```markdown
# Weekly Summary: [Date Range]

## Overview
Steady-state week focused on [ongoing work]. No major milestones reached, but progress made on [areas].

## Progress Made
- **[Project]**: Continued [activity] - [X]% complete
- **[Project]**: [Status]

## Routine Work
- Attended [X] regular meetings
- Reviewed [Y] documents
- Participated in ongoing discussions

## Looking Ahead
Next week focus: [specific goals]
```

---

## Troubleshooting

### Limited Activity Data
If activity data is sparse:
- The user may work primarily in systems not indexed by Glean
- Supplement with meeting and document data
- Ask user about major activities to fill gaps

### Week Was Unusual
If the week was unusual (PTO, offsites, conferences):
- Note the unusual circumstances in the overview
- Adjust expectations for the summary
- Focus on what data is available
