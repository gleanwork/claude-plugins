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

### Phase 4: Present Examples

**Actions**:
Format findings as actionable examples:

```markdown
# Usage Examples: [API/Pattern]

## Official Documentation
- **[Doc title]** ([link]) - [what it covers]

## Code Examples Found

### Example 1: [Repo/Team Name]
**File:** [path] ([link])
**Context:** [brief description of how they use it]

\`\`\`[language]
[relevant code snippet]
\`\`\`

**Key takeaways:**
- [pattern or technique worth noting]
- [configuration approach]

### Example 2: [Repo/Team Name]
**File:** [path] ([link])
**Context:** [description]

\`\`\`[language]
[relevant code snippet]
\`\`\`

## Common Patterns Observed
1. **[Pattern]**: Used in [X] places - [description]
2. **[Pattern]**: [description]

## Shared Libraries
If there's a shared library, mention it:
- **[library name]** ([link]) - Recommended over rolling your own

## Who to Ask
| Name | Why |
|------|-----|
| [Name] | Wrote [X], active maintainer |
```

## Tips

- Prioritize recent examples over old ones
- Note if there are conflicting patterns across teams
- Highlight official/recommended approaches if they exist
- Flag deprecated patterns users should avoid

---

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing `mcp__glean` tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### No Examples Found
If searches return no results:
- Try alternative names for the API/pattern
- Search for the underlying technology instead
- Check if this is a new API with limited adoption
- Note the gap so user knows it's not widely used

### Too Many Examples
If too many results appear:
- Filter by recency (`updated:past_month`)
- Focus on repos from teams known for good practices
- Prioritize examples with tests
