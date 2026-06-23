---
name: codebase-context
description: Gather architectural context about an internal system from code and documentation across the organization — use when asked to understand a system's architecture, find its repos, or get an overview before working on it.
---

# Codebase Context

Gather comprehensive architectural context about an internal system by searching code and documentation across the organization.

Determine the system name from the user's request. If not specified, ask before proceeding.

## Core Principles

- **Breadth before depth**: Find all relevant pieces before diving deep
- **Docs + code**: Both tell important parts of the story
- **Be skeptical**: Not every search result is relevant context
- **Freshness matters**: Stale docs can mislead

## Process

### Phase 1: Find the Code

Search for the system's codebase across all repositories:

```
code_search "[system] main OR core updated:past_month"
code_search "[system] service handler"
```

Look for:
- Main entry points and core modules
- API definitions (REST, gRPC, GraphQL)
- Key data structures and models

### Phase 2: Find the Documentation

Search for architecture and design docs:

```
search "[system] architecture OR design doc"
search "[system] RFC OR proposal"
search "[system] runbook OR playbook"
```

### Phase 3: Identify Key Contributors

Find who's actively working on this system:

```
code_search "[system] owner:* updated:past_month"
```

Cross-reference with `employee_search` for contact info.

### Phase 4: Vet All Content

For each piece of content, evaluate:

| Test | ✅ Include | ⚠️ Note | ❌ Reject |
|------|-----------|---------|---------|
| **Relevance** | Core component, directly relevant | Mentions system but not central | Keyword coincidence |
| **Currency** | <6 months, matches code | 6-12 months | 12+ months with no activity |
| **Authority** | Approved RFC, design doc, official runbook | Team wiki, notes, drafts | Outdated proposals, abandoned work |
| **Doc/Code consistency** | Docs reflect current state | Note discrepancy, prefer code | Doc significantly wrong — warn user |

**Repository Health:**
- ✅ ACTIVE: Commits in past month
- ⚠️ SLOWING: Last commit 1-6 months ago
- ❌ STALE: No commits in 6+ months

### Phase 5: Generate Vetted Context Report

```markdown
# Codebase Context: [System Name]

## Freshness Check
| Component | Last Updated | Status |
|-----------|--------------|--------|
| Main repo | [date] | Active / Slowing / Stale |
| Design doc | [date] | Current / Aging / Outdated |

## Overview
[1-2 paragraph summary synthesized from current docs — note age of sources]

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

## Warnings
- [ ] [Any concerns about the system's state]
```

## If Limited Context Found

```markdown
# Codebase Context: [System Name]

## Limited Context Available

Found limited authoritative information about this system.

**What was found:** [code/docs summary]
**Gaps:** No recent design documentation, no clear architectural overview

**Suggested next steps:**
1. Check with [suggested team/person]
2. Explore the code directly: [suggested entry points]
```

## Troubleshooting

### No Results Found
- Try alternative system names or acronyms
- Search for related technologies
- Check if the system might be in a private repo

### Conflicting Information
- Note the discrepancy clearly
- Prefer code as source of truth for current state
- Reference doc dates to identify which might be outdated
