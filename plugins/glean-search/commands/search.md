---
description: Quick search across Glean enterprise knowledge
argument-hint: <search query>
allowed-tools: [AskUserQuestion]
---

# Quick Glean Search

Perform a quick search across Glean enterprise knowledge.

## Input

**Query:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

## Search Process

### 1. Execute Search

Use the Glean search tool with the provided query:
- Search for: `$ARGUMENTS`
- Return the most relevant results

### 2. Present Results

For each result, show:
- **Title** (as a clickable link if URL available)
- **Source** (app/datasource)
- **Snippet** (relevant excerpt)
- **Last updated** (if available)

### 3. Offer Follow-up Actions

After showing results, use `AskUserQuestion` to offer next steps:
- "What would you like to do next?" (Options: Read a document, Refine search, Search related topic, Done)

If refining, ask about filters:
- "How would you like to refine?" (Options: By date, By owner, By app/source, Different keywords)

---

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing `mcp__glean` tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### No Results Found
If search returns no results:
- Suggest alternative keywords or phrasings
- Try removing specific terms that might be too narrow
- Check if this might be in a restricted system

### Too Many Results
If too many results appear:
- Suggest adding filters (owner, date range, app)
- Ask user to provide more specific terms
- Sort by recency if looking for latest information
