---
name: skill-creation-guide
description: Guide the user through authoring a new agent skill — when a skill is worth creating, the SKILL.md format, progressive disclosure, and common pitfalls. Also covers discovering skill opportunities from the user's work patterns and generating a SKILL.md from a description. Trigger phrases include "create a skill", "write a skill", "make a skill", "new skill", "SKILL.md format", "how do skills work", "skill best practices", "convert this workflow into a skill", "what should I automate", and "find skill opportunities". Don't use it for invoking existing skills — only when authoring a new one or understanding the skill format.
---

# Skill Creation Guide

Help the user author effective agent skills — single `SKILL.md` files (in the
open Agent Skills format) that auto-trigger by context and provide specialized
guidance. The format is shared across hosts (Claude Code, Cursor, and others);
only the install location differs.

This skill covers three things: deciding whether a skill is worth creating,
discovering candidates from the user's work, and generating a well-formed skill.

## BE SKEPTICAL

Not every idea makes a good skill. Evaluate before creating:

**Recurrence** — Will this be used repeatedly?
- ✅ Weekly or more → create
- ⚠️ Monthly → reconsider, may not be worth it
- ❌ One-time → skip

**Automation** — Can it actually be automated?
- ✅ Clear, repeatable process → create
- ⚠️ Needs significant judgment each time → reconsider
- ❌ Too context-dependent, each case unique → skip

**Value** — Is the cumulative time saved significant?
- ✅ Meaningful savings per use → create
- ❌ Slower to invoke than doing manually → skip

**Duplication** — Does it already exist?
- ✅ Novel, unaddressed need → create
- ⚠️ Similar to an existing skill → enhance that instead
- ❌ Already covered → skip

Don't create skills for one-time events, tasks that differ fundamentally each
time, sub-30-second manual tasks, or things the user will forget exist.

## Workflow A — Discover opportunities

When the user asks what they should automate, analyze their work patterns first.

Requires the Glean MCP tools. If they aren't visible, the user hasn't connected
a Glean MCP server for this host — point them at their host's Glean MCP setup.

1. Gather context with Glean: `memory` (roles, responsibilities, active
   projects), `user_activity` (past ~2 weeks), and `search` for process docs
   (`"runbook OR checklist OR process owner:me"`).
2. Spawn the `work-pattern-analyzer` agent to identify repeated queries,
   frequent contexts, workflow sequences, and manual processes — and to vet each
   candidate against the recurrence/value tests above.
3. Present vetted recommendations grouped by cumulative value, and show the
   rejected candidates with reasons. A few high-quality candidates beat many
   weak ones — "no automatable patterns" is a valid outcome.

See `using-glean/reference/` for the param shape of `memory`, `user_activity`,
and `search`.

## Workflow B — Generate a skill

When the user wants to create a specific skill:

1. Clarify (only what isn't already clear): purpose, trigger conditions, tools
   it uses, and output format.
2. Spawn the `skill-generator` agent with the concept, requirements, and
   available-tools context. It returns a complete `SKILL.md` — or declines, with
   reasons, if the idea fails the skepticism tests.
3. Offer to save it to the user's host skills directory, or display it for
   review. Confirm the path and the trigger phrases that will activate it.

## SKILL.md structure

```yaml
---
name: skill-name-in-kebab-case
description: When this skill triggers — specific phrases, contexts, and use cases. Fold trigger phrases into this field; keep it thorough but under ~200 words.
---
```

```markdown
# Skill Title

Brief overview of what this skill does.

## When This Applies
- Condition / trigger phrases

## Main Content
[The workflow, guidance, or instructions — imperative form]

## Output Format (optional)
[Template for what the skill produces]
```

## Best practices

1. **Specific triggers.** "Use when reviewing pull requests, or when the user
   says 'review this PR' / 'check my code'" beats "use for code review."
2. **Progressive disclosure.** Essential action first; detail and edge cases
   below. Push deep, load-on-demand material into `reference/*.md`.
3. **Actionable, imperative content.** "Search for X", not "Searches for X."
4. **Name the tools** the skill uses (e.g. Glean `search`, `memory`; or `Grep`,
   `Read`).
5. **Stay host-agnostic.** Don't hard-code one host's slash-command syntax or
   install paths; describe the capability and let each host resolve it.

## Where to save

Skills live in the host's skills directory — e.g. `~/.claude/skills/<name>/`
(personal) or `.claude/skills/<name>/` (project) for Claude Code, the equivalent
location for other hosts, or `skills/<name>/` when authoring for a plugin
library like this repo.

## Related skills

- `work-pattern-analyzer` / `skill-generator` agents back the two workflows above.
