---
name: using-glean-code
description: Search and analyze internal source code across the user's organization's repositories. Use when the user asks how something is implemented, where the code for a system lives, who has been working on a codebase, or wants to find similar patterns across teams — i.e., questions that need visibility beyond the local working directory.
when_to_use: |
  Trigger phrases include "how is X implemented", "where is the code for", "find the implementation of", "what repos contain", "who wrote the code for", "how do other teams handle", "find similar code to", "examples of using", "prior art for".

  Don't use this skill for code in the current working directory — prefer local Grep / Glob. Don't use it for design docs (use the `using-glean` skill's `search` reference) or for finding people without code context (use the `using-glean` skill's `employee-search` reference).
---

# Using Glean for Code Exploration

Glean indexes source code across the user's organization's connected repositories. Local tools (`Grep`, `Glob`, `Read`) see only the current repo; this skill is for everything else.

## When to reach for this

- **Finding the system** — "Where does our payments code live?"
- **Finding the patterns** — "How do other teams handle rate limiting?"
- **Finding the people** — combining code authorship with `employee_search` reveals real owners (not just titled ones)
- **Prior art before designing** — see [reference/plan-prep.md](reference/plan-prep.md) for the research-before-plan workflow

## The tool you'll mostly use

This skill drives the `code_search` MCP tool. For full param shape, inline filter syntax, and pitfalls (quoting names, the `app:` filter not applying, recency caveats), read [`using-glean/reference/code-search.md`](../../../../glean-core/skills/using-glean/reference/code-search.md) in the `glean-core` plugin. That's the canonical reference; this skill carries the *workflow* on top.

For this skill's own workflow patterns, see:

- [reference/exploration.md](reference/exploration.md) — exploring an unfamiliar system across repos: what to search for, what to filter, what to present
- [reference/plan-prep.md](reference/plan-prep.md) — gathering enterprise context before entering plan mode for architectural / strategic work

## Vetting

Not every match is worth surfacing. Code in `legacy/`, `deprecated/`, `archive/`, abandoned repos, or files with extensive `TODO/FIXME` comments will mislead the user. Apply the criteria in [`using-glean/reference/vetting.md`](../../../../glean-core/skills/using-glean/reference/vetting.md) and prefer 3 high-quality matches over 10 unfiltered ones.

## Output expectations

When presenting code findings:

1. **Cite each file with its full URL** so the user can open it directly
2. **Note last-update date** when a result depends on currency (active patterns vs. archaeological digs)
3. **Group by repo** when results span many repos — it shows the user the shape of the answer
4. **Flag drift** when implementations disagree across teams — don't pretend consensus exists if it doesn't

## Related commands

- `/glean-code:codebase-context <system>` — structured architecture rundown for an unfamiliar system
- `/glean-code:similar-code <pattern>` — find similar implementations
- `/glean-code:find-examples <api>` — usage examples
- `/glean-code:code-owners <component>` — maintainers and contributors
- `/glean-code:plan-prep <task>` — the workflow described in [reference/plan-prep.md](reference/plan-prep.md)
