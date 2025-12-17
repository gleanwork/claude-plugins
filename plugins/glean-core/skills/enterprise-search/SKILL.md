---
name: enterprise-search
description: Use when the user asks about company documents, internal wikis, policies, specifications, design docs, RFCs, or enterprise knowledge. Triggers on phrases like "find the doc about", "what's our policy on", "where is the spec for", "company guidelines", "internal documentation", or when searching for information that would be in enterprise systems rather than the local codebase.
---

# Enterprise Search via Glean

When users ask about internal company information that lives in enterprise systems (not the local codebase), use Glean tools to find it.

## Tool Naming

See the `glean-tools-guide` skill for Glean MCP tool naming conventions. Tools follow the pattern `mcp__glean_[server-name]__[tool]` where the server name is dynamic. Use whatever Glean server is available in your tool list.

## When This Applies

Use Glean search when users ask about:
- Company policies, guidelines, or procedures
- Design documents, RFCs, or specifications
- Internal wikis or knowledge base articles
- Project documentation or roadmaps
- Slack discussions or announcements
- Any "where is the doc about X" questions

## Tool Selection

| User Intent | Glean Tool |
|-------------|------------|
| Find documents, policies, specs | `search` |
| Complex analysis across sources | `chat` |
| Read full document content | `read_document` |

## Query Optimization

Glean understands natural language. Enhance queries with filters when helpful:

```
# Recent documents
"API documentation updated:past_week"

# By author
"design doc owner:\"Sarah Chen\""

# Date range
"quarterly planning after:2024-01-01"

# Specific app
"authentication RFC app:confluence"
```

## Workflow

1. **Search first**: Use `search` to find relevant documents
2. **Read for details**: Use `read_document` with URLs from search results
3. **Synthesize if complex**: Use `chat` for multi-source analysis

## Always Include Sources

When presenting information from Glean, always include:
- Document title and URL
- Last updated date (if available)
- Author (if relevant)

This allows users to verify and explore further.

## Relationship to Commands

For comprehensive, structured workflows, suggest the relevant slash command:
- `/glean-search:search <query>` - Quick search with formatted results
- `/glean-docs:verify-rfc` - Compare spec to implementation
- `/glean-meetings:catch-up` - Systematic catch-up after time away
