# glean-skills

Discover and create Claude Code skills from Glean work patterns.

## Prerequisites

- **glean-core** plugin must be installed
- Glean MCP server must be connected

## Commands

### `/glean-skills:discover`

Analyze your work patterns and recommend skill candidates.

Uses Glean to:
- Query your roles, projects, and recent topics
- Analyze your recent work activity
- Identify patterns suitable for automation
- Present structured recommendations

### `/glean-skills:create <name>`

Generate a SKILL.md file from a description.

```bash
/glean-skills:create stacked-pr-patterns
/glean-skills:create weekly-standup-prep
```

## Skills

### skill-creation-guide

Auto-triggers when you discuss creating skills or ask about SKILL.md format. Provides best practices and links to the creation commands.

## Agents

### work-pattern-analyzer

Analyzes Glean data to identify skill automation opportunities. Uses `memory`, `user_activity`, and `search` tools to find patterns in your work.

### skill-generator

Generates properly formatted SKILL.md files following Claude Code best practices.

## Example Usage

```bash
# Discover automation opportunities from your work
/glean-skills:discover

# Create a skill based on a discovered pattern
/glean-skills:create pr-review-checklist

# Or create from scratch
/glean-skills:create deployment-runbook
```
