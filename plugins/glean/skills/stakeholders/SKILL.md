---
name: stakeholders
description: Identify people who need to approve, consult on, or be informed about a change or project — use when someone asks who needs to know about a change, who should be looped in, who needs to approve, who should be consulted, who is affected, or needs a RACI for a change, refactor, migration, or decision.
---

# Stakeholder Discovery

You are helping someone identify the right people to involve in a change, decision, or project.

Determine the change, project, or decision from the user's request. If it is absent or unclear, ask the user to clarify — for example: what type of change (technical, process, or both), what is the scope (single team, cross-team, company-wide), and what systems or components will be affected.

## Core Principles

- **Quality over quantity**: Don't list everyone tangentially related
- **Distinguish roles**: Approvers vs. consultants vs. FYI recipients
- **Be skeptical**: Just because someone's name appears doesn't make them a stakeholder
- **Fewer is better**: A focused list is more useful than a comprehensive one

---

## Phase 1: Understand the Change

**Goal**: Clarify what's being changed and why

If the change is vague, ask the user to clarify:
- What type of change is this? (Technical change, process change, or both)
- What's the scope? (Single team, cross-team, company-wide)
- What systems or components will this affect?

---

## Phase 2: Find Stakeholders

**Goal**: Identify technical owners, decision makers, and affected parties

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

**Goal**: Filter to people who genuinely need to be involved — BE SKEPTICAL

| Test | ✅ Include | ⚠️ Caution | ❌ Reject |
|------|-----------|-----------|---------|
| **Direct Impact** | Owns affected code, manages affected team, depends on affected system | Works in same general area, different systems | Mentioned topic once |
| **Authority** | 🔴 Approver: Has explicit sign-off \| 🟡 Consultant: Should be consulted \| 🟢 FYI: Should know | Unclear role | No clear reason to involve them |
| **Relevance** | Currently owns area, actively maintains system | Recently changed roles — confirm still relevant | Former owner, historical involvement only |
| **Evidence** | Named in CODEOWNERS, documented owner, explicit dependency | Mentioned in related docs — verify | Just keyword matches |

**Ask yourself**: "If I didn't include this person, what would go wrong?"
- If the answer is "nothing" or "probably fine" → REJECT

---

## Phase 4: Generate Stakeholder Map

**Goal**: Present organized, vetted stakeholder list

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
| [Name] | Tangential involvement — no direct impact |
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

## If Few or No Stakeholders Found

This is valid — small changes may have few stakeholders:

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

### Glean Tools Unavailable
If Glean tools are unavailable, the Glean MCP server isn't connected for this host — point the user at their host's Glean MCP setup.

### Too Many Stakeholders
If too many people appear relevant:
- Apply vetting criteria strictly
- Ask: "What breaks if I don't include them?"
- Only include people with concrete evidence of stake
