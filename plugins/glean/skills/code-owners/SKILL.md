---
name: code-owners
description: Identify who owns, maintains, or has expertise in a specific code area — use when asked who to talk to about a system, who to request a code review from, or who has been actively working in a codebase area.
---

# Code Owners

Identify who owns, maintains, or has expertise in a specific code area.

Determine the component or codebase area from the user's request. If not specified, ask before proceeding.

## Core Principles

- **Multi-signal identification**: Code + docs + org structure = complete picture
- **Recency matters**: Active maintainers are more useful than historical authors
- **Be skeptical**: Just having commits doesn't mean they're the right contact
- **Quality over quantity**: 2-3 right people beats 10 tangential names

## Process

### Phase 1: Find Recent Contributors

Search for who's been actively working on this code:

```
code_search "[component] owner:* updated:past_month"
code_search "[component] from:* updated:past_3_months"
```

### Phase 2: Find Historical Authors

Look for original authors and significant contributors:

```
code_search "[component] owner:* after:2023-01-01"
```

### Phase 3: Find Related Documentation Authors

People who wrote the docs often have deep knowledge:

```
search "[component] design doc OR architecture owner:*"
search "[component] RFC owner:*"
```

### Phase 4: Cross-Reference with Org Info

Get current roles and contact info:

```
employee_search "[contributor names]"
```

### Phase 5: Vet Each Candidate

For each person found, evaluate:

| Test | ✅ Active Owner | ⚠️ Consider | ❌ Reject |
|------|---------------|------------|---------|
| **Ownership** | Multiple commits in past 3 months, reviews PRs | Occasional activity, still relevant | Single commit, tangential involvement |
| **Relevance** | Same team, same area | Changed teams but retains context | Left company, completely different area |
| **Knowledge** | Wrote design docs, significant PRs, in CODEOWNERS | Regular contributor, knows the code | Minor commits, typo fixes |
| **Contact** | Owns the code, expects questions | Knowledgeable but busy/senior — suggest alternatives first | Would be surprised to be contacted |

### Phase 6: Present Vetted Ownership Map

```markdown
# Code Ownership: [Component]

## Vetting Summary
| Candidates Found | Active Owners | Historical | Rejected |
|------------------|---------------|------------|----------|
| [X] | [Y] | [Z] | [W] |

## Primary Contacts (Recommended)

### 1. [Name] — [Title]
**Confidence**: High
- **Why**: Most active contributor, [X] commits in past month
- **Good for**: Day-to-day questions, PR reviews
- **Last active**: [date]
- **Contact**: [email]

## Secondary Contacts
| Name | Role | Why Secondary | Contact |
|------|------|---------------|---------|
| [Name] | [Title] | Moved to [team] but retains context | [email] |

## Historical Contributors
| Name | Contribution | Current Role | Last Active |
|------|--------------|--------------|-------------|
| [Name] | Original author | Now on [team] | [date] |

## Team Ownership
- **Team**: [team name]
- **Manager**: [name]
- **Slack channel**: [channel] (may be faster than individual outreach)

## Rejected Candidates
| Name | Reason |
|------|--------|
| [Name] | Single commit — typo fix only |
| [Name] | Left company |
```

## If No Clear Owners Found

```markdown
# Code Ownership: [Component]

## Ownership Unclear

Could not identify clear owners for this component.

**Possible explanations:**
- Ownership may be implicit within a team
- Code may be unmaintained/legacy

**Suggested next steps:**
1. Check the repository's CODEOWNERS or MAINTAINERS file directly
2. Look at recent PR reviewers as a proxy
3. Ask in [relevant Slack channel]
```
