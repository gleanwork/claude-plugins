---
name: dev-docs-guide
description: Use when the user asks about Glean APIs, SDKs, developer integration, MCP configuration, indexing, authentication, or Glean platform development. Triggers on "Glean API", "Glean SDK", "integrate with Glean", "Glean MCP", "Glean authentication", "indexing API", "Glean developer docs", "Glean REST API", or building integrations with Glean.
---

# Glean Developer Documentation Guide

When users ask about developing with Glean, use the Glean Developer Docs MCP tools.

## Tool Naming

Tools follow the pattern: `mcp__glean_dev_docs__[tool]`
- `docs_search` - Search across documentation
- `docs_fetch` - Get full page content

If tools unavailable, suggest running `/glean-dev-docs:setup`.

## When to Use

- **Glean API** - endpoints, authentication, rate limits
- **SDK usage** - Python, JavaScript installation and examples
- **MCP integration** - server configuration, tool capabilities
- **Platform concepts** - indexing, search configuration, connectors

## Tool Selection

| Need | Tool | Example |
|------|------|---------|
| Find relevant docs | `docs_search` | `docs_search "API authentication"` |
| Get implementation details | `docs_fetch` | `docs_fetch "https://developers.glean.com/docs/api/auth"` |

## Workflow

1. **Search first**: `docs_search "user query terms"`
2. **Review results**: Identify most relevant pages
3. **Fetch for details**: `docs_fetch "[url]"` for code examples
4. **Cite sources**: Always include documentation URLs

## Query Tips

Good: `"OAuth token refresh"`, `"Python SDK search API"`
Less effective: `"authentication"`, `"API"`, `"how to use"`

## Differentiating from Enterprise Glean

This skill is for **public developer documentation**:
- How to build with Glean APIs/SDKs
- MCP configuration guides

For **internal company data** (Slack, email, internal docs), guide to glean-core plugins instead.
