---
description: Find someone who truly knows about a topic by combining code, doc, and meeting signals — not just titles
when_to_use: |
  Trigger phrases include "who knows about", "find someone who knows", "expert on", "go-to person for", "who has worked on", "who has expertise in", "who can I ask about", "subject matter expert".

  Don't use this for plain name lookups (use the `using-glean` skill's employee_search reference). Use this when the user wants real expertise signals, not just role/title matches.
argument-hint: Topic or technology (e.g., "Kubernetes", "billing system")
allowed-tools: [AskUserQuestion]
---

# Find Expert

You are helping someone find people who *actually* know about a topic - not just by org chart, but by real contributions and activity.

## Input

**Topic:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

## Core Principles

- **Activity over title**: Someone actively contributing beats someone nominally responsible
- **Multiple signals**: Code + docs + discussions = true expertise
- **Be skeptical**: Just mentioning a topic doesn't make someone an expert
- **Quality over quantity**: 3 vetted experts beats 10 names

---

## Phase 1: Understand the Query

**Goal**: Clarify what expertise is needed

Input: $ARGUMENTS

**Actions**:
1. If topic is vague, use `AskUserQuestion` to clarify:
   - "What type of expertise do you need?" (Options: Answer questions, Review code, Make decisions, General knowledge)
   - "Is this about a specific system or a general technology?" (Options: Specific internal system, General technology/skill)

---

## Phase 2: Gather Expertise Signals

**Goal**: Find people with multiple evidence of expertise

**Actions**:
1. Start with Glean chat for a synthesized answer:
   ```
   chat "Who are the experts on [topic] at our company? Consider code contributions, documentation authorship, and meeting participation."
   ```

2. Gather additional signals with direct searches:
   ```
   employee_search "[topic]"
   code_search "[topic] contributors"
   search "[topic] RFC OR design doc"
   ```

3. Cross-reference to find people appearing in multiple sources

---

## Phase 3: Vet Each Candidate (CRITICAL)

**Goal**: Filter out weak candidates - BE SKEPTICAL

For each person found, evaluate:

**Expertise Evidence Test**
- Did they do significant work, or just mentioned the topic once?
- ✅ INCLUDE: Authored RFC, significant code contributions, documented expert
- ❌ REJECT: Single Slack mention, attended a meeting, tangential involvement

**Recency Test**
- Are they still working in this area?
- ✅ INCLUDE: Active in past 6 months
- ⚠️ CAUTION: Active 6-12 months ago - note as "historical expert"
- ❌ REJECT: No activity in 12+ months (unless noting as historical context only)

**Role Relevance Test**
- Are they still in a position to help?
- ✅ INCLUDE: Still on relevant team, still has context
- ⚠️ CAUTION: Changed teams but retains knowledge - note this
- ❌ REJECT: Left company, completely different role now

**Multiple Signals Test**
- Do multiple sources confirm expertise?
- 🏆 Strong: Code + docs + discussions (3+ signals)
- ✅ Good: 2 independent signals
- ⚠️ Weak: Single signal only - include with caveat
- ❌ REJECT: No concrete evidence, just keyword matches

**Vetting Table (include in output)**:
| Name | Evidence Count | Recency | Verdict |
|------|----------------|---------|---------|
| [Name] | 3 signals | Active | ✅ Include |
| [Name] | 1 signal | 18mo ago | ❌ Reject - stale, weak evidence |

---

## Phase 4: Generate Expertise Report

**Goal**: Present ONLY vetted experts with confidence levels

**Actions**:
Present the report:

```markdown
# Expert Finder: [Topic]

## Vetting Summary
| Candidates Found | Passed Vetting | Rejected |
|------------------|----------------|----------|
| [X] | [Y] | [Z] |

## Top Experts

### 1. [Name] - [Current Role]
**Confidence**: High / Medium / Low
**Expertise Signals:**
- [Signal 1 with evidence]
- [Signal 2 with evidence]

**Why they're a good fit:** [Specific evidence]
**Last active:** [When]
**Contact:** [email/Slack]

---

### 2. [Name] - [Current Role]
**Confidence**: [Level]
**Expertise Signals:**
- [Signal 1]
- [Signal 2]

**Why they're a good fit:** [Specific evidence]
**Last active:** [When]

---

## Also Consider

### Historical Experts
People who had expertise but may be less current:
- **[Name]**: Original architect (now on [other team]) - useful for historical context

### By Official Role
- **[Team]**: Officially owns this area
- **[Person]**: Team lead for [related team]

## Rejected Candidates
| Name | Reason |
|------|--------|
| [Name] | Single Slack mention - insufficient evidence |
| [Name] | No activity in 18 months |

## How to Engage

### For Quick Questions
Try [Person] in Slack - responsive on this topic

### For Deep Dives
Set up time with [Person] - has historical context

### For Official Decisions
Loop in [Person] - has sign-off authority
```

---

## If No Experts Pass Vetting

This is a valid outcome. Present clearly:

```markdown
# Expert Finder: [Topic]

## No High-Confidence Experts Found

I searched for experts on [topic] but didn't find people with strong evidence of expertise.

**What I searched:**
- Employee search: [results]
- Code contributions: [results]
- Documentation: [results]

**This could mean:**
- This is a new area without established experts
- Expertise exists but isn't well-documented
- Different terminology is used internally

**Suggested next steps:**
1. Try broader term: [suggestion]
2. Ask in [related Slack channel]
3. Check with [related team] leadership
```

---

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing Glean MCP tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### Too Many Candidates
If overwhelmed with results:
- Apply vetting criteria strictly
- Only include those with 2+ signals
- Prioritize recency
