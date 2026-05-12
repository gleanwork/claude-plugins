---
description: Quick search across Glean enterprise knowledge
when_to_use: |
  Trigger phrases include "find the doc about", "search for", "where is", "look up", "search company knowledge", "search Glean for". Use when the user wants a fast, structured search of internal documents (not full Glean MCP exploration).

  For broader enterprise queries that may need synthesis or multiple tools, prefer the `using-glean` skill in glean-core.
argument-hint: <search query>
allowed-tools: [AskUserQuestion]
---

# Quick Glean Search

Perform a quick search across Glean enterprise knowledge.

## Input

**Query:** `$ARGUMENTS`

If the input is empty or literal "$ARGUMENTS", show brief usage with 2-3 examples, then stop. Otherwise continue.

---

## Core Principles

- **Relevance over completeness**: Show the best results, not all results
- **Be skeptical**: Not every keyword match is relevant
- **Context matters**: Include enough info to assess relevance

---

## Search Process

### 1. Execute Search

Use the Glean search tool with the provided query:
- Search for: `$ARGUMENTS`
- Return the most relevant results

### 2. Assess Results

For each result, quickly evaluate:

**Relevance**:
- ✅ RELEVANT: Actually about the query topic
- ❌ SKIP: Keyword coincidence, different context

**Currency**:
- ✅ CURRENT: Recent update
- ⚠️ OLD: May be outdated

Only show results that pass relevance check. If old, note it.

### 3. Present Vetted Results

For each included result, show:
- **Title** (as a clickable link if URL available)
- **Source** (app/datasource)
- **Last updated** (with freshness indicator: ✅ <6mo, ⚠️ 6-12mo, ❌ >12mo)
- **Snippet** (relevant excerpt)
- **Relevance note** (why this matches)

### 4. Note Quality

After results, include:
- How many results were found vs shown
- Any concerns about result quality
- Suggestions if results seem limited

### 5. Offer Follow-up Actions

After showing results, use `AskUserQuestion` to offer next steps:
- "What would you like to do next?" (Options: Read a document, Refine search, Search related topic, Done)

If refining, ask about filters:
- "How would you like to refine?" (Options: By date, By owner, By app/source, Different keywords)

---

## Example Output

```markdown
## Search Results: [query]

Found [X] results, showing top [Y] most relevant:

### 1. [Title] ✅
**Source**: Confluence | **Updated**: 2 weeks ago ✅
> [Relevant snippet...]

**Why relevant**: [Brief note on why this matches]

### 2. [Title] ⚠️
**Source**: Slack | **Updated**: 8 months ago ⚠️
> [Relevant snippet...]

**Why relevant**: [Note] | **Caveat**: May be outdated

---

**Quality note**: [X] results filtered out (keyword matches in different context)

**If these don't help**: Try [alternative search suggestion]
```

---

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing Glean MCP tools:
- Run `/glean-core:status` to check connection
- Run `/glean-core:mcp-setup` to configure

### No Results Found
If search returns no results:
- Suggest alternative keywords or phrasings
- Try removing specific terms that might be too narrow
- Check if this might be in a restricted system

### Too Many Results
If too many results appear:
- Apply stricter relevance filtering
- Suggest adding filters (owner, date range, app)
- Focus on most recent and most relevant
