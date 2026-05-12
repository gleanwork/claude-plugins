---
description: Analyze your work patterns and recommend skill candidates
---

# Discover Skill Opportunities

Analyze your Glean work patterns to find automation opportunities that could become Claude Code skills.

## Prerequisites Check

First, verify Glean MCP is connected by checking for Glean MCP tools (or similar Glean server tools). If not connected, inform the user to run `/glean-core:status` or `/glean-core:mcp-setup`.

---

## Process

### Phase 1: Gather Your Context

Query Glean to understand your work:

1. **Memory** - Get roles, responsibilities, active projects, recent topics:
   ```
   memory - read all categories
   ```

2. **Recent Activity** - Get past 2 weeks of work:
   ```
   user_activity - start_date: 2 weeks ago, end_date: today
   ```

3. **Relevant Docs** - Search for process documents:
   ```
   search "runbook OR checklist OR process OR workflow owner:me"
   ```

### Phase 2: Analyze Patterns

Spawn the `work-pattern-analyzer` agent to analyze the gathered data and identify:
- Repeated queries or lookups
- Frequent document access patterns
- Workflow sequences
- Manual processes that could be automated

### Phase 3: Vet Recommendations (CRITICAL)

The agent will critically evaluate each candidate:

**What Gets Included:**
- Tasks with clear recurrence (daily, weekly, monthly)
- High cumulative value (frequency × time saved)
- Patterns with evidence of repetition in the data

**What Gets Rejected:**
- One-time events (team mergers, migrations, reorgs)
- Annual or rare tasks with low cumulative value
- Activities triggered by unique circumstances

The agent shows its vetting work, including rejected candidates and why.

### Phase 4: Present Recommendations

Format findings as actionable recommendations:

```markdown
## Skill Discovery Results

### Your Profile
- **Role**: [from memory]
- **Active Projects**: [from memory]
- **Recent Focus**: [from activity]

### Vetting Summary
| Candidates Found | Passed Vetting | Rejected |
|------------------|----------------|----------|
| [#] | [#] | [#] |

### Recommended Skills

#### High Value (Frequent + Automatable)
| Skill Name | Frequency | Cumulative Impact |
|------------|-----------|-------------------|
| [name] | [daily/weekly] | [time saved × frequency] |

#### Medium Value (Less Frequent but Significant)
| Skill Name | Frequency | Cumulative Impact |
|------------|-----------|-------------------|
| [name] | [monthly] | [time saved × frequency] |

### Rejected Candidates
| Candidate | Reason |
|-----------|--------|
| [name] | [why it won't recur] |

### Create a Skill

To create any of these skills:
```
/glean-skills:create <skill-name>
```

Or describe what you want:
```
/glean-skills:create "skill that does X when Y happens"
```
```

## Quality Over Quantity

A few high-quality recommendations are better than many weak ones. The goal is to find skills that will save significant cumulative time through frequent use.

**Good skill candidates:**
- Daily standup prep (5 min × 5 days = 25 min/week saved)
- PR review checklist (10 min × 10 PRs/week = 100 min/week saved)
- Weekly status report (30 min × 1/week = 30 min/week saved)

**Poor skill candidates:**
- Team merger channel migration (2 hours, but happens once)
- Annual performance review (1 hour, but once per year)
- Office relocation checklist (happens once every few years)

---

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing Glean MCP tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### Limited Activity Data
If user activity data is sparse:
- Note that more data would improve recommendations
- Focus on memory and role-based suggestions
- Ask user about their common workflows directly

### No Patterns Found
If no clear patterns emerge:
- This might indicate varied work without repetition
- This is a valid outcome - not everyone has automatable patterns
- Ask user about tasks they find tedious or repetitive
