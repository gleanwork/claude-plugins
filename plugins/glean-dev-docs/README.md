# Glean Developer Docs

Access Glean's developer documentation from Claude Code.

## Setup

```bash
/glean-dev-docs:setup
```

## Usage

Once configured, ask naturally about Glean development:
- "How do I authenticate with the Glean API?"
- "Show me Python SDK examples for search"
- "What MCP tools does Glean provide?"

The skill auto-triggers and uses `docs_search` + `docs_fetch` to find answers.

## MCP Server

- **URL**: https://developers.glean.com/mcp
- **Transport**: HTTP
- **Auth**: None (public docs)

## vs Other Glean Plugins

| Plugin | Purpose | Requires |
|--------|---------|----------|
| **glean-dev-docs** | Public developer documentation | None |
| glean-core | Enterprise knowledge | Glean account |
