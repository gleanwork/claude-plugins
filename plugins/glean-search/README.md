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

## What's Included

### Agent
- **enterprise-searcher** - Cross-source search specialist that finds relevant information across documents, wikis, Slack, email, and more

### Commands
- `/glean-search:search <query>` - Quick search with formatted results

## Example Usage

```bash
# Quick searches
/glean-search:search quarterly planning 2024
/glean-search:search API documentation updated:past_week
/glean-search:search owner:"Jane Doe" project roadmap

# The enterprise-searcher agent is automatically triggered for complex searches
"Find all documents about the authentication migration"
```

## Search Tips

Use filters to narrow results:
- `owner:"John Smith"` - Documents created by a person
- `updated:past_week` - Recently updated documents
- `app:confluence` - Documents from a specific app
- `after:2024-01-01` - Documents after a date

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
