---
description: Set up the Glean Developer Docs MCP server
allowed-tools: [Bash]
---

# Glean Developer Docs Setup

Connect Claude to Glean's public developer documentation.

## Setup

Run this command:

```bash
claude mcp add glean-dev-docs https://developers.glean.com/mcp --transport http --scope user
```

## After Setup

1. Restart Claude Code to activate the server
2. No authentication required (public documentation)
3. Try: "How do I authenticate with the Glean API?"

## Available Tools

- `docs_search` - Search documentation with relevance ranking
- `docs_fetch` - Retrieve full page content as markdown
