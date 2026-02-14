---
description: Find similar implementations across repos
argument-hint: Pattern, feature, or problem (e.g., "rate limiting", "retry logic")
---

# Similar Code

Search for similar implementations across the organization to find prior art, alternative approaches, or shared solutions.

## Input

**Pattern:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

**Looking for similar implementations of:** $ARGUMENTS

## Why This Matters

Before building something, check if it already exists:
- Find shared libraries you can use
- Learn from others' approaches
- Avoid duplicating effort
- Identify patterns to follow (or avoid)

---

## Core Principles

- **Find the blessed path**: Look for official/platform solutions first
- **Compare approaches**: Different solutions have different tradeoffs
- **Be skeptical**: Not every implementation is worth following
- **Quality over quantity**: 3 vetted implementations beats 10 random matches

---

## Process

### Phase 1: Search for Direct Implementations

**Actions**:
Look for the pattern/feature across all repos:

```
code_search "$ARGUMENTS implementation"
code_search "$ARGUMENTS handler OR service"
code_search "$ARGUMENTS util OR helper"
```

### Phase 2: Search for Alternative Terms

The same concept might be named differently:

```
code_search "[synonym 1] implementation"
code_search "[synonym 2] service"
```

For example, "rate limiting" might also be called "throttling", "quota", "backpressure".

### Phase 3: Find Shared Libraries

Look for centralized implementations:

```
code_search "$ARGUMENTS package OR library"
search "$ARGUMENTS shared library OR common"
```

### Phase 4: Find Related Discussions

Search for design discussions about this pattern:

```
search "$ARGUMENTS design doc OR RFC"
search "$ARGUMENTS best practices OR guidelines"
```

### Phase 5: Vet Each Implementation (CRITICAL)

**Goal**: Filter to implementations worth following - BE SKEPTICAL

For each implementation found, evaluate:

**Quality Test**
- Is this actually good code to follow?
- ✅ RECOMMENDED: Clean, tested, well-maintained, follows best practices
- ⚠️ ACCEPTABLE: Works but has caveats
- ❌ REJECT: Hacky, untested, deprecated, anti-pattern

**Maintenance Test**
- Is this actively maintained?
- ✅ ACTIVE: Commits in past 3 months, active PR reviews
- ⚠️ SLOWING: Last commit 3-12 months ago
- ❌ STALE: No activity in 12+ months - likely outdated

**Adoption Test**
- Is this actually used or an abandoned experiment?
- ✅ PRODUCTION: Deployed, actively used
- ⚠️ LIMITED: Small usage, may have issues
- ❌ REJECT: Experiments, prototypes, abandoned PRs

**Ownership Test**
- Is there someone maintaining this?
- ✅ OWNED: Clear maintainer, responds to issues
- ⚠️ UNCLEAR: Works but no clear owner
- ❌ ORPHANED: No owner, no maintenance

**Anti-Pattern Signals - REJECT or WARN**:
- In `/deprecated/`, `/old/`, `/legacy/` paths
- Large commented-out sections
- TODOs indicating known issues
- Skipped tests
- Copy-pasted boilerplate
- No tests at all

### Phase 6: Present Vetted Comparison

**Actions**:
Present comparison of vetted implementations:

```markdown
# Similar Implementations: [Pattern]

## Vetting Summary
| Implementations Found | Recommended | Acceptable | Rejected |
|-----------------------|-------------|------------|----------|
| [X] | [Y] | [Z] | [W] |

## Recommended Solution
If there's an official or widely-used solution:
- **Library**: [name] ([link])
- **Maintained by**: [team/person]
- **Status**: Active, [X] commits in past month
- **Recommendation**: ⭐ Use this instead of building your own

## Vetted Implementations

### ⭐ Implementation 1: [Repo Name] - RECOMMENDED
**Quality**: High
**Location:** [path] ([link])
**Last Updated**: [date]
**Maintainer**: [person/team]

**Approach:** [brief description]

**Why recommended:**
- [specific positive pattern]
- [why this is well-done]

**Caveats:** [any limitations]

### Implementation 2: [Repo Name] - ACCEPTABLE
**Quality**: Good with caveats
**Location:** [path] ([link])
**Last Updated**: [date]

**Approach:** [brief description]

**Pros:**
- [advantage]

**Cons:**
- [limitation - be specific]

### Implementation 3: [Repo Name] - USE WITH CAUTION
**Quality**: Acceptable but dated
**Location:** [path] ([link])
**Last Updated**: [date] ⚠️

**Caveat:** [Why to be careful]

## Rejected Implementations
| Repo | Reason |
|------|--------|
| [repo] | No commits in 18 months, likely outdated |
| [repo] | Prototype code, never production-ready |
| [repo] | Known issues in TODO comments |

## Pattern Analysis
| Pattern | Used By | Quality | Recommendation |
|---------|---------|---------|----------------|
| [Pattern A] | [X] repos | Good | Follow this approach |
| [Pattern B] | [Y] repos | Mixed | Avoid unless [condition] |

## Anti-Patterns to Avoid
[If you found examples of what NOT to do]
- **[Anti-pattern]**: Found in [repo], problematic because [reason]

## Recommendations

1. **Best option**: Use [recommended implementation] because [reason]
2. **If that doesn't fit**: Consider [alternative] for [use case]
3. **Avoid**: Don't follow [anti-pattern] approach

## Related Documentation
- **[RFC/Design doc]** ([link]) - [summary]
```

---

## If No Good Implementations Found

Be honest - this is valuable information:

```markdown
# Similar Implementations: [Pattern]

## No Recommended Implementations Found

I searched for implementations of [pattern] but didn't find any I'd recommend following.

**What I found:**
- [X] matches, but all were [outdated/low quality/abandoned]

**This could mean:**
- This problem may not have a standard solution internally
- Teams may be using external libraries instead
- Naming conventions may differ

**Suggested next steps:**
1. Check for external libraries: [suggestions]
2. Ask in [relevant Slack channel] about approaches
3. If building new, consider making it a shared library
```

---

## Troubleshooting

### No Implementations Found
If searches return no results:
- Try synonyms (e.g., "rate limiting" → "throttling")
- Search for the problem, not just the solution name
- Check for external library usage

### Too Many Implementations
If many solutions exist:
- Apply vetting criteria strictly
- Focus on most recently maintained
- Note duplication as potential consolidation opportunity
