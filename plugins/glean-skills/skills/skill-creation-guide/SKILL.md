---
name: skill-creation-guide
description: Guide the user through creating a new Claude Code skill — SKILL.md format, frontmatter, progressive disclosure, when to use reference files, common pitfalls.
when_to_use: |
  Trigger phrases include "create a skill", "write a skill", "make a skill", "new skill", "SKILL.md format", "how do skills work", "skill structure", "skill best practices", "convert this workflow into a skill", "I want to add a custom command".

  Don't use this for invoking existing skills — only when the user is authoring a new one or wants to understand the skill format itself.
---

# Skill Creation Guide

This guide helps you create effective Claude Code skills.

## When This Applies

Use this guide when you want to:
- Create a new skill for yourself or a plugin
- Understand SKILL.md format and structure
- Learn skill development best practices
- Convert a repeated workflow into a skill

## BE SKEPTICAL

Not every idea makes a good skill. Before creating one, evaluate:

**Recurrence Test**
- Will this be used repeatedly?
- ✅ CREATE: Weekly or more frequent use
- ⚠️ RECONSIDER: Monthly use - may not be worth it
- ❌ SKIP: One-time need - don't create a skill

**Automation Test**
- Can this actually be automated?
- ✅ CREATE: Clear, repeatable process
- ⚠️ RECONSIDER: Requires significant judgment each time
- ❌ SKIP: Too context-dependent, each case is unique

**Value Test**
- Is the cumulative time savings significant?
- ✅ CREATE: Saves meaningful time per use
- ⚠️ RECONSIDER: Marginal time savings
- ❌ SKIP: Takes longer to invoke than doing manually

**Duplication Test**
- Does this already exist?
- ✅ CREATE: Novel approach to an unaddressed need
- ⚠️ RECONSIDER: Similar to existing skill - maybe enhance instead
- ❌ SKIP: Already covered by existing skill or command

**Don't create skills for**:
- One-time organizational events (team mergers, annual planning)
- Tasks that are fundamentally different each time
- Simple tasks that take <30 seconds manually
- Things you'll forget exist and never invoke

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
