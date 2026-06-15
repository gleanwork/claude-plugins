---
name: using-glean-code
description: Search and analyze internal source code across the organization's repositories — use when asked how something is implemented, where the code for a system lives, who has been working on a codebase, or to find similar patterns across teams. Trigger phrases include how is X implemented, where is the code for, find the implementation of, what repos contain, who wrote the code for, how do other teams handle, find similar code to, examples of using, prior art for. Do not use for code in the current working directory (prefer local Grep/Glob), for design docs (use the using-glean skill's search reference), or for finding people without code context (use the using-glean skill's employee-search reference).
---

# Using Glean for Code Exploration

Glean indexes source code across the organization's connected repositories. Local tools (`Grep`, `Glob`, `Read`) see only the current repo; this skill is for everything else.

## When to reach for this

- **Finding the system** — "Where does our payments code live?"
- **Finding the patterns** — "How do other teams handle rate limiting?"
- **Finding the people** — combining code authorship with `employee_search` reveals real owners (not just titled ones)
- **Prior art before designing** — see [reference/plan-prep.md](reference/plan-prep.md) for the research-before-plan workflow
- **Cross-repo exploration** — understanding systems, mapping breadth, finding contributors across the organization

## The tool you'll mostly use

This skill drives the `code_search` MCP tool. For full param shape, inline filter syntax, and pitfalls (quoting names, the `app:` filter not applying, recency caveats), read [`../using-glean/reference/code-search.md`](../using-glean/reference/code-search.md). That is the canonical reference; this skill carries the *workflow* on top.

For this skill's own workflow patterns, see:

- [reference/exploration.md](reference/exploration.md) — exploring an unfamiliar system across repos: what to search for, what to filter, what to present
- [reference/plan-prep.md](reference/plan-prep.md) — gathering enterprise context before entering plan mode for architectural / strategic work

## Vetting

Not every match is worth surfacing. Code in `legacy/`, `deprecated/`, `archive/`, abandoned repos, or files with extensive `TODO/FIXME` comments will mislead the user. Apply the criteria in [`../using-glean/reference/vetting.md`](../using-glean/reference/vetting.md) and prefer 3 high-quality matches over 10 unfiltered ones.

**Quality test**
- Is this good code to reference?
- GOOD: Clean, tested, actively maintained
- ACCEPTABLE: Works but has caveats
- POOR: Hacky, deprecated, abandoned

**Recency test**
- Is this code maintained?
- ACTIVE: Commits in past 3 months
- SLOWING: 3–12 months since last commit
- STALE: 12+ months — likely outdated patterns

**Relevance test**
- Does this actually answer the question?
- RELEVANT: Directly addresses what was asked
- RELATED: Similar but different context
- TANGENTIAL: Keyword match only

Filter out: code in `/deprecated/`, `/old/`, `/legacy/` paths; abandoned repositories; prototype/experimental code; code with extensive TODO/FIXME comments. Quality over quantity — 3 good examples beat 10 mediocre ones.

## Key differentiator

Local tools (grep, glob) search only the current repo. Glean searches across all repositories in the organization. This is powerful for:
- Finding examples: "How do other teams handle authentication?"
- Understanding systems: "What repos touch the billing service?"
- Finding owners: "Who's been active in the payments codebase?"

## Tool selection

| User intent | Glean tool |
|-------------|------------|
| Find code by content, pattern, or file | `code_search` |
| Find related design docs or specs | `search` |
| Identify code owners/contributors | `code_search` + `employee_search` |
| Read full file content | `read_document` |

## Output expectations

When presenting code findings:

1. **Cite each file with its full URL** so the user can open it directly
2. **Note last-update date** when a result depends on currency (active patterns vs. archaeological digs)
3. **Group by repo** when results span many repos — it shows the user the shape of the answer
4. **Flag drift** when implementations disagree across teams — don't pretend consensus exists if it doesn't

## Related skills

- `codebase-context` — structured architecture rundown for an unfamiliar system
- `similar-code` — find similar implementations
- `find-examples` — usage examples for an internal API or library
- `code-owners` — maintainers and contributors
- `plan-prep` — the workflow described in [reference/plan-prep.md](reference/plan-prep.md)
