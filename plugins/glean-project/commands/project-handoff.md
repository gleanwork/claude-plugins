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
- **Be skeptical**: Not every doc found is relevant to handoff
- **Quality over quantity**: Focus on what the new owner actually needs

---

## Phase 1: Gather Current Context

**Goal**: Understand the project's current state

**Actions**:
1. Use `AskUserQuestion` to get handoff context:
   - "What is your role on this project?" (Options: Owner/Lead, Contributor, Advisor/Stakeholder)
   - "What's driving this handoff?" (Options: New role/team, PTO coverage, Team reorganization, Leaving company)

2. Spawn `project-synthesizer` agent to gather:
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

## Phase 4: Vet All Content (CRITICAL)

**Goal**: Filter to what's genuinely needed for handoff - BE SKEPTICAL

For each document found, evaluate:

**Handoff Relevance Test**
- Does the new owner need this to take over?
- ✅ ESSENTIAL: Can't succeed without this
- 📚 REFERENCE: Useful to know where it is
- ❌ SKIP: Historical, tangential, or too detailed for handoff

**Currency Test**
- Is this still accurate?
- ✅ CURRENT: Reflects present state
- ⚠️ AGING: May not be current - note this
- ❌ STALE: Misleading - don't include

**Actionability Test**
- Does this require action from new owner?
- ✅ ACTION NEEDED: Clear follow-up required
- 📋 AWARENESS: Should know but no action
- ❌ FYI: Can discover later if needed

For each person mentioned, evaluate:
- Are they still relevant to this project?
- What's the actual relationship (not just they were mentioned once)?
- Why would the new owner need to know them?

For each open item:
- Is this actually still open?
- Is this the new owner's responsibility?
- What's the real deadline/urgency?

---

## Phase 5: Generate Handoff Document

**Goal**: Create comprehensive, vetted handoff document

**Actions**:
Present the handoff document:

```markdown
# Project Handoff: [Project Name]

**Prepared by**: [Current owner]
**Date**: [Today's date]
**Reason for handoff**: [From Phase 1]

---

## Content Quality

| Category | Items Found | Included | Reason for Filtering |
|----------|-------------|----------|----------------------|
| Documents | [X] | [Y] | [Z] historical/tangential |
| People | [X] | [Y] | [Z] no longer relevant |
| Open Items | [X] | [Y] | [Z] already resolved |

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

---

## People & Relationships (Vetted)

### Key Contacts (must maintain these relationships)
| Person | Role | Relationship | How to Engage | Why Critical |
|--------|------|--------------|---------------|--------------|
| [Name] | [Role] | [Critical/Important] | [Best approach] | [Specific reason] |

### Stakeholders to Keep Updated
- [Name/Group] - [What they care about] - [How often]

### Not Included
| Person | Reason |
|--------|--------|
| [Name] | Historical involvement only |
| [Name] | Left project |

---

## Essential Knowledge

### The #1 Thing to Know
[Critical context from current owner - from Phase 2]

### Key Decisions Made (that still matter)
| Decision | When | Why | Implications |
|----------|------|-----|--------------|
| [Decision] | [Date] | [Rationale] | [What this means for new owner] |

### Risks & Gotchas
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk] | H/M/L | H/M/L | [How to handle] |

### What's Not Documented
[Tribal knowledge that only exists in people's heads]

---

## Documentation Guide (Vetted)

### Must-Read Docs (in order)
Essential for taking over:

1. **[Doc Title]** ([link])
   - **Why essential**: [Specific reason]
   - **Read time**: ~[X] min
   - **Last updated**: [date] ✅

2. **[Doc Title]** ([link])
   - **Why essential**: [Reason]
   - **Read time**: ~[X] min

### Reference When Needed
Know where these are but don't read upfront:
- **[Doc Title]** - [When you'd need it]

### Skipped Documents
| Doc | Reason |
|-----|--------|
| [Title] | Historical - superseded by [other doc] |
| [Title] | Too detailed for handoff - explore later if needed |

### Where Things Live
| Resource | Location | Access Needed |
|----------|----------|---------------|
| [Code] | [Repo link] | [Permissions] |
| [Docs] | [Folder link] | [Permissions] |

---

## Open Items (Vetted)

### Immediate (Next 2 Weeks)
| Item | Status | Deadline | What To Do | Notes |
|------|--------|----------|------------|-------|
| [Item] | [Status] | [Date] | [Specific action] | [Context] |

### Pending Decisions
| Decision | Options | Who Decides | Deadline |
|----------|---------|-------------|----------|
| [Decision] | [A, B, C] | [Person] | [Date] |

### Blockers
| Blocker | Impact | Who Can Unblock |
|---------|--------|-----------------|
| [Blocker] | [Impact] | [Person] |

### Filtered Out
| Item | Reason |
|------|--------|
| [Item] | Already resolved |
| [Item] | Not new owner's responsibility |

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

---

## First 30 Days

### Week 1: Orientation
- [ ] Read essential docs (above)
- [ ] Meet with [key contact 1]
- [ ] Get access to [systems]

### Week 2: Immersion
- [ ] Take ownership of [first item]
- [ ] Attend [key meeting]

### Week 3-4: Transition
- [ ] Lead [responsibility]
- [ ] Make decision on [pending item]

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

### Incomplete Information
If project information is sparse:
- Focus more on the tribal knowledge questions in Phase 2
- Note gaps clearly in the handoff doc
- Don't pad with marginally relevant docs

### Owner Unavailable for Questions
If the current owner can't provide context:
- Generate handoff from available documentation
- Mark "Needs Input" on sections requiring owner knowledge
- Note limitations clearly at the top of the document
