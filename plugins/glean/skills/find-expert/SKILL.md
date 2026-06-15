---
name: find-expert
description: Find subject matter experts on a topic, technology, or internal system by combining real expertise signals (code contributions, document authorship, and meeting or discussion activity) rather than relying on job titles. Use this whenever the user wants to know who to ask about something — phrasings such as who knows about, who is the expert on, the go-to person for, who has worked on, who can I ask about, or subject matter expert for. Use it even when the user does not say the word expert but clearly needs a person with deep, demonstrated knowledge of an area. Do not use it for plain directory lookups (an email address, manager, or org placement with no expertise angle), which is a simple employee lookup.
---

# Find Expert

Find people who *actually* know about a topic — not just by org chart, but by real contributions and activity.

## Clarify the topic

Work from the topic the user named. If it is ambiguous, ask a brief clarifying question before searching — for example, whether they need someone to answer questions, review code, or make a decision, and whether this is a specific internal system or a general technology. A single sentence of clarification is enough; don't interrogate.

## Core Principles

- **Activity over title**: Someone actively contributing beats someone nominally responsible
- **Multiple signals**: Code + docs + discussions = true expertise
- **Be skeptical**: Just mentioning a topic doesn't make someone an expert
- **Quality over quantity**: 3 vetted experts beats 10 names

## Phase 1: Gather Expertise Signals

Find people with multiple evidence of expertise:

1. Start with a synthesized answer from your knowledge tool:
   ```
   chat "Who are the experts on [topic] at our company? Consider code contributions, documentation authorship, and meeting participation."
   ```

2. Gather additional signals with direct searches:
   ```
   employee_search "[topic]"
   code_search "[topic] contributors"
   search "[topic] RFC OR design doc"
   ```

3. Cross-reference to find people appearing in multiple sources.

## Phase 2: Vet Each Candidate

For each person found, evaluate:

| Test | ✅ Include | ⚠️ Caution | ❌ Reject |
|------|-----------|-----------|---------|
| **Evidence** | Authored RFC, significant code contributions, documented expert | Single signal but significant | Single Slack mention, attended a meeting |
| **Recency** | Active in past 6 months | Active 6-12 months ago — note as historical | No activity in 12+ months |
| **Role** | Still on relevant team, still has context | Changed teams but retains knowledge | Left company, completely different role |
| **Signals** | 3+ independent signals | 2 independent signals | Single signal only |

**Reject these:**
- Single Slack mentions with no other evidence
- People who attended meetings but didn't contribute
- Names that appear in passing, not as experts
- Former employees
- People with outdated involvement

## Phase 3: Generate Expertise Report

```markdown
# Expert Finder: [Topic]

## Vetting Summary
| Candidates Found | Passed Vetting | Rejected |
|------------------|----------------|----------|
| [X] | [Y] | [Z] |

## Top Experts

### 1. [Name] — [Current Role]
**Confidence**: High
**Expertise Signals:**
- [Signal 1 with evidence]
- [Signal 2 with evidence]

**Why they're a good fit:** [Specific evidence]
**Last active:** [When]
**Contact:** [email/Slack]

---

## Also Consider

### Historical Experts
People who had expertise but may be less current:
- **[Name]**: Original architect (now on [other team]) — useful for historical context

### By Official Role
- **[Team]**: Officially owns this area
- **[Person]**: Team lead for [related team]

## Rejected Candidates
| Name | Reason |
|------|--------|
| [Name] | Single Slack mention — insufficient evidence |
| [Name] | No activity in 18 months |

## How to Engage

### For Quick Questions
Try [Person] in Slack — responsive on this topic

### For Deep Dives
Set up time with [Person] — has historical context

### For Official Decisions
Loop in [Person] — has sign-off authority
```

## If No Experts Pass Vetting

```markdown
# Expert Finder: [Topic]

## No High-Confidence Experts Found

Searched for experts on [topic] but didn't find people with strong evidence of expertise.

**This could mean:**
- This is a new area without established experts
- Expertise exists but isn't well-documented
- Different terminology is used internally

**Suggested next steps:**
1. Try a broader term: [suggestion]
2. Ask in [related Slack channel]
3. Check with [related team] leadership
```

## Troubleshooting

### Knowledge Tools Not Connected
If you see errors about missing Glean tools, confirm the Glean MCP server is configured for your host and re-run setup if needed before retrying.
