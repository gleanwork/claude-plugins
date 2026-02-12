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

### Phase 4: Generate Context Report

**Actions**:
Present findings in this format:

```markdown
# Codebase Context: [System Name]

## Overview
[1-2 paragraph summary synthesized from design docs]

## Key Repositories
| Repository | Purpose | Status |
|------------|---------|--------|
| [repo] | [what it does] | Active / Stale |

## Architecture Highlights
- **API Layer**: [description]
- **Data Model**: [description]
- **Key Dependencies**: [list]

## Documentation
- **Design Doc**: [link] - [summary]
- **RFC**: [link] - [summary]
- **Runbook**: [link] - [summary]

## Key Contributors (Past 3 Months)
| Name | Role | Contact |
|------|------|---------|
| [Name] | [Title] | [email] |

## Related Systems
- **Upstream**: [systems that call this one]
- **Downstream**: [systems this one calls]

## Getting Started
- [Key files to read first]
- [Local setup notes if found]
```

## Tips

- If the system has multiple components, break them down separately
- Note any discrepancies between docs and implementation
- Highlight if the codebase appears unmaintained (no recent commits)
- Suggest the user read specific files for deeper understanding

---

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing `mcp__glean` tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### No Results Found
If searches return no results:
- Try alternative system names or acronyms
- Search for related technologies or frameworks
- Check if the system might be in a private repo with restricted access

### Conflicting Information
If docs and code don't match:
- Note the discrepancy clearly in the report
- Prefer code as source of truth for current state
- Reference doc dates to identify which might be outdated
