---
name: verify-rfc
description: Verify an RFC or design doc against the actual implementation — find drift, missing pieces, and undocumented changes. Trigger phrases include "verify the RFC", "compare design doc to implementation", "is the spec implemented", "does the code match the design", "what's drifted from the RFC", "audit the doc against", "spec compliance check", "is what we built what we designed".
---

# RFC Verification

You are verifying a design document (RFC, spec, design doc) against the actual implementation. Identify completeness, gaps, and discrepancies.

## Input

Determine the RFC, design doc URL, or topic from the user's request. If it is not clear, ask: "Which RFC or design doc would you like to verify? You can give me a URL, a document title, or a topic to search for."

---

## Core Principles

- **Thorough but efficient**: Don't over-analyze trivial items
- **Quote evidence**: Show specific code when claiming implementation exists
- **Be skeptical**: Just finding related code doesn't mean the requirement is met
- **Honesty over completeness**: Better to say "couldn't verify" than claim incorrectly

---

## Phase 1: Fetch the Design Document

**Goal**: Get the full RFC content

**Actions**:
1. Get the document:
   - If given a URL: `read_document "[URL]"`
   - If given a topic: `search "[topic] RFC OR design doc"` then `read_document` on the best match

2. Extract verifiable requirements:
   - Functional requirements
   - Technical specifications
   - Integration points
   - Non-functional requirements (performance, security)

3. Create a checklist of requirements to verify

---

## Phase 2: Search the Codebase

**Goal**: Find implementations for each requirement

**Actions**:
1. For each major requirement area, search the local codebase using your host's local file-search tools (grep/glob/read) to find relevant files by name patterns, locate specific implementations, and examine implementation details.

2. Also search Glean for related internal code:
   ```
   code_search "[requirement] implementation"
   ```

3. Document what you find for each requirement

---

## Phase 3: Vet Each Finding (CRITICAL)

**Goal**: Rigorously verify claims — BE SKEPTICAL

For each requirement × implementation pair, evaluate:

**Match Quality Test**
- Does the code actually implement this requirement?
- ✅ IMPLEMENTED: Clear, direct implementation with evidence
- ⚠️ PARTIAL: Some aspects present, others missing
- ❓ UNCLEAR: Code exists but doesn't clearly fulfill requirement
- ❌ NOT FOUND: No evidence of implementation

**Evidence Strength Test**
- How confident are you in this assessment?
- ✅ HIGH: Can point to specific code that clearly implements this
- ⚠️ MEDIUM: Code appears related but not definitively implementing
- ❌ LOW: Inferring based on file names or tangential code

**Specification Fidelity Test**
- Does implementation match what the spec says?
- ✅ MATCHES: Implementation follows spec
- ⚠️ DIFFERS: Implementation exists but deviates from spec
- ❌ CONTRADICTS: Implementation does opposite of spec

**Common False Positives — BE CAREFUL**:
- Code that USES an API doesn't mean the API is IMPLEMENTED
- Test code doesn't count as implementation
- Commented-out code doesn't count
- TODO comments don't count
- Dead code or deprecated code doesn't count

**For each "Implemented" claim**:
- Require file:line reference
- Verify the code actually does what the spec requires
- Note any deviations

---

## Phase 4: Generate Verification Report

**Goal**: Present honest, evidence-based verification results

**Actions**:
Present the verification report:

```markdown
# RFC Verification Report

## Document
- **Title**: [RFC title]
- **URL**: [link]
- **Last Updated**: [date if available]

## Verification Confidence
| Confidence Level | Requirements |
|------------------|--------------|
| High (clear evidence) | [X] |
| Medium (likely but not certain) | [Y] |
| Low (couldn't verify definitively) | [Z] |

## Summary
| Status | Count | % |
|--------|-------|---|
| Implemented | X | X% |
| Partially Implemented | Y | Y% |
| Not Found | Z | Z% |
| Differs from Spec | W | W% |

**Overall**: [X of Y requirements verified with high confidence]

## Detailed Findings

### Implemented (High Confidence)
| Requirement | Evidence | Confidence |
|-------------|----------|------------|
| [Requirement] | [file:line] - [what it does] | High |

### Partially Implemented
| Requirement | Present | Missing | Evidence |
|-------------|---------|---------|----------|
| [Requirement] | [what exists] | [what's missing] | [file:line] |

### Not Found / Could Not Verify
| Requirement | What I Searched | Confidence |
|-------------|-----------------|------------|
| [Requirement] | [where we looked] | Low - may exist but couldn't locate |

### Differs from Spec
| Requirement | Spec Says | Implementation Does | Evidence |
|-------------|-----------|---------------------|----------|
| [Requirement] | [X] | [Y] | [file:line] |

## Limitations & Caveats

**What I couldn't verify:**
- [Requirement] - Would need [access/expertise] to verify
- [Requirement] - Code exists but unclear if it fulfills requirement

**Potential false negatives:**
- Implementation may exist under different name
- May be in private/restricted repo

## Recommendations
1. [Priority action to close gap]
2. [Verification that needs human review]

## Notes
- [Observations about spec being outdated]
- [Ambiguities in the original spec]
```

---

## If Verification Is Inconclusive

Be honest about limitations:

```markdown
# RFC Verification Report

## Verification Incomplete

I was able to verify [X] of [Y] requirements with high confidence.

**Well-verified areas:**
- [List of requirements with clear evidence]

**Could not verify:**
- [List with reasons]

**Why verification was limited:**
- [Reasons: access, complexity, ambiguity in spec]

**Recommended next steps:**
1. Have [team/person] review this report
2. Manually verify [specific requirements]
3. Update spec if requirements have changed
```

---

## Troubleshooting

### RFC Not Found
If the document can't be found:
- Ask for the exact URL or document title
- Search for alternative names
- Check if the user has access to the document

### Implementation Not Found
If code can't be found:
- The feature may not be implemented yet — note this clearly
- Check if the RFC was superseded or abandoned
- Search for related terms

### Ambiguous Requirements
If the RFC has unclear requirements:
- Note which requirements are ambiguous
- Document assumptions made during verification
- Suggest the RFC author clarify the spec
