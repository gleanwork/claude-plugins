---
name: dev-docs-guide
description: Search the public Glean developer documentation for API, SDK, MCP, authentication, indexing, and integration details. Use when the user is building with Glean rather than searching internal company knowledge — trigger phrases include Glean API, Glean SDK, integrate with Glean, indexing API, Glean Python or JavaScript SDK, and how to authenticate with Glean. Don't use it for internal company knowledge, which the using-glean skill covers.
---

# Glean Developer Documentation Guide

When users ask about developing with Glean, use the Glean Developer Docs MCP tools.

## Tools

This skill uses two tools (refer to them by their bare names):

- `docs_search` — search across the public Glean developer documentation
- `docs_fetch` — get the full content of a documentation page by URL

If these tools aren't visible in the active inventory, the user hasn't configured the Glean Dev Docs MCP server for this host — point them at their host's Glean Dev Docs MCP setup.

## When to use

- **Glean API** — endpoints, authentication, rate limits
- **SDK usage** — Python, JavaScript installation and examples
- **MCP integration** — server configuration, tool capabilities
- **Platform concepts** — indexing, search configuration, connectors

## Tool selection

| Need | Tool | Example |
|---|---|---|
| Find relevant docs | `docs_search` | `docs_search "API authentication"` |
| Get implementation details | `docs_fetch` | `docs_fetch "https://developers.glean.com/docs/api/auth"` |

## Workflow

1. **Search first**: `docs_search "user query terms"`
2. **Review results**: identify the most relevant pages
3. **Fetch for details**: `docs_fetch "[url]"` for code examples
4. **Cite sources**: always include documentation URLs

## Query tips

Good: `"OAuth token refresh"`, `"Python SDK search API"`
Less effective: `"authentication"`, `"API"`, `"how to use"`

## Differentiating from enterprise Glean

This skill is for **public developer documentation**:
- How to build with Glean APIs / SDKs
- MCP configuration guides

For **internal company data** (Slack, email, internal docs), use the `using-glean` skill instead.
