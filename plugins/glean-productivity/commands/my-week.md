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
   meeting_lookup "after:[week start] before:[week end] extract_transcript:\"true\""
   ```

   **Documents you touched:**
   ```
   search "from:me after:[week start] before:[week end]"
   ```

   **Code contributions (if applicable):**
   ```
   code_search "from:me after:[week start]"
   ```

---

## Phase 3: Analyze Patterns

**Goal**: Identify themes, accomplishments, and collaborations

**Actions**:
1. Spawn `activity-analyzer` agent with gathered data to:
   - Identify major themes/projects worked on
   - List key accomplishments with evidence
   - Map collaboration patterns (who you worked with)
   - Note recurring topics
   - Flag items that seem incomplete

2. Compile the analysis results

---

## Phase 4: Generate Weekly Summary

**Goal**: Present a reflective weekly summary

**Actions**:
Present the summary:

```markdown
# Weekly Summary: [Date Range]

## Overview
[3-4 sentence narrative of what your week looked like - major themes, key accomplishments, collaboration patterns]

## Key Accomplishments

| # | Accomplishment | Evidence |
|---|----------------|----------|
| 1 | [What you completed] | [Doc/commit/meeting link] |
| 2 | [What you completed] | [Evidence link] |
| 3 | [What you completed] | [Evidence link] |

## Projects Worked On

### [Project 1]
- **Activity Level**: [High/Medium/Low based on touches]
- **Key Activities**: [What you did]
- **Status**: [Where it stands]

### [Project 2]
- **Activity Level**: [High/Medium/Low]
- **Key Activities**: [What you did]
- **Status**: [Where it stands]

## Collaboration Map

### People You Worked With
| Person | Context | Interaction Type |
|--------|---------|------------------|
| [Name] | [Project/Topic] | [Meetings/Reviews/Docs] |

### Teams Engaged
- **[Team]**: [On what topic]

## Meetings Summary

| Category | Count | Key Outcomes |
|----------|-------|--------------|
| 1:1s | [X] | [Summary of themes] |
| Team meetings | [Y] | [Key decisions] |
| Cross-functional | [Z] | [Outcomes] |

## Documents

### Created/Updated
- **[Doc Title]** - [Purpose] ([link])

### Reviewed
- **[Doc Title]** - [Your input] ([link])

## Open Items

### Carry Forward to Next Week
- [ ] [Item to continue]
- [ ] [Item to continue]

### Waiting On Others
- [ ] [Blocked item] - waiting on [person]

## Reflection Prompts
- **What went well**: [Based on accomplishments and patterns]
- **What could improve**: [Based on gaps or recurring blockers]
- **Focus for next week**: [Based on open items and upcoming deadlines]
```

---

## Use Cases

### For Status Updates
Use the "Key Accomplishments" section directly in standups or status reports.

### For 1:1 Prep
Use "Open Items" and "Reflection Prompts" as discussion points with your manager.

### For Self-Reflection
Review patterns in collaborations and project distribution to understand where your time goes.

---

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing `mcp__glean` tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

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
