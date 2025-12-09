---
description: Identify stakeholders for a change, project, or decision
argument-hint: Change description (e.g., "migrating auth to OAuth")
---

# Stakeholder Discovery

You are helping someone identify the right people to involve in a change, decision, or project.

## Core Principles

- **Quality over quantity**: Don't list everyone tangentially related
- **Distinguish roles**: Approvers vs consultants vs FYI recipients
- **Use TodoWrite**: Track progress throughout

---

## Phase 1: Understand the Change

**Goal**: Clarify what's being changed and why

Input: $ARGUMENTS

**Actions**:
1. Create todo list with all phases
2. If change is vague, ask:
   - "What systems or components will this affect?"
   - "Is this a technical change, process change, or both?"
   - "What's the scope - single team or cross-team?"

---

## Phase 2: Find Technical Owners

**Goal**: Identify who owns the affected code/systems

**Actions**:
1. Launch 2 parallel agents:

   **people-finder agent #1: Code Owners**
   - Prompt: "Find people who own or frequently contribute to code related to [affected systems]. Look for recent contributors and maintainers."

   **people-finder agent #2: Documentation Owners**
   - Prompt: "Find authors of architecture docs, design docs, or RFCs for [affected area]. These people often have decision authority."

---

## Phase 3: Find Organizational Stakeholders

**Goal**: Identify team leads and decision makers

**Actions**:
1. Launch 2 parallel agents:

   **people-finder agent: Team Leadership**
   - Prompt: "Find managers and tech leads for teams that own [affected systems]."

   **enterprise-searcher agent: Related Discussions**
   - Prompt: "Search for past discussions, RFCs, or decisions about [topic]. Note who was involved in those decisions."

---

## Phase 4: Find Downstream Dependencies

**Goal**: Identify who consumes or depends on the affected systems

**Actions**:
1. Launch an enterprise-searcher agent:
   - Prompt: "Search for integrations, dependencies, or consumers of [affected system]. Find teams or systems that would be impacted by changes."

---

## Phase 5: Generate Stakeholder Map

**Goal**: Present organized stakeholder list with engagement plan

**Actions**:
1. Mark all todos complete
2. Present the stakeholder map:

```markdown
# Stakeholder Map: [Change/Project]

## Summary
[Brief description of the change and why stakeholders matter]

## Decision Makers
People who need to approve:
| Name | Role | Why They Approve |
|------|------|------------------|
| [Name] | [Role] | [Reason] |

## Technical Owners
People who own affected code/systems:
| Name | Ownership | Recent Activity |
|------|-----------|-----------------|
| [Name] | [What they own] | [Activity] |

## Subject Matter Experts
People with deep knowledge:
| Name | Expertise | Contact |
|------|-----------|---------|
| [Name] | [Area] | [How to reach] |

## Downstream Teams
Teams affected by this change:
| Team/Person | Impact |
|-------------|--------|
| [Team] | [How affected] |

## Informed Parties
People who should know but don't need to approve:
- [Name] - [Why they should know]

## Recommended Engagement Order

### Phase 1: Initial Consultation
1. Talk to [key person] about [specific question]
2. Review with [technical owner]

### Phase 2: Broader Review
3. Share proposal with [team]
4. Get sign-off from [decision maker]

### Phase 3: Communicate
5. Inform [downstream teams]
```

---
