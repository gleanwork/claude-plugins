---
description: Get up to speed on a new team, project, or area — surface key people, foundational docs, current priorities, and recent activity
when_to_use: |
  Trigger phrases include "onboard me on", "get me up to speed on", "intro to [team / area / project]", "I'm new to", "help me understand [team]", "where do I start with", "ramp up on", "background on the [team] team".

  Use when the user is joining a new team, taking on a new area, or learning a system from scratch and wants a structured ramp-up rather than searching ad hoc.
argument-hint: Team or project name (e.g., "payments team", "search infrastructure")
---

# Team Onboarding

You are helping someone new get up to speed on a team or project. Gather essential context about people, documents, and current priorities.

## Input

**Team/Project:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

## Core Principles

- **Actionable over comprehensive**: Focus on what to read and who to talk to
- **Technical and social**: Include both code context and people context
- **Be skeptical**: Not every doc found is essential reading
- **Quality over quantity**: 5 must-read docs beats 20 "might be useful" links

---

## Phase 1: Get Overview

**Goal**: Quick understanding of the team/project

Input: $ARGUMENTS

**Actions**:
1. Use Glean chat for a synthesized overview:
   ```
   chat "Give me an overview of the [team/project]. What do they own? What are their main responsibilities? What are they working on?"
   ```
2. Summarize the overview for context

---

## Phase 2: Find Key People

**Goal**: Identify who to meet and learn from

**Actions**:
1. Find team members:
   ```
   employee_search "[team/project]"
   ```

2. Build a people map:
   - Leadership: Who runs this team?
   - Senior folks: Who are the experienced people?
   - Recent hires: Who else is new?

---

## Phase 3: Find Key Documents

**Goal**: Identify must-read docs and current priorities

**Actions**:
1. Search for foundational docs:
   ```
   search "[team/project] onboarding OR getting started OR architecture"
   ```

2. Search for recent activity:
   ```
   search query="[team/project]" updated="past_month"
   ```

3. Find recent team meetings for current priorities:
   ```
   meeting_lookup "[team/project] past 2 weeks"
   ```

---

## Phase 4: Vet All Content (CRITICAL)

**Goal**: Filter to truly essential items - BE SKEPTICAL

For each document, evaluate:

**Essential Reading Test**
- Does someone new NEED to read this?
- ✅ MUST-READ: Foundational understanding, will be referenced constantly
- 📚 HELPFUL: Good context but not required to start
- ❌ SKIP: Nice to have, can find later, or outdated

**Freshness Test**
- Is this current?
- ✅ CURRENT: Updated in past 6 months
- ⚠️ AGING: 6-12 months - include with note
- ❌ STALE: 12+ months with no updates - likely misleading

**Accuracy Test**
- Does this reflect reality?
- ✅ ACCURATE: Matches what the team actually does
- ⚠️ OUTDATED: May not reflect current state
- ❌ MISLEADING: Significantly wrong - don't include

**Essential Reading Criteria**:
Include ONLY if the doc:
1. Is referenced by team members regularly
2. Contains foundational context that won't change
3. Is necessary to understand before contributing
4. Is the canonical source for something important

**For people, evaluate**:
- Is this person still on the team?
- Are they a good first contact or too senior/busy?
- What's the best reason to meet with them?

---

## Phase 5: Generate Vetted Onboarding Guide

**Goal**: Create a focused, actionable onboarding guide

**Actions**:
Present the onboarding guide:

```markdown
# Onboarding: [Team/Project Name]

## Vetting Summary
| Items Found | Essential | Helpful | Skipped |
|-------------|-----------|---------|---------|
| Docs: [X] | [Y] | [Z] | [W] |
| People: [X] | [Y] | - | - |

## Team Overview
[2-3 sentence summary - focus on what matters for a new person]

## Key People

### First Contacts (Start here)
| Name | Role | Good For | Contact |
|------|------|----------|---------|
| [Name] | [Role] | [Why meet first] | [email] |

### Leadership
| Name | Role | Contact |
|------|------|---------|
| [Name] | [Role] | [email] |

### Domain Experts
| Name | Expertise | When to Contact |
|------|-----------|-----------------|
| [Name] | [Area] | [What questions] |

### Recent Hires (Onboarding Buddies)
- [Name] - started [date] - can share fresh perspective

## Essential Reading (Vetted)

### Must-Read First (in order)
These are required to start contributing:

1. **[Doc Title]** ([link])
   - **Why essential**: [specific reason]
   - **Read time**: ~[X] minutes
   - **Last updated**: [date] ✅

2. **[Doc Title]** ([link])
   - **Why essential**: [reason]
   - **Read time**: ~[X] minutes
   - **Last updated**: [date]

### Reference When Needed
Don't read upfront, but know where to find:
- **[Doc Title]** ([link]) - [when you'd need it]

### Skipped Docs
| Doc | Reason Skipped |
|-----|----------------|
| [Title] | Outdated (last updated [date]) |
| [Title] | Not essential for new team members |

## Current Priorities
[Only include if clearly current]
- **[Initiative 1]**: [brief description]

## Key Systems & Repos
| System/Repo | Purpose | Start Here? |
|-------------|---------|-------------|
| [Name] | [What it does] | Yes/No |

## Meetings to Join
| Meeting | Frequency | Purpose | Join Immediately? |
|---------|-----------|---------|-------------------|
| [Name] | [freq] | [what it's for] | Yes/No |

## Suggested First Week

### Day 1-2: Reading
- [ ] Read [essential doc 1]
- [ ] Read [essential doc 2]

### Day 3-4: People
- [ ] Meet with [first contact] - discuss [topic]
- [ ] Introduce yourself in [Slack channel]

### Day 5: Systems
- [ ] Get access to [system]
- [ ] Clone [repo] and explore

## What NOT to Worry About Yet
- [Topic that seems important but isn't for week 1]
- [System that's complex but not needed initially]
```

---

## If Limited Information Found

Be honest about gaps:

```markdown
# Onboarding: [Team/Project Name]

## Limited Onboarding Resources

I found limited onboarding documentation for this team/project.

**What's available:**
- [Summary of what was found]

**Gaps:**
- No formal onboarding doc
- [Other gaps]

**Suggested approach:**
1. Start with [best contact found]
2. Ask them for: [specific questions]
3. Consider documenting what you learn for the next person
```

---

## Troubleshooting

### Team/Project Not Found
If the team or project isn't found:
- Ask for alternative names or acronyms
- Search for key people known to be on the team
- Check if this is a new team without much documentation

### Limited Information Available
If little documentation exists:
- This is valuable information - note the gap
- Focus on people discovery
- Don't pad with marginally relevant docs
