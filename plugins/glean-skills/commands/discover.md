---
description: Analyze your work patterns and recommend skill candidates
---

# Discover Skill Opportunities

Analyze your Glean work patterns to find automation opportunities that could become Claude Code skills.

## Prerequisites Check

First, verify Glean MCP is connected by checking for `mcp__glean_default__` tools (or similar Glean server tools). If not connected, inform the user to run `/glean-core:status` or `/glean-core:mcp-setup`.

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

### Phase 3: Present Recommendations

Format findings as actionable recommendations:

```markdown
## Skill Discovery Results

### Your Profile
- **Role**: [from memory]
- **Active Projects**: [from memory]
- **Recent Focus**: [from activity]

### Recommended Skills

#### High Value
| Skill Name | Type | Why |
|------------|------|-----|
| [name] | [type] | [evidence from data] |

#### Medium Value
| Skill Name | Type | Why |
|------------|------|-----|
| [name] | [type] | [evidence from data] |

### Create a Skill

To create any of these skills:
\`\`\`
/glean-skills:create <skill-name>
\`\`\`

Or describe what you want:
\`\`\`
/glean-skills:create "skill that does X when Y happens"
\`\`\`
```

## Tips

- Focus on patterns that appear multiple times
- Prioritize by frequency × time saved
- Consider both personal skills and team-sharable skills
- Look for "I always do X before Y" patterns
