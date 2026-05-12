---
description: Identify the people who need to be informed, consulted, or asked to approve a change, project, or decision
when_to_use: |
  Trigger phrases include "who needs to know about", "who should I loop in", "stakeholders for", "who needs to approve", "who should I consult on", "who's affected by", "RACI for", "who should review".

  Use when the user is planning a change, refactor, migration, or strategic decision and needs to know who to inform, consult, or get approval from.
argument-hint: Change description (e.g., "migrating auth to OAuth")
allowed-tools: [AskUserQuestion]
---

# Stakeholder Discovery

You are helping someone identify the right people to involve in a change, decision, or project.

## Input

**Change:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

## Core Principles

- **Quality over quantity**: Don't list everyone tangentially related
- **Distinguish roles**: Approvers vs consultants vs FYI recipients
- **Be skeptical**: Just because someone's name appears doesn't make them a stakeholder
- **Fewer is better**: A focused list is more useful than a comprehensive one

---

## Phase 1: Understand the Change

**Goal**: Clarify what's being changed and why

Input: $ARGUMENTS

**Actions**:
1. If change is vague, use `AskUserQuestion` to clarify:
   - "What type of change is this?" (Options: Technical change, Process change, Both)
   - "What's the scope?" (Options: Single team, Cross-team, Company-wide)
   - If still unclear, ask: "What systems or components will this affect?"

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

## Phase 3: Vet Each Stakeholder (CRITICAL)

**Goal**: Filter to people who genuinely need to be involved - BE SKEPTICAL

For each person found, evaluate:

**Direct Impact Test**
- Will this change directly affect their work or systems?
- ✅ INCLUDE: Owns affected code, manages affected team, depends on affected system
- ❌ REJECT: Works in same general area but different systems, mentioned topic once

**Decision Authority Test**
- Do they need to approve, or just be informed?
- 🔴 Approver: Has explicit sign-off authority
- 🟡 Consultant: Has relevant expertise, should be consulted
- 🟢 FYI: Should know, but no action required from them
- ❌ REJECT: No clear reason to involve them

**Current Relevance Test**
- Are they still in a relevant position?
- ✅ INCLUDE: Currently owns area, actively maintains system
- ⚠️ CAUTION: Recently changed roles - confirm still relevant
- ❌ REJECT: Former owner who's moved on, historical involvement only

**Evidence Threshold**
- Is there concrete evidence they're a stakeholder?
- ✅ INCLUDE: Named in CODEOWNERS, documented owner, explicit dependency
- ⚠️ CAUTION: Mentioned in related docs - verify relevance
- ❌ REJECT: Just keyword matches, tangential involvement

**Ask yourself**: "If I didn't include this person, what would go wrong?"
- If the answer is "nothing" or "probably fine" → REJECT

---

## Phase 4: Generate Stakeholder Map

**Goal**: Present organized, vetted stakeholder list

**Actions**:
Present the stakeholder map:

```markdown
# Stakeholder Map: [Change/Project]

## Summary
[Brief description of the change and why stakeholders matter]

## Vetting Summary
| Candidates Found | Included | Rejected |
|------------------|----------|----------|
| [X] | [Y] | [Z] |

## Decision Makers (Must Approve)
People who need to approve:
| Name | Role | Why They Approve | Evidence |
|------|------|------------------|----------|
| [Name] | [Role] | [Reason] | [Source] |

## Technical Owners (Must Consult)
People who own affected code/systems:
| Name | Ownership | Last Active | Evidence |
|------|-----------|-------------|----------|
| [Name] | [What they own] | [When] | [CODEOWNERS/commits] |

## Downstream Teams (Must Inform)
Teams affected by this change:
| Team/Person | Impact | Evidence |
|-------------|--------|----------|
| [Team] | [How affected] | [Integration/dependency doc] |

## Rejected Candidates
| Name | Reason |
|------|--------|
| [Name] | Tangential involvement - no direct impact |
| [Name] | Former owner, no longer relevant |
| [Name] | Just mentioned topic, not a stakeholder |

## Recommended Engagement Order

### Phase 1: Initial Consultation
1. Talk to [key person] about [specific question]
2. Review with [technical owner]

### Phase 2: Approval
3. Get sign-off from [decision maker]

### Phase 3: Communicate
4. Inform [downstream teams]
```

---

## If Few/No Stakeholders Found

This is valid - small changes may have few stakeholders:

```markdown
# Stakeholder Map: [Change/Project]

## Minimal Stakeholders Identified

This change appears to have limited stakeholder impact.

**Confirmed Stakeholders:**
- [Name]: [Role/reason]

**Why the list is small:**
- Change is contained to [specific area]
- No downstream dependencies found
- Single team ownership

**Verify this is correct:**
- Check with [team lead] that no dependencies were missed
- Confirm [system] doesn't have undocumented consumers
```

---

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing Glean MCP tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### Too Many Stakeholders
If too many people appear relevant:
- Apply vetting criteria strictly
- Ask: "What breaks if I don't include them?"
- Only include people with concrete evidence of stake
