---
name: project-awareness
description: Use when the user asks about project status, ownership, or context. Triggers on phrases like "status of X project", "who owns Y", "what's happening with Z", "project update", "where does the project stand", "what's the state of", "who's working on", or when needing quick project context without a full analysis.
---

# Project Awareness

When users ask about projects, their status, or ownership, use Glean to quickly gather relevant context.

## Tool Naming

See the `glean-tools-guide` skill for Glean MCP tool naming conventions.

## When This Applies

Use this approach when users ask:
- "What's the status of [project]?"
- "Who owns [project]?"
- "What's happening with [project]?"
- "Where does [project] stand?"
- "Who's working on [project]?"
- Quick project context questions

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
search "[project] owner OR lead app:confluence"
```

### Recent Activity
```
search "[project] updated:past_week sort_by_recency:true"
```

### Current Work
```
search "[project] in progress OR active app:jira"
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

## Relationship to Commands

For comprehensive project context, suggest:
- `/glean-project:project-context <name>` - Full project analysis with docs, people, decisions
- `/glean-project:project-handoff <name>` - Generate complete handoff document
- `/glean-docs:onboarding <topic>` - Get up to speed on a team or area
