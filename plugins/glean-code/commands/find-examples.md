---
description: Find usage examples of APIs/patterns across the org
argument-hint: API, library, or pattern name (e.g., "AuthClient", "retry logic")
---

# Find Examples

Search across all repositories to find usage examples of an API, library, or pattern.

## Input

**API/Pattern:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

**Looking for examples of:** $ARGUMENTS

## Why This Matters

Before implementing something, it's valuable to see how other teams have done it. This helps you:
- Follow established conventions
- Avoid reinventing the wheel
- Learn from others' patterns
- Identify shared libraries you might use

---

## Core Principles

- **Prioritize recency**: Recent examples are more likely to follow current best practices
- **Show context**: Code snippets without context aren't helpful
- **Be skeptical**: Not every match is a good example
- **Quality over quantity**: 3 excellent examples beats 10 mediocre ones

---

## Process

### Phase 1: Search for Usage

**Actions**:
Search for the API/pattern across the organization:

```
code_search "$ARGUMENTS import OR require"
code_search "$ARGUMENTS usage example"
code_search "$ARGUMENTS implementation"
```

### Phase 2: Find Different Approaches

Look for variations in how it's used:

```
code_search "$ARGUMENTS config OR configuration"
code_search "$ARGUMENTS test OR spec"
```

### Phase 3: Find Documentation

Search for any guides or documentation:

```
search "$ARGUMENTS how to use OR getting started"
search "$ARGUMENTS best practices OR guidelines"
```

### Phase 4: Vet Each Example (CRITICAL)

**Goal**: Filter to high-quality examples - BE SKEPTICAL

For each code example found, evaluate:

**Quality Test**
- Is this actually a good example to follow?
- ✅ INCLUDE: Clean code, well-structured, tested, recent
- ⚠️ CAUTION: Works but has issues (note them)
- ❌ REJECT: Hacky, deprecated, anti-pattern, prototype/throwaway code

**Recency Test**
- Is this current?
- ✅ INCLUDE: Updated in past 6 months
- ⚠️ CAUTION: 6-12 months old - may be outdated
- ❌ REJECT: 12+ months old with no activity (likely outdated patterns)

**Context Test**
- Is this a real usage or just noise?
- ✅ INCLUDE: Production code, tests, well-maintained projects
- ❌ REJECT: Experiments, abandoned PRs, copy-pasted boilerplate, generated code

**Relevance Test**
- Is this the same use case?
- ✅ INCLUDE: Similar context to what user needs
- ⚠️ NOTE: Different context but still instructive
- ❌ REJECT: Just happens to use the same API for unrelated purpose

**Anti-Pattern Signals - REJECT or WARN**:
- Large try/catch blocks swallowing errors
- Commented-out code
- TODO comments indicating known issues
- Files in `/deprecated/`, `/old/`, `/legacy/` paths
- Tests that are skipped
- Code with no recent commits in repo

### Phase 5: Present Vetted Examples

**Actions**:
Format vetted findings:

```markdown
# Usage Examples: [API/Pattern]

## Summary
| Examples Found | High Quality | Cautionary | Rejected |
|----------------|--------------|------------|----------|
| [X] | [Y] | [Z] | [W] |

## Official Documentation
[Only if actually found]
- **[Doc title]** ([link]) - [what it covers]

## Recommended Examples

### Example 1: [Repo/Team Name] ⭐ Recommended
**Quality**: High - [why this is a good example]
**File:** [path] ([link])
**Last Updated**: [date]

**Context:** [brief description of how they use it]

\`\`\`[language]
[relevant code snippet]
\`\`\`

**Why this is good:**
- [specific positive patterns]
- [what makes this exemplary]

### Example 2: [Repo/Team Name]
**Quality**: Good
**File:** [path] ([link])
**Last Updated**: [date]

**Context:** [description]

\`\`\`[language]
[relevant code snippet]
\`\`\`

## Examples With Caveats
[Only include if they're still useful despite issues]

### [Repo/Team Name] - Use With Caution
**File:** [path] ([link])
**Caveat:** [What to watch out for]

\`\`\`[language]
[relevant code snippet]
\`\`\`

**What to copy**: [The good parts]
**What to avoid**: [The problematic parts]

## Common Patterns Observed
1. **[Pattern]**: Used in [X] high-quality examples - [description]

## Anti-Patterns to Avoid
[If you found examples of what NOT to do]
- **[Anti-pattern]**: Seen in [X], but [why it's bad]

## Shared Libraries
[If there's a shared library, strongly recommend it]
- **[library name]** ([link]) - Use this instead of rolling your own

## Who to Ask
| Name | Why |
|------|-----|
| [Name] | Wrote the recommended example |
```

---

## If No Good Examples Found

Be honest:

```markdown
# Usage Examples: [API/Pattern]

## No High-Quality Examples Found

I searched for examples of [API/Pattern] but didn't find examples I'd recommend following.

**What I found:**
- [X] matches, but all were [outdated/low quality/different context]

**This could mean:**
- This is a new API with limited adoption
- Different terminology is used internally
- Teams roll their own instead of using a standard

**Suggested next steps:**
1. Check the [API/library] official documentation directly
2. Ask in [relevant Slack channel]
3. Consider: Is there a reason this isn't widely used?
```

---

## Troubleshooting

### No Examples Found
If searches return no results:
- Try alternative names for the API/pattern
- Search for the underlying technology instead
- Note the gap so user knows it's not widely used

### Too Many Examples
If too many results appear:
- Apply vetting criteria strictly
- Prioritize by recency and quality signals
- Only include examples you'd actually recommend
