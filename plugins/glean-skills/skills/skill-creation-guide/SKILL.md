---
name: skill-creation-guide
description: Auto-triggers when users discuss creating skills or ask about SKILL.md format. Triggers on phrases like "create a skill", "write a skill", "make a skill", "new skill", "SKILL.md format", "skill structure", "how do skills work", "skill best practices", or when the user wants to add custom behavior to Claude Code.
---

# Skill Creation Guide

This guide helps you create effective Claude Code skills.

## When This Applies

Use this guide when you want to:
- Create a new skill for yourself or a plugin
- Understand SKILL.md format and structure
- Learn skill development best practices
- Convert a repeated workflow into a skill

## What is a Skill?

A skill is a markdown file that teaches Claude how to handle specific situations. Skills auto-trigger based on context and provide specialized guidance.

## Quick Start

The fastest way to create a skill:

```bash
# Discover opportunities from your work patterns
/glean-skills:discover

# Create a skill from a description
/glean-skills:create <skill-name>
```

## SKILL.md Structure

```yaml
---
name: skill-name-in-kebab-case
description: When this skill triggers. Be specific about phrases, contexts, and use cases.
---
```

```markdown
# Skill Title

Brief overview of what this skill does.

## When This Applies

- Condition 1
- Condition 2
- Example phrases that trigger this

## Main Content

[The actual guidance, workflow, or instructions]

## Output Format (optional)

[Template for what the skill produces]
```

## Best Practices

### 1. Specific Triggers

Bad: "Use for code review"
Good: "Use when reviewing pull requests, checking code quality, or when user says 'review this PR', 'check my code', or 'code review'"

### 2. Progressive Disclosure

Start with the essential action, add details as sections:
1. Quick summary at the top
2. Detailed steps in the middle
3. Edge cases and examples at the bottom

### 3. Actionable Content

Use imperative form:
- "Search for X" not "Searches for X"
- "Check the following" not "The following should be checked"

### 4. Reference Available Tools

Name the tools the skill uses:
- Glean tools: `search`, `memory`, `user_activity`
- Code tools: `Grep`, `Glob`, `Read`
- Workflow tools: `Task`, `AskUserQuestion`

## Where to Save Skills

| Location | Use Case |
|----------|----------|
| `~/.claude/skills/` | Personal skills (your machine only) |
| `.claude/skills/` | Project skills (shared with team) |
| `plugins/*/skills/` | Plugin skills (distributed with plugin) |

## Related Commands

- `/glean-skills:discover` - Find skill opportunities from your work patterns
- `/glean-skills:create <name>` - Generate a SKILL.md from a description
