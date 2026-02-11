---
description: Generate a SKILL.md file from a description
argument-hint: Skill name or description (e.g., "stacked-pr-patterns")
allowed-tools: [AskUserQuestion]
---

# Create a Skill

Generate a properly formatted SKILL.md file from a name or description.

## Input

**Skill concept:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with examples, then stop:

```
Usage: /glean-skills:create <skill-name-or-description>

Examples:
  /glean-skills:create pr-review-checklist
  /glean-skills:create weekly-standup-prep
  /glean-skills:create "skill that summarizes meeting notes"
```

Otherwise continue with the provided input.

---

## Process

### Phase 1: Clarify Requirements

Use `AskUserQuestion` to gather details:

1. **Skill purpose**: What should this skill do?
2. **Trigger conditions**: When should it activate?
3. **Tools needed**: Does it use Glean, code search, or other tools?
4. **Output format**: What should the skill produce?

If the input is descriptive enough, you may skip some questions.

### Phase 2: Generate Skill

Spawn the `skill-generator` agent with:
- The skill name/concept
- Gathered requirements
- Available tools context

The agent will return a complete SKILL.md.

### Phase 3: Choose Location

Use `AskUserQuestion` to ask where to save:

| Option | Location | Use Case |
|--------|----------|----------|
| User-level | `~/.claude/skills/<name>/SKILL.md` | Personal skill (this machine only) |
| Project-level | `.claude/skills/<name>/SKILL.md` | Shared with project team |
| Plugin | `plugins/<plugin>/skills/<name>/SKILL.md` | Distributed with a plugin |
| Display only | (no file written) | Review before saving |

### Phase 4: Write and Confirm

If a location was chosen:
1. Create the directory if needed
2. Write the SKILL.md file
3. Confirm with the path

```markdown
## Skill Created

**Location:** `[path]`

The skill `[name]` will now auto-trigger when:
- [trigger condition 1]
- [trigger condition 2]

To test it, try saying: "[example phrase that triggers it]"
```

## Examples

### From a name
```
/glean-skills:create deployment-runbook
```
→ Creates a skill for deployment procedures

### From a description
```
/glean-skills:create "skill that helps prepare for 1:1 meetings"
```
→ Creates a meeting prep skill with Glean integration

### From a discovered pattern
```
/glean-skills:create stacked-pr-workflow
```
→ Creates a skill based on a pattern from `/glean-skills:discover`

---

## Troubleshooting

### Skill Location Not Writable
If the chosen location can't be written to:
- Check directory permissions
- Try a different location (user-level vs project-level)
- Display the skill content for manual saving

### Unclear Skill Purpose
If the skill purpose is still unclear after asking:
- Suggest concrete examples of when the skill would trigger
- Offer to review existing skills for inspiration
- Start with a minimal skill and iterate
