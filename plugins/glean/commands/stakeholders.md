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

## Phase 2: Find Stakeholders

**Goal**: Identify technical owners, decision makers, and affected parties

**Actions**:
1. Start with Glean chat for a synthesized stakeholder view:
   ```
   chat "Who are the stakeholders for [change/system]? Include code owners, decision makers, and teams that depend on this."
   ```

2. Gather specific details with direct searches:
   ```
   code_search "[affected system] contributors"
   search "[affected system] RFC OR architecture doc"
   employee_search "[affected system] team lead OR manager"
   ```

3. Search for downstream dependencies:
   ```
   search "[affected system] integration OR dependency OR consumer"
   ```

---

## Phase 3: Generate Stakeholder Map

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
