---
description: Identify who owns/maintains code areas
argument-hint: Component, service, or file path (e.g., "billing module", "src/auth")
---

# Code Owners

Identify who owns, maintains, or has expertise in a specific code area.

## Input

**Component:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

**Finding owners for:** $ARGUMENTS

## Why This Matters

Knowing who to talk to is often the first step to understanding a system:
- Get answers to questions faster
- Find the right reviewer for changes
- Understand the history of decisions
- Identify stakeholders for migrations

---

## Core Principles

- **Multi-signal identification**: Code + docs + org structure = complete picture
- **Recency matters**: Active maintainers are more useful than historical authors
- **Be skeptical**: Just having commits doesn't mean they're the right contact
- **Quality over quantity**: 2-3 right people beats 10 tangential names

---

## Process

### Phase 1: Find Recent Contributors

**Actions**:
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

### Phase 5: Vet Each Candidate (CRITICAL)

**Goal**: Filter to people who can actually help - BE SKEPTICAL

For each person found, evaluate:

**Active Ownership Test**
- Are they actively maintaining this code?
- ✅ ACTIVE OWNER: Multiple commits in past 3 months, reviews PRs
- ⚠️ SEMI-ACTIVE: Occasional activity, still relevant
- 📚 HISTORICAL: Built it but no longer maintains
- ❌ REJECT: Single commit, tangential involvement

**Current Relevance Test**
- Are they still in a position to help?
- ✅ CURRENT: Same team, same area
- ⚠️ MOVED: Changed teams but retains context
- ❌ REJECT: Left company, completely different area now

**Knowledge Depth Test**
- Do they have real knowledge or just happened to touch the code?
- ✅ DEEP: Wrote design docs, significant PRs, named in CODEOWNERS
- ⚠️ MODERATE: Regular contributor, knows the code
- ❌ REJECT: Minor commits, typo fixes, one-off changes

**Contact Appropriateness Test**
- Is it appropriate to contact them about this?
- ✅ YES: Owns the code, expects questions
- ⚠️ MAYBE: Good knowledge but busy/senior - suggest alternatives first
- ❌ NO: Would be surprised to be contacted about this

### Phase 6: Present Vetted Ownership Map

**Actions**:
Present the ownership map:

```markdown
# Code Ownership: [Component]

## Vetting Summary
| Candidates Found | Active Owners | Historical | Rejected |
|------------------|---------------|------------|----------|
| [X] | [Y] | [Z] | [W] |

## Primary Contacts (Recommended)
These are your best contacts based on activity and expertise:

### 1. [Name] - [Title]
**Confidence**: High
- **Why**: Most active contributor, [X] commits in past month
- **Good for**: Day-to-day questions, PR reviews
- **Last active**: [date]
- **Contact**: [email]

### 2. [Name] - [Title]
**Confidence**: High
- **Why**: Wrote original design doc, still reviews PRs
- **Good for**: Architecture questions, historical context
- **Last active**: [date]
- **Contact**: [email]

## Secondary Contacts
These people have context but are less ideal as first contact:

| Name | Role | Why Secondary | Contact |
|------|------|---------------|---------|
| [Name] | [Title] | Moved to [team] but retains context | [email] |

## Historical Contributors
People who built this but have moved on - use only for historical context:

| Name | Contribution | Current Role | Last Active |
|------|--------------|--------------|-------------|
| [Name] | Original author | Now on [team] | [date] |

## Team Ownership
If there's a clear team that owns this:
- **Team**: [team name]
- **Manager**: [name]
- **Slack channel**: [channel] (may be faster than individual outreach)

## Rejected Candidates
| Name | Reason |
|------|--------|
| [Name] | Single commit - typo fix only |
| [Name] | Left company |
| [Name] | Tangential involvement only |

## Notes
- [Any relevant context about ownership transitions]
- [Known gaps or areas without clear ownership]
```

---

## If No Clear Owners Found

This is important information - be clear about it:

```markdown
# Code Ownership: [Component]

## Ownership Unclear

I couldn't identify clear owners for this component.

**What I searched:**
- Recent commits: [results]
- CODEOWNERS: [results]
- Design docs: [results]

**Possible explanations:**
- Ownership may be implicit within a team
- Code may be unmaintained/legacy
- Different naming conventions may be in use

**Suggested next steps:**
1. Check the repository's CODEOWNERS or MAINTAINERS file directly
2. Look at recent PR reviewers as a proxy
3. Ask in [relevant Slack channel]
4. Check with team lead in adjacent area: [suggestion]
```

---

## Troubleshooting

### No Results Found
If searches return no results:
- Try broader search terms (e.g., parent directory name)
- Check if the component name matches repository naming
- Try alternative names or acronyms

### Ownership Unclear
If no clear owners are found:
- This is valuable information - report it clearly
- Don't pad with weak candidates to seem comprehensive
