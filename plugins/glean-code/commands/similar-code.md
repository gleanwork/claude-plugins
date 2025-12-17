---
description: Find similar implementations across repos
argument-hint: Pattern, feature, or problem (e.g., "rate limiting", "retry logic")
---

# Similar Code

Search for similar implementations across the organization to find prior art, alternative approaches, or shared solutions.

**Looking for similar implementations of:** $ARGUMENTS

## Why This Matters

Before building something, check if it already exists:
- Find shared libraries you can use
- Learn from others' approaches
- Avoid duplicating effort
- Identify patterns to follow (or avoid)

## Process

### Phase 1: Search for Direct Implementations

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

### Phase 5: Present Comparison

```markdown
# Similar Implementations: [Pattern]

## Summary
Found [X] implementations across [Y] repositories.

## Shared/Recommended Solution
If there's an official or widely-used solution:
- **Library**: [name] ([link])
- **Maintained by**: [team/person]
- **Recommendation**: Use this instead of building your own

## Implementation Comparison

### Implementation 1: [Repo Name]
**Location:** [path] ([link])
**Approach:** [brief description]
**Pros:**
- [advantage]
- [advantage]
**Cons:**
- [limitation]

### Implementation 2: [Repo Name]
**Location:** [path] ([link])
**Approach:** [brief description]
**Pros:**
- [advantage]
**Cons:**
- [limitation]

### Implementation 3: [Repo Name]
[continue pattern...]

## Pattern Analysis

| Repository | Approach | Active? | Test Coverage |
|------------|----------|---------|---------------|
| [repo] | [approach] | Yes/No | Good/Minimal |

## Common Patterns Observed
1. **[Pattern A]**: Used by [X] repos - [description]
2. **[Pattern B]**: Used by [Y] repos - [description]

## Anti-Patterns to Avoid
Based on issues or deprecated code:
- **[Anti-pattern]**: [why it's problematic]

## Recommendations
Based on this analysis:
1. **If you need [use case A]**: Use [implementation X] because [reason]
2. **If you need [use case B]**: Use [implementation Y] because [reason]
3. **Consider contributing**: If no good solution exists, consider building a shared library

## Related Documentation
- **[RFC/Design doc]** ([link]) - [summary]
```

## Tips

- Look for both successes and failures
- Note which implementations are actively maintained
- Identify if there's a "blessed" approach from platform teams
- Flag deprecated or legacy implementations to avoid
- Suggest consolidation opportunities if there's too much duplication
