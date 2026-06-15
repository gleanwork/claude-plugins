---
name: project-awareness
description: Quick project context — surface a project's status, owner, recent activity, and key links. Use when the user wants a fast situational read on a project (trigger phrases include what's the status of, who owns, what's happening with, where does the project stand) rather than a deep handoff document.
---

# Project Awareness

When users ask about projects, their status, or ownership, use Glean to quickly gather relevant context.

Determine the project or topic from the user's request. If no project name is clear, ask the user which project they mean before proceeding.

## Tools

This skill drives the standard Glean MCP tools. For full param shape and pitfalls of `chat`, `search`, `employee_search`, and `meeting_lookup`, see the using-glean reference at `using-glean/reference/`.

## When This Applies

Use this approach when users ask:
- "What's the status of [project]?"
- "Who owns [project]?"
- "What's happening with [project]?"
- "Where does [project] stand?"
- "Who's working on [project]?"
- Quick project context questions

For full handoff documents, suggest the project-handoff skill instead. For questions about the user's own work, suggest the productivity skills.

## BE SKEPTICAL

Not all project info is current or reliable. Before presenting information, evaluate:

**Currency Test**
- Is this information fresh?
- ✅ INCLUDE: Updated in last 2 weeks
- ⚠️ CONTEXT: Last 2-4 weeks (note it's aging)
- ❌ EXCLUDE: Older than 1 month (status likely stale)

**Authority Test**
- Is this from an official source?
- ✅ INCLUDE: From project lead, official docs, tracking systems
- ⚠️ CONTEXT: From team members (secondary source)
- ❌ EXCLUDE: Informal mentions, dated secondhand reports

**Ownership Test**
- Is the current owner clear?
- ✅ INCLUDE: Explicitly assigned owner in system
- ⚠️ CONTEXT: Appears to be owner but not confirmed
- ❌ EXCLUDE: Unknown or orphaned projects

**Cross-Reference Check**
- Do sources agree?
- ✅ INCLUDE: Multiple sources confirm status
- ⚠️ CONTEXT: Single source, note confidence level
- ❌ EXCLUDE: Conflicting information (needs clarification)

**Filter Out**:
- Projects that appear abandoned (no activity for >3 months)
- Status without context (just "active" is meaningless)
- Owner info you cannot confirm

**If unsure**: Mark as "Status Unknown - Recommend checking with [owner]"

## Primary Approach

For quick context, use Glean chat:
```
chat "What is the current status of [project]? Who owns it and what are the recent updates?"
```

For deeper investigation, combine:
- `search` for project documentation
- `employee_search` for people
- `meeting_lookup` for recent discussions

## Query Patterns

### Quick Status
```
chat "Give me a 2-3 sentence status update on [project]."
```

### Find Owner
```
employee_search "[project] lead OR owner"
search query="[project] owner OR lead" app="confluence"
```

### Recent Activity
```
search query="[project]" updated="past_week" sort_by_recency=true
```

### Current Work
```
search query="[project] in progress OR active" app="jira"
```

## Output Format

For quick questions, respond concisely:

```markdown
**[Project]**
- **Status**: [Active/Planning/Blocked]
- **Owner**: [Name]
- **Recent Update**: [What's happening]
- **Details**: [Link to main doc]
```

For more detail, include:

```markdown
## [Project Name]

### Quick Status
| Attribute | Value |
|-----------|-------|
| Status | [Status] |
| Owner | [Name] |
| Last Updated | [Date] |

### Recent Activity
- [Activity 1]
- [Activity 2]

### Key People
- **Owner**: [Name]
- **Team**: [Team name]

### Key Links
- [Main doc]([link])
- [Tracker]([link])
```

## Related Skills

For more comprehensive project context, consider:
- **project-handoff** — generate a complete handoff document for a project
- **onboarding** — get up to speed on a team or area
