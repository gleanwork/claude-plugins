# Glean Search

**Enterprise search across documents, Slack, email, and other sources.**

Search across all your company's knowledge with natural language queries.

## Prerequisites

Requires [glean-core](../glean-core) to be installed first.

## Installation

```bash
claude plugin install glean-core   # if not already installed
claude plugin install glean-search
```

## What's included

### Skill

- **`search`** — Auto-triggers on quick-search phrasing ("find the doc about", "search for", "where is", "look up"). Invokable as `/glean-search:search <query>`.

### Agent

- **enterprise-searcher** — Cross-source search specialist that finds relevant information across documents, wikis, Slack, email, and more.

## Example usage

```bash
# Quick searches
/glean-search:search quarterly planning 2024
/glean-search:search API documentation updated:past_week
/glean-search:search owner:"Jane Doe" project roadmap

# The skill auto-triggers when you ask in natural language
"Find all documents about the authentication migration"
```

## Search tips

Use filters to narrow results:
- `owner:"John Smith"` — documents created by a person
- `updated:past_week` — recently updated documents
- `app:confluence` — documents from a specific app
- `after:2024-01-01` — documents after a date

For full filter syntax see the `using-glean` skill's `reference/search.md` in `glean-core`.

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
