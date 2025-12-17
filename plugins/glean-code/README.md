# Glean Code

**Cross-repository code exploration - search code across your org, find examples, and discover similar implementations.**

Leverage Glean's code search to explore beyond your local repository.

## Prerequisites

Requires [glean-core](../glean-core) to be installed first.

## Installation

```bash
claude plugin install glean-core  # if not already installed
claude plugin install glean-code
```

## What's Included

### Skill
- **code-exploration** - Guidance for cross-repo code search, triggers on implementation questions

### Agent
- **codebase-navigator** - Navigates internal repositories to find implementations and patterns

### Commands
- `/glean-code:codebase-context <system>` - Get architectural context from internal repos
- `/glean-code:find-examples <API/pattern>` - Find usage examples across the org
- `/glean-code:code-owners <component>` - Identify who owns/maintains code areas
- `/glean-code:similar-code <pattern>` - Find similar implementations across repos

## Example Usage

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
```

## Key Differentiator

**Local search tools only see your current repo.** Glean Code searches across ALL repositories in your organization. This enables:

- Finding examples: "How do other teams handle authentication?"
- Understanding systems: "What repos touch the billing service?"
- Finding owners: "Who's actively working on payments?"
- Avoiding duplication: "Has someone already built a rate limiter?"

## Works for Monorepos and Multi-Repo

Whether your company uses a monorepo or multiple repositories, Glean Code searches across everything that's indexed.

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
