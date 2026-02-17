---
description: Research enterprise context before entering plan mode
argument-hint: Task description or problem statement (e.g., "Add authentication to API", "Refactor payment service")
---

# Planning Preparation

Research enterprise context before entering plan mode by gathering design docs, similar implementations, stakeholders, and related systems.

## Input

**Task:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

**Planning for:** $ARGUMENTS

---

## Why This Matters

Better planning comes from enterprise context:
- **Design Decisions**: Understand what was tried before, why it worked or didn't
- **Similar Implementations**: Find proven patterns and learn from past approaches
- **Stakeholders**: Identify who needs to be involved or who has relevant knowledge
- **Related Systems**: Understand dependencies and integration points
- **Proven Patterns**: Learn from how other teams solved similar problems

---

## Process

### Phase 1: Search for Design & Architecture

**Actions**:
Find design documents, RFCs, and architectural decisions related to your task:

```
search "$ARGUMENTS architecture OR design doc"
search "$ARGUMENTS RFC OR proposal"
search "$ARGUMENTS pattern OR best practice"
```

Look for:
- Existing design decisions that apply
- Architectural patterns already in use
- Why past decisions were made
- Rejected approaches and lessons learned

### Phase 2: Find Code Implementations & Patterns

**Actions**:
Search for similar implementations across the codebase:

```
code_search "$ARGUMENTS implementation OR pattern"
code_search "[related systems from Phase 1] updated:past_month"
```

Look for:
- How other teams solved similar problems
- Existing code you can learn from
- Patterns that are already in use
- Quality and maintenance level of examples

### Phase 3: Identify Stakeholders & Owners

**Actions**:
Find who's actively working on related systems:

```
code_search "[relevant systems] owner:* updated:past_month"
employee_search "[systems and names identified]"
```

Look for:
- Active code owners and maintainers
- People with recent commits in related areas
- Team leads and architects
- Documentation authors

### Phase 4: Find Related Systems

**Actions**:
Identify upstream and downstream dependencies:

```
code_search "[main system] calls OR depends OR imports"
code_search "[main system] updated:past_month"
```

Look for:
- Systems that will be affected
- Dependencies and integration points
- Existing integrations to learn from
- Systems to coordinate with

### Phase 5: Vet All Research (CRITICAL)

**Goal**: Filter to genuinely useful context - BE SKEPTICAL

For each piece of research, evaluate:

**Relevance Test**
- Does this actually apply to your task?
- ✅ RELEVANT: Directly applicable
- ⚠️ RELATED: Similar context but different use case
- ❌ TANGENTIAL: Keyword match only - reject

**Currency Test**
- Is this information still accurate?
- ✅ CURRENT: Updated in past 6 months
- ⚠️ AGING: 6-12 months old - note with caution
- ❌ STALE: 12+ months old - likely outdated, reject

**Authority Test**
- Is this authoritative information?
- ✅ OFFICIAL: Approved RFC, official design doc
- ⚠️ INFORMAL: Team wiki, notes, proposals
- ❌ OUTDATED: Rejected ideas, abandoned work

**Quality Test**
- Is this good guidance to follow?
- ✅ GOOD: Well-reasoned, documented, proven
- ⚠️ ACCEPTABLE: Works but has tradeoffs
- ❌ POOR: Hacky, experimental, unproven

### Phase 6: Generate Planning Context Report

**Actions**:
Present vetted research findings organized by category:

```markdown
# Planning Context: [Task]

## Design & Architecture
**What you need to know about related architectural decisions:**

### Current Standards & Patterns
| Pattern | Description | Source | Updated |
|---------|-------------|--------|---------|
| [pattern] | [what it is and why] | [doc link] | [date] ✅ |

### Relevant Design Documents
| Document | Type | Key Takeaway | Updated |
|----------|------|--------------|---------|
| [Title] | RFC | [1-2 sentence summary] | [date] ✅ |

### Previous Decisions & Context
- **[Topic]**: [Why was decision X made? Lessons learned?] (source: [link])
- **[Topic]**: [What was tried before? Results?]

## Implementations & Patterns
**Proven approaches and code examples to learn from:**

### Recommended Examples
| Location | What It Does | Why It's Good | Status |
|----------|--------------|---------------|--------|
| [repo/path] | [brief description] | [Why recommend this] | Active ✅ |

### Pattern Summary
- **[Pattern name]**: Used in [systems], benefits: [why]
- **[Pattern name]**: Alternative approach in [systems]

## Stakeholders & Ownership
**Key people and teams involved in this area:**

### Active Owners (Your Best Contacts)
| Name | Role | Involvement | Contact |
|------|------|-------------|---------|
| [Name] | [Title] | Most active in [system], [X] commits past month | [email] |

### Teams & Channels
- **Primary Team**: [team name]
- **Slack Channel**: [#channel] for questions/collaboration
- **Code Owners**: [CODEOWNERS or maintainers file reference]

## Related Systems
**What else this affects or depends on:**

- **Upstream Systems** (call your code): [systems that depend on this]
- **Downstream Systems** (you call): [systems this depends on]
- **Integration Points**: [key APIs or contracts to understand]

## Key Insights
**Synthesized findings and critical context:**

- [Important observation or constraint]
- [Risk or opportunity to consider]
- [Proven pattern or anti-pattern]
- [Stakeholders who must be involved]

## Sources & Links
**All citations for verification:**

| Document/Link | Type | Relevance | Currency |
|---------------|------|-----------|----------|
| [Title](URL) | RFC | [how it applies] | Updated [date] ✅ |

---

## Ready to Plan?

You now have enterprise context for your planning work. You can:
1. Enter plan mode with this research visible
2. Explore any findings deeper by clicking sources
3. Identify stakeholders to involve in the planning
4. Reference proven patterns and decisions

The plan will be better informed by organizational knowledge.
```

---

## If Limited Context Found

Don't pad with weak results:

```markdown
# Planning Context: [Task]

## Limited Research Available

I found limited enterprise context on this specific task.

**What I searched:**
- Design docs and RFCs related to [task]
- Similar implementations in codebase
- Related systems and owners

**What I found:**
- [X] design docs (most recent: [date])
- [Y] code implementations (status: [active/aging/stale])
- [Z] related systems

**Gaps:**
- No recent design documents
- Limited prior art to reference
- [Other gaps]

**What this means:**
This may be a new problem area, or documentation may not be centralized.

**Suggested next steps:**
1. Check with [suggested team/expert] about prior attempts
2. Look for [alternative search terms or systems]
3. Once you design your approach, you can then refine it with the team
4. Enter plan mode to design your initial approach, then validate with stakeholders
```

---

## Troubleshooting

### No Results Found
If searches return no results:
- Try broader or alternative terms
- Look for related system names or acronyms
- Check if this area might not be documented in Glean

### Conflicting Information
If you find contradictory guidance:
- Note the discrepancy clearly
- Check dates - prefer more recent sources
- This often means you should talk to stakeholders directly
- Include this in your planning context

### Too Many Results
If results are overwhelming:
- Filter by recency (prefer sources updated in past 6 months)
- Focus on authoritative sources (RFCs, official docs)
- Identify 3-4 most relevant findings
- Quality over quantity
