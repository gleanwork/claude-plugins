---
name: similar-code
description: Find similar implementations and prior art for a code pattern across internal repositories — use when checking whether something already exists internally before building it, or looking for reference implementations to follow.
---

# Similar Code

Search for similar implementations across the organization to find prior art, alternative approaches, or shared solutions.

Determine the pattern or feature from the user's request. If not specified, ask before proceeding.

## Core Principles

- **Find the blessed path**: Look for official/platform solutions first
- **Compare approaches**: Different solutions have different tradeoffs
- **Be skeptical**: Not every implementation is worth following
- **Quality over quantity**: 3 vetted implementations beats 10 random matches

## Process

### Phase 1: Search for Direct Implementations

Look for the pattern/feature across all repos:

```
code_search "[topic] implementation"
code_search "[topic] handler OR service"
code_search "[topic] util OR helper"
```

### Phase 2: Search for Alternative Terms

The same concept might be named differently:

```
code_search "[synonym] implementation"
code_search "[synonym] service"
```

For example, "rate limiting" might also be called "throttling", "quota", "backpressure".

### Phase 3: Find Shared Libraries

Look for centralized implementations:

```
code_search "[topic] package OR library"
search "[topic] shared library OR common"
```

### Phase 4: Find Related Discussions

Search for design discussions about this pattern:

```
search "[topic] design doc OR RFC"
search "[topic] best practices OR guidelines"
```

### Phase 5: Vet Each Implementation

For each implementation found, evaluate:

| Test | ✅ Recommended | ⚠️ Acceptable | ❌ Reject |
|------|--------------|-------------|---------|
| **Quality** | Clean, tested, well-maintained, follows best practices | Works but has caveats | Hacky, untested, deprecated |
| **Maintenance** | Commits in past 3 months | Last commit 3-12 months ago | No activity in 12+ months |
| **Adoption** | Deployed, actively used | Small usage, may have issues | Experiments, abandoned PRs |
| **Ownership** | Clear maintainer, responds to issues | Works but no clear owner | Orphaned, no maintenance |

**Anti-Pattern Signals — reject or warn:**
- In `/deprecated/`, `/old/`, `/legacy/` paths
- Large commented-out sections
- TODOs indicating known issues
- Skipped tests, no tests at all
- Copy-pasted boilerplate

### Phase 6: Present Vetted Comparison

```markdown
# Similar Implementations: [Pattern]

## Vetting Summary
| Found | Recommended | Acceptable | Rejected |
|-------|-------------|------------|----------|
| [X] | [Y] | [Z] | [W] |

## Recommended Solution
- **Library**: [name] ([link])
- **Maintained by**: [team/person]
- **Status**: Active, [X] commits in past month
- **Recommendation**: ⭐ Use this instead of building your own

## Vetted Implementations

### ⭐ [Repo Name] — RECOMMENDED
**Quality**: High
**Location:** [path] ([link])
**Last Updated**: [date]
**Maintainer**: [person/team]

**Approach:** [brief description]

**Why recommended:**
- [specific positive pattern]

### [Repo Name] — ACCEPTABLE
**Quality**: Good with caveats
**Location:** [path] ([link])
**Last Updated**: [date]

**Pros:** [advantage]
**Cons:** [limitation]

## Rejected Implementations
| Repo | Reason |
|------|--------|
| [repo] | No commits in 18 months, likely outdated |
| [repo] | Prototype code, never production-ready |

## Pattern Analysis
| Pattern | Used By | Quality | Recommendation |
|---------|---------|---------|----------------|
| [Pattern A] | [X] repos | Good | Follow this approach |
| [Pattern B] | [Y] repos | Mixed | Avoid unless [condition] |

## Recommendations

1. **Best option**: Use [recommended implementation] because [reason]
2. **If that doesn't fit**: Consider [alternative] for [use case]
3. **Avoid**: Don't follow [anti-pattern] approach
```

## If No Good Implementations Found

```markdown
# Similar Implementations: [Pattern]

## No Recommended Implementations Found

The assistant searched for implementations of [pattern] but didn't find any worth recommending.

**What was found:** [X] matches, but all were [outdated/low quality/abandoned]

**Suggested next steps:**
1. Check for external libraries: [suggestions]
2. Ask in [relevant Slack channel] about approaches
3. If building new, consider making it a shared library
```
