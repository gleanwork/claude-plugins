---
description: Verify an RFC or design doc against the actual implementation
argument-hint: RFC URL or topic to search for
---

# RFC Verification

You are verifying a design document (RFC, spec, design doc) against the actual implementation. Identify completeness, gaps, and discrepancies.

## Core Principles

- **Thorough but efficient**: Don't over-analyze trivial items
- **Quote evidence**: Show specific code when claiming implementation exists
- **Use TodoWrite**: Track progress throughout

---

## Phase 1: Fetch the Design Document

**Goal**: Get the full RFC content

Input: $ARGUMENTS

**Actions**:
1. Create todo list with all phases

2. Get the document:
   - If given a URL: `read_document "[URL]"`
   - If given a topic: `search "[topic] RFC OR design doc"` then `read_document` on the best match

3. Extract verifiable requirements:
   - Functional requirements
   - Technical specifications
   - Integration points
   - Non-functional requirements (performance, security)

4. Create a checklist of requirements to verify

---

## Phase 2: Search the Codebase

**Goal**: Find implementations for each requirement

**Actions**:
1. For each major requirement area, search the local codebase:
   - Use `Glob` to find relevant files by name patterns
   - Use `Grep` to find specific implementations
   - Use `Read` to examine implementation details

2. Also search Glean for related internal code:
   ```
   code_search "[requirement] implementation"
   ```

3. Document what you find for each requirement

---

## Phase 3: Verify Each Requirement

**Goal**: Assess implementation status of each item

**Actions**:
1. For each requirement in the checklist, classify:
   - **Implemented**: Found matching implementation with evidence
   - **Partially Implemented**: Some aspects present, others missing
   - **Not Found**: No evidence of implementation
   - **Differs from Spec**: Implementation exists but doesn't match spec

2. For each classification, note the evidence (file:line references)

---

## Phase 4: Generate Verification Report

**Goal**: Present structured verification results

**Actions**:
1. Mark all todos complete
2. Present the verification report:

```markdown
# RFC Verification Report

## Document
- **Title**: [RFC title]
- **URL**: [link]
- **Last Updated**: [date if available]

## Summary
| Status | Count |
|--------|-------|
| Implemented | X |
| Partially Implemented | Y |
| Not Found | Z |
| Differs from Spec | W |

**Overall**: [X of Y requirements implemented]

## Detailed Findings

### Implemented
| Requirement | Evidence |
|-------------|----------|
| [Requirement] | [file:line] |

### Partially Implemented
| Requirement | Present | Missing |
|-------------|---------|---------|
| [Requirement] | [what exists] | [what's missing] |

### Not Found
| Requirement | Notes |
|-------------|-------|
| [Requirement] | [where we looked] |

### Differs from Spec
| Requirement | Spec Says | Implementation Does |
|-------------|-----------|---------------------|
| [Requirement] | [X] | [Y] |

## Recommendations
1. [Priority action to close gap]
2. [Second priority]

## Notes
- [Any observations about spec being outdated]
- [Any ambiguities in the original spec]
```

---
