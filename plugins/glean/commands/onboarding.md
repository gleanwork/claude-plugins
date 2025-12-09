---
description: Get up to speed on a new team or project
argument-hint: Team or project name (e.g., "payments team", "search infrastructure")
---

# Team Onboarding

You are helping someone new get up to speed on a team or project. Gather essential context about people, documents, and current priorities.

## Core Principles

- **Actionable over comprehensive**: Focus on what to read and who to talk to
- **Technical and social**: Include both code context and people context
- **Use TodoWrite**: Track progress throughout

---

## Phase 1: Get Overview

**Goal**: Quick understanding of the team/project

Input: $ARGUMENTS

**Actions**:
1. Create todo list with all phases
2. Use Glean chat for a synthesized overview:
   ```
   chat "Give me an overview of the [team/project]. What do they own? What are their main responsibilities? What are they working on?"
   ```
3. Summarize the overview for context

---

## Phase 2: Find Key People

**Goal**: Identify who to meet and learn from

**Actions**:
1. Launch a people-finder agent:
   - Prompt: "Find people on [team/project]. Identify: team lead/manager, senior engineers, and any recent hires (potential onboarding buddies). Include their roles and contact info."

2. Build a people map:
   - Leadership: Who runs this team?
   - Senior folks: Who are the experienced people?
   - Recent hires: Who else is new?

---

## Phase 3: Find Foundational Documents

**Goal**: Identify must-read docs

**Actions**:
1. Launch 2 parallel agents:

   **enterprise-searcher agent #1: Onboarding Docs**
   - Prompt: "Search for onboarding, getting started, or new hire documentation for [team/project]."

   **enterprise-searcher agent #2: Architecture Docs**
   - Prompt: "Search for architecture docs, design docs, runbooks, or playbooks for [team/project]."

2. For the most relevant docs, use doc-reader agent to summarize key points

---

## Phase 4: Understand Current State

**Goal**: What's happening now?

**Actions**:
1. Launch 2 parallel agents:

   **enterprise-searcher agent: Recent Activity**
   - Prompt: "Search for [team/project] documents updated in the past month. Focus on project updates, status reports, and recent decisions."

   **meeting-analyzer agent: Recent Meetings**
   - Prompt: "Find [team/project] team meetings in the past 2 weeks. What are the current priorities and active discussions?"

---

## Phase 5: Generate Onboarding Guide

**Goal**: Create a personalized onboarding doc

**Actions**:
1. Mark all todos complete
2. Present the onboarding guide:

```markdown
# Onboarding: [Team/Project Name]

## Team Overview
[2-3 sentence summary from Phase 1]

## Key People

### Leadership
| Name | Role | Contact |
|------|------|---------|
| [Name] | [Role] | [email] |

### Go-To Experts
| Name | Expertise |
|------|-----------|
| [Name] | [Area] |

### Recent Hires (Onboarding Buddies)
- [Name] - started [date]

## Essential Reading

### Must-Read Docs
1. **[Doc Title]** ([link]) - [why it's important]
2. **[Doc Title]** ([link]) - [why it's important]

### Architecture References
- [System Design Doc] ([link])

## Current Priorities
- **[Initiative 1]**: [brief description]
- **[Initiative 2]**: [brief description]

## Key Systems & Repos
| System/Repo | Purpose |
|-------------|---------|
| [Name] | [What it does] |

## Meetings to Join
| Meeting | Frequency | Purpose |
|---------|-----------|---------|
| [Name] | [freq] | [what it's for] |

## Suggested First Steps
1. Read [essential doc]
2. Set up 1:1 with [key person]
3. Get access to [system/repo]
4. Attend [meeting]

## Questions to Ask
- [Question about team priorities]
- [Question about current projects]
```

---
