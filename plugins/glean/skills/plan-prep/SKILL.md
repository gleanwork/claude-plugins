---
name: plan-prep
description: Research enterprise context before plan mode — surface design docs, similar implementations, stakeholders, and related systems before architecting or designing a feature.
---

# Planning Preparation via Glean

Research enterprise context before entering plan mode by gathering design docs, similar implementations, stakeholders, and related systems.

## When This Applies

Use plan prep when users:
- Want to research before entering plan mode
- Are planning architectural or strategic changes
- Need to understand related systems before designing
- Want to identify stakeholders and code owners early
- Ask: "plan with glean", "prep for plan", "research before planning"

## Why This Matters

Better planning comes from enterprise context:
- **Design Decisions**: Understand what was tried before, why it worked or didn't
- **Similar Implementations**: Find proven patterns and learn from past approaches
- **Stakeholders**: Identify who needs to be involved or has relevant knowledge
- **Related Systems**: Understand dependencies and integration points

**Local tools only see your current repo.** This workflow searches your entire organization for existing decisions, patterns, and knowledge.

## BE SKEPTICAL

Filter aggressively for relevant, current information.

| Test | ✅ Include | ⚠️ Note | ❌ Exclude |
|------|-----------|---------|-----------|
| **Freshness** | <6 months | 6-12 months | 12+ months |
| **Relevance** | Directly applies | Similar context | Keyword match only |
| **Authority** | Approved RFCs, official docs | Team wiki, proposals | Rejected/abandoned work |
| **Quality** | Well-reasoned, proven | Has tradeoffs | Experimental, hacky |

**Quality over quantity**: 3-4 high-quality findings beat 10 weak ones.

## Tool Selection

| Research Need | Glean Tool |
|---------------|-----------|
| Find design docs, RFCs, architecture | `search` |
| Find similar code implementations | `code_search` |
| Find code owners and stakeholders | `code_search` + `employee_search` |
| Find related/dependent systems | `code_search` |
| Read full document content | `read_document` |

## Workflow

### Phase 1: Search for Design & Architecture

Find design documents, RFCs, and architectural decisions related to the task:

```
search "[task] architecture OR design doc"
search "[task] RFC OR proposal"
search "[task] pattern OR best practice"
```

Look for:
- Existing design decisions that apply
- Architectural patterns already in use
- Why past decisions were made
- Rejected approaches and lessons learned

### Phase 2: Find Code Implementations & Patterns

Search for similar implementations across the codebase:

```
code_search "[task] implementation OR pattern"
code_search "[related systems] updated:past_month"
```

Look for:
- How other teams solved similar problems
- Existing code to learn from
- Patterns already in use
- Quality and maintenance level of examples

### Phase 3: Identify Stakeholders & Owners

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

Identify upstream and downstream dependencies:

```
code_search "[main system] calls OR depends OR imports"
code_search "[main system] updated:past_month"
```

### Phase 5: Vet All Research

For each piece of research, apply the vetting criteria above. Reject stale, tangential, or low-quality content.

### Phase 6: Generate Planning Context Report

Present vetted research findings organized by category:

```markdown
# Planning Context: [Task]

## Design & Architecture
### Current Standards & Patterns
| Pattern | Description | Source | Updated |
|---------|-------------|--------|---------|
| [pattern] | [what it is and why] | [doc link] | [date] ✅ |

### Relevant Design Documents
| Document | Type | Key Takeaway | Updated |
|----------|------|--------------|---------|
| [Title] | RFC | [1-2 sentence summary] | [date] ✅ |

## Implementations & Patterns
### Recommended Examples
| Location | What It Does | Why It's Good | Status |
|----------|--------------|---------------|--------|
| [repo/path] | [brief description] | [Why recommend] | Active ✅ |

## Stakeholders & Ownership
### Active Owners
| Name | Role | Involvement | Contact |
|------|------|-------------|---------|
| [Name] | [Title] | [X] commits past month in [system] | [email] |

### Teams & Channels
- **Primary Team**: [team name]
- **Slack Channel**: [#channel] for questions

## Related Systems
- **Upstream** (depend on this): [systems]
- **Downstream** (this depends on): [systems]

## Key Insights
- [Important constraint or opportunity]
- [Proven pattern or anti-pattern]
- [Stakeholders who must be involved]

## Sources
| Document | Type | Relevance | Currency |
|----------|------|-----------|----------|
| [Title](URL) | RFC | [how it applies] | [date] ✅ |
```

## If Limited Context Found

Don't pad with weak results:

```markdown
# Planning Context: [Task]

## Limited Research Available

Found limited enterprise context for this task.

**What was searched:** Design docs, similar implementations, related systems
**Gaps:** No recent design docs, limited prior art

**Suggested next steps:**
1. Check with [suggested team] about prior attempts
2. Enter plan mode and design initial approach, then validate with stakeholders
```
