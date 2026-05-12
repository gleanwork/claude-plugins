# Glean Code

**Cross-repository code exploration — search code across your org, find examples, and discover similar implementations.**

Leverage Glean's code search to explore beyond your local repository.

## Prerequisites

Requires [glean-core](../glean-core) to be installed first.

## Installation

```bash
claude plugin install glean-core  # if not already installed
claude plugin install glean-code
```

## What's included

### Skill

- **`using-glean-code`** — Auto-triggers on cross-repo code questions ("how is X implemented", "where is the code for", "find similar code", "how do other teams handle Y"). The skill teaches the workflow; the canonical `code_search` tool reference lives in `glean-core` (see [`using-glean/reference/code-search.md`](../glean-core/skills/using-glean/reference/code-search.md)).

  Reference files under [`skills/using-glean-code/reference/`](skills/using-glean-code/reference/):

  | File | Covers |
  |---|---|
  | `exploration.md` | Workflow for exploring an unfamiliar system across repos |
  | `plan-prep.md` | Gathering enterprise context before entering plan mode |

### Agents

- **codebase-navigator** — Navigates internal repositories to find implementations and patterns
- **plan-prep-researcher** — Gathers design docs, implementations, stakeholders, and related systems for planning

### Commands

- `/glean-code:codebase-context <system>` — Get architectural context from internal repos
- `/glean-code:find-examples <API/pattern>` — Find usage examples across the org
- `/glean-code:code-owners <component>` — Identify who owns/maintains code areas
- `/glean-code:similar-code <pattern>` — Find similar implementations across repos
- `/glean-code:plan-prep <task>` — Research enterprise context before entering plan mode

## Example usage

```bash
# Get context before working on a system
/glean-code:codebase-context payments service
/glean-code:codebase-context auth middleware

# Find examples of how others use an API
/glean-code:find-examples AuthClient
/glean-code:find-examples retry logic

# Find who to talk to
/glean-code:code-owners billing module
/glean-code:code-owners src/auth

# Find prior art before building something
/glean-code:similar-code rate limiting
/glean-code:similar-code caching layer

# Research enterprise context before planning
/glean-code:plan-prep Add authentication to API
/glean-code:plan-prep Refactor payment service
/glean-code:plan-prep Implement webhooks
```

## Key differentiator

**Local search tools only see your current repo.** Glean Code searches across ALL repositories in your organization. This enables:

- Finding examples: "How do other teams handle authentication?"
- Understanding systems: "What repos touch the billing service?"
- Finding owners: "Who's actively working on payments?"
- Avoiding duplication: "Has someone already built a rate limiter?"

## Works for monorepos and multi-repo

Whether your company uses a monorepo or multiple repositories, Glean Code searches across everything that's indexed.

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
