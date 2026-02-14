---
description: Get architectural context from internal code repositories
argument-hint: System or component name (e.g., "payments", "auth service")
---

# Codebase Context

Gather comprehensive architectural context about an internal system by searching code and documentation across the organization.

## Input

**System:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

**Target system:** $ARGUMENTS

---

## Core Principles

- **Breadth before depth**: Find all relevant pieces before diving deep
- **Docs + code**: Both tell important parts of the story
- **Be skeptical**: Not every search result is relevant context
- **Freshness matters**: Stale docs can mislead

---

## Process

### Phase 1: Find the Code

**Actions**:
Search for the system's codebase across all repositories:

```
code_search "$ARGUMENTS main OR core updated:past_month"
code_search "$ARGUMENTS service handler"
```

Look for:
- Main entry points and core modules
- API definitions (REST, gRPC, GraphQL)
- Key data structures and models

### Phase 2: Find the Documentation

Search for architecture and design docs:

```
search "$ARGUMENTS architecture OR design doc"
search "$ARGUMENTS RFC OR proposal"
search "$ARGUMENTS runbook OR playbook"
```

### Phase 3: Identify Key Contributors

Find who's actively working on this system:

```
code_search "$ARGUMENTS owner:* updated:past_month"
```

Cross-reference with `employee_search` for contact info.

### Phase 4: Vet All Content (CRITICAL)

**Goal**: Filter to genuinely useful context - BE SKEPTICAL

For each piece of content, evaluate:

**Relevance Test**
- Is this actually about the target system?
- ✅ INCLUDE: Core component, directly relevant
- ⚠️ RELATED: Mentions the system but not central
- ❌ REJECT: Keyword coincidence, different system

**Currency Test**
- Is this information still accurate?
- ✅ CURRENT: Updated in past 6 months, matches code
- ⚠️ AGING: 6-12 months old - note with caution
- ❌ STALE: 12+ months old with no activity - likely outdated

**Authority Test**
- Is this authoritative information?
- ✅ OFFICIAL: Approved RFC, design doc, official runbook
- ⚠️ INFORMAL: Team wiki, notes, drafts
- ❌ REJECT: Outdated proposals, rejected RFCs, abandoned work

**Doc vs Code Consistency**
- Do docs match current implementation?
- ✅ CONSISTENT: Docs reflect current state
- ⚠️ DIVERGED: Note discrepancy, prefer code as source of truth
- ❌ MISLEADING: Doc significantly wrong - warn user

**Repository Health Test**
For each repository:
- ✅ ACTIVE: Commits in past month
- ⚠️ SLOWING: Last commit 1-6 months ago
- ❌ STALE: No commits in 6+ months - note this clearly

### Phase 5: Generate Vetted Context Report

**Actions**:
Present vetted findings:

```markdown
# Codebase Context: [System Name]

## Freshness Check
| Component | Last Updated | Status |
|-----------|--------------|--------|
| Main repo | [date] | Active / Slowing / Stale |
| Design doc | [date] | Current / Aging / Outdated |

## Overview
[1-2 paragraph summary synthesized from CURRENT docs - note age of sources]

## Key Repositories
| Repository | Purpose | Last Active | Status |
|------------|---------|-------------|--------|
| [repo] | [what it does] | [date] | Active / Stale |

## Architecture Highlights
[Only include if from recent/authoritative sources]
- **API Layer**: [description] (source: [doc], updated [date])
- **Data Model**: [description]
- **Key Dependencies**: [list]

## Documentation (Vetted)
[Only include docs that are still relevant]

### Current & Authoritative
| Doc | Type | Updated | Summary |
|-----|------|---------|---------|
| [Title] | RFC | [date] | [summary] |

### Use With Caution (Aging)
| Doc | Type | Updated | Caveat |
|-----|------|---------|--------|
| [Title] | Design doc | [date] | May not reflect current implementation |

## Key Contributors
| Name | Role | Last Active | Contact |
|------|------|-------------|---------|
| [Name] | [Title] | [date] | [email] |

## Related Systems
- **Upstream**: [systems that call this one]
- **Downstream**: [systems this one calls]

## Getting Started
[Key files to read first - prioritize by relevance and currency]

## Warnings
[Any concerns about the system's state]
- [ ] Documentation appears outdated - verify with team
- [ ] Repository hasn't been updated in [X] months
- [ ] Multiple docs conflict - check with [owner]
```

---

## If Limited Context Found

Don't pad with irrelevant results:

```markdown
# Codebase Context: [System Name]

## Limited Context Available

I found limited authoritative information about this system.

**What I found:**
- Code: [summary]
- Docs: [summary - may be outdated]

**Gaps:**
- No recent design documentation
- No clear architectural overview

**Suggested next steps:**
1. Check with [suggested team/person]
2. Look for [related system] docs that may reference this
3. Explore the code directly: [suggested entry points]
```

---

## Troubleshooting

### No Results Found
If searches return no results:
- Try alternative system names or acronyms
- Search for related technologies
- Check if the system might be in a private repo

### Conflicting Information
If docs and code don't match:
- Note the discrepancy clearly
- Prefer code as source of truth for current state
- Reference doc dates to identify which might be outdated
