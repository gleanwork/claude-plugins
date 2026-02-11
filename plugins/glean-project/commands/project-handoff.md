---
description: Generate a comprehensive handoff document for a project
argument-hint: Project name (e.g., "billing migration")
allowed-tools: [AskUserQuestion]
---

# Project Handoff

You are generating a comprehensive handoff document so someone new can take over a project. Gather everything they'd need to know.

## Input

**Project:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

## Core Principles

- **Complete context**: Include everything needed to take over
- **Actionable items**: Clear next steps and open items
- **Tribal knowledge**: Capture what's not in docs
- **Use task lists**: Track progress throughout

---

## Phase 1: Gather Current Context

**Goal**: Understand the project's current state

**Actions**:
1. Create task list with all phases
2. Use `AskUserQuestion` to get handoff context:
   - "What is your role on this project?" (Options: Owner/Lead, Contributor, Advisor/Stakeholder)
   - "What's driving this handoff?" (Options: New role/team, PTO coverage, Team reorganization, Leaving company)

3. Spawn `project-synthesizer` agent to gather:
   - All project documentation
   - People involved and their roles
   - Recent meetings and decisions
   - Current status and open items

---

## Phase 2: Gather Undocumented Knowledge

**Goal**: Capture tribal knowledge not in formal docs

**Actions**:
1. Use `AskUserQuestion` to gather from the current owner:

   **Critical context:**
   - "What's the #1 thing someone taking over needs to know?" (Free text)

2. Ask follow-up questions:
   - "What are the biggest risks or gotchas?"
   - "What relationships are critical to maintain?"
   - "What recurring tasks or ceremonies exist?"
   - "What access/permissions are needed?"
   - "What decisions are pending?"

3. Document all responses for handoff

---

## Phase 3: Identify Open Items

**Goal**: Create clear list of in-flight work

**Actions**:
1. Search for open action items:
   ```
   search "[project name] TODO OR action item OR blocked OR in progress"
   ```

2. Check recent meetings for commitments:
   ```
   meeting_lookup "[project name] past 2 weeks extract_transcript:\"true\""
   ```

3. Use Glean chat to synthesize:
   ```
   chat "What are the open action items, pending decisions, and blockers for [project]?"
   ```

4. Categorize:
   - Immediate (next 1-2 weeks)
   - Upcoming (next month)
   - Future (backlog)

---

## Phase 4: Generate Handoff Document

**Goal**: Create comprehensive handoff document

**Actions**:
1. Mark all tasks complete
2. Present the handoff document:

```markdown
# Project Handoff: [Project Name]

**Prepared by**: [Current owner]
**Date**: [Today's date]
**Reason for handoff**: [From Phase 1]

---

## Executive Summary

[3-4 paragraph summary including: what the project is, where it stands, critical context for success, and most important next steps]

---

## Project Overview

### What This Project Is
[Clear description of the project's purpose and scope]

### Why It Exists
[Business context, problem being solved, value proposition]

### Current Status
| Attribute | Value |
|-----------|-------|
| **Phase** | [Planning/In Progress/Launch Prep/etc.] |
| **Health** | [Green/Yellow/Red] - [Why] |
| **% Complete** | [Estimate] |
| **Target Date** | [Date] |

### Success Metrics
- [Metric 1]: [Current vs target]
- [Metric 2]: [Current vs target]

---

## People & Relationships

### Your Role
[What the new owner is responsible for]

### Key Contacts

| Person | Role | Relationship | How to Engage |
|--------|------|--------------|---------------|
| [Name] | [Role] | [Critical/Important/FYI] | [Best way to work with them] |

### Stakeholders to Keep Updated
- [Name/Group] - [What they care about] - [How often]

### Team Members
| Name | Responsibility | Notes |
|------|----------------|-------|
| [Name] | [Area] | [Working style, strengths] |

---

## Essential Knowledge

### The #1 Thing to Know
[Critical context from current owner - from Phase 2]

### Key Decisions Made
| Decision | When | Why | Who to Ask |
|----------|------|-----|------------|
| [Decision] | [Date] | [Rationale] | [Person] |

### Risks & Gotchas
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk] | H/M/L | H/M/L | [How to handle] |

### What's Not Documented
[Tribal knowledge that only exists in people's heads]

---

## Documentation Guide

### Must-Read Docs (in order)
1. **[Doc Title]** ([link]) - [Why it's essential] - ~[X] min read
2. **[Doc Title]** ([link]) - [Why] - ~[X] min read
3. **[Doc Title]** ([link]) - [Why] - ~[X] min read

### Reference Docs
- [Doc Title] - [When you'd need this]

### Where Things Live
| Resource | Location | Access Needed |
|----------|----------|---------------|
| [Code] | [Repo link] | [Permissions] |
| [Docs] | [Folder link] | [Permissions] |
| [Tracking] | [Jira/Asana link] | [Permissions] |

---

## Open Items

### Immediate (Next 2 Weeks)
| Item | Status | Owner | Deadline | Notes |
|------|--------|-------|----------|-------|
| [Item] | [Status] | [Transfer to new owner] | [Date] | [Context] |

### Upcoming (Next Month)
| Item | Status | Dependencies |
|------|--------|--------------|
| [Item] | [Status] | [What it depends on] |

### Pending Decisions
| Decision | Options | Who Decides | Deadline |
|----------|---------|-------------|----------|
| [Decision] | [A, B, C] | [Person] | [Date] |

### Blockers
| Blocker | Impact | Who Can Unblock | Action Needed |
|---------|--------|-----------------|---------------|
| [Blocker] | [Impact] | [Person] | [What to do] |

---

## Operations

### Recurring Tasks
| Task | Frequency | When | How |
|------|-----------|------|-----|
| [Task] | [Weekly/etc.] | [Day/time] | [Instructions] |

### Meetings to Attend
| Meeting | Frequency | Purpose | Your Role |
|---------|-----------|---------|-----------|
| [Meeting] | [Frequency] | [Purpose] | [What to do] |

### Access & Permissions Needed
- [ ] [System/tool] - request from [person/team]
- [ ] [Slack channel] - [how to join]
- [ ] [Repository] - [how to get access]

---

## First 30 Days

### Week 1: Orientation
- [ ] Read essential docs (above)
- [ ] Meet with [key person 1] to discuss [topic]
- [ ] Get access to [systems]
- [ ] Attend [meeting] as observer

### Week 2: Immersion
- [ ] Meet with [key person 2]
- [ ] Review [current work items]
- [ ] Shadow [recurring process]

### Week 3-4: Transition
- [ ] Take over [responsibility 1]
- [ ] Make decision on [pending item]
- [ ] Lead [meeting/process]

---

## Questions?

Contact [current owner] until [date] for questions about:
- [Topic 1]
- [Topic 2]

After that, contact [backup person] for ongoing questions.

---

*This handoff document was generated on [date] with context from Glean.*
```

---

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing `mcp__glean` tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### Incomplete Information
If project information is sparse:
- Focus more on the tribal knowledge questions in Phase 2
- Note gaps clearly in the handoff doc
- Suggest the owner fill in missing sections manually

### Owner Unavailable for Questions
If the current owner can't provide context:
- Generate handoff from available documentation
- Mark "Needs Input" on sections requiring owner knowledge
- Note limitations clearly at the top of the document
