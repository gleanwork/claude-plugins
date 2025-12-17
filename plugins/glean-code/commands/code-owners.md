---
description: Identify who owns/maintains code areas
argument-hint: Component, service, or file path (e.g., "billing module", "src/auth")
---

# Code Owners

Identify who owns, maintains, or has expertise in a specific code area.

**Finding owners for:** $ARGUMENTS

## Why This Matters

Knowing who to talk to is often the first step to understanding a system:
- Get answers to questions faster
- Find the right reviewer for changes
- Understand the history of decisions
- Identify stakeholders for migrations

## Process

### Phase 1: Find Recent Contributors

Search for who's been actively working on this code:

```
code_search "$ARGUMENTS owner:* updated:past_month"
code_search "$ARGUMENTS from:* updated:past_3_months"
```

### Phase 2: Find Historical Authors

Look for original authors and significant contributors:

```
code_search "$ARGUMENTS owner:* after:2023-01-01"
```

### Phase 3: Find Related Documentation Authors

People who wrote the docs often have deep knowledge:

```
search "$ARGUMENTS design doc OR architecture owner:*"
search "$ARGUMENTS RFC owner:*"
```

### Phase 4: Cross-Reference with Org Info

Get current roles and contact info:

```
employee_search "[contributor names]"
```

### Phase 5: Present Ownership Map

```markdown
# Code Ownership: [Component]

## Active Maintainers (Past 3 Months)
| Name | Role | Commits | Contact |
|------|------|---------|---------|
| [Name] | [Title] | [count] | [email] |

## Primary Contacts
Based on activity and expertise, these are your best contacts:

1. **[Name]** - [Title]
   - **Why**: Most active contributor, [X] commits in past month
   - **Good for**: [types of questions]
   - **Contact**: [email]

2. **[Name]** - [Title]
   - **Why**: Wrote original design doc, still reviews PRs
   - **Good for**: Architecture questions, historical context
   - **Contact**: [email]

## Historical Contributors
People who built this but may have moved on:
| Name | Current Role | Last Active | Contact |
|------|--------------|-------------|---------|
| [Name] | [Title] (now on [team]) | [date] | [email] |

## Team Ownership
If there's a clear team that owns this:
- **Team**: [team name]
- **Manager**: [name]
- **Slack channel**: [channel]

## Documentation Owners
| Doc | Author | Last Updated |
|-----|--------|--------------|
| [Design doc] ([link]) | [Name] | [date] |

## Notes
- [Any relevant context about ownership transitions]
- [Known gaps or areas without clear ownership]
```

## Tips

- Distinguish between current maintainers vs historical authors
- Note if someone has moved teams but retains context
- Include Slack channels or team contacts when available
- Flag if ownership is unclear or contested
