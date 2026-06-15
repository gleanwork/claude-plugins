---
name: find-examples
description: Find usage examples of an API, library, or code pattern across internal repositories — use when looking for how other teams use an internal API, library, or pattern before implementing something new.
---

# Find Examples

Search across all repositories to find usage examples of an API, library, or pattern.

Determine the API, library, or pattern from the user's request. If not specified, ask before proceeding.

## Core Principles

- **Prioritize recency**: Recent examples are more likely to follow current best practices
- **Show context**: Code snippets without context aren't helpful
- **Be skeptical**: Not every match is a good example
- **Quality over quantity**: 3 excellent examples beats 10 mediocre ones

## Process

### Phase 1: Search for Usage

Search for the API/pattern across the organization:

```
code_search "[topic] import OR require"
code_search "[topic] usage example"
code_search "[topic] implementation"
```

### Phase 2: Find Different Approaches

Look for variations in how it's used:

```
code_search "[topic] config OR configuration"
code_search "[topic] test OR spec"
```

### Phase 3: Find Documentation

Search for any guides or documentation:

```
search "[topic] how to use OR getting started"
search "[topic] best practices OR guidelines"
```

### Phase 4: Vet Each Example

For each code example found, evaluate:

| Test | ✅ Include | ⚠️ Caution | ❌ Reject |
|------|-----------|-----------|---------|
| **Quality** | Clean, well-structured, tested, recent | Works but has issues — note them | Hacky, deprecated, anti-pattern, prototype |
| **Recency** | <6 months | 6-12 months — may be outdated | 12+ months with no activity |
| **Context** | Production code, tests, well-maintained | Experiments — verify before using | Abandoned PRs, copy-pasted boilerplate |
| **Relevance** | Similar context to what user needs | Different context but instructive | Same API, unrelated purpose |

**Anti-Pattern Signals — reject or warn:**
- Large try/catch blocks swallowing errors
- Commented-out code
- TODO comments indicating known issues
- Files in `/deprecated/`, `/old/`, `/legacy/` paths
- Skipped tests, no tests at all
- No recent commits in repo

### Phase 5: Present Vetted Examples

```markdown
# Usage Examples: [API/Pattern]

## Summary
| Examples Found | High Quality | Cautionary | Rejected |
|----------------|--------------|------------|----------|
| [X] | [Y] | [Z] | [W] |

## Official Documentation
- **[Doc title]** ([link]) - [what it covers]

## Recommended Examples

### Example 1: [Repo/Team Name] ⭐ Recommended
**Quality**: High — [why this is a good example]
**File:** [path] ([link])
**Last Updated**: [date]

**Context:** [brief description of how they use it]

```[language]
[relevant code snippet]
```

**Why this is good:**
- [specific positive patterns]

## Examples With Caveats

### [Repo/Team Name] — Use With Caution
**File:** [path] ([link])
**Caveat:** [What to watch out for]

**What to copy**: [The good parts]
**What to avoid**: [The problematic parts]

## Common Patterns Observed
1. **[Pattern]**: Used in [X] high-quality examples — [description]

## Shared Libraries
- **[library name]** ([link]) — Use this instead of rolling your own

## Who to Ask
| Name | Why |
|------|-----|
| [Name] | Wrote the recommended example |
```

## If No Good Examples Found

```markdown
# Usage Examples: [API/Pattern]

## No High-Quality Examples Found

The assistant searched for examples of [API/Pattern] but didn't find examples worth recommending.

**What was found:** [X] matches, but all were [outdated/low quality/different context]

**Suggested next steps:**
1. Check the official documentation directly
2. Ask in [relevant Slack channel]
3. Consider: Is there a reason this isn't widely used?
```
