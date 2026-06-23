---
name: search
description: Search Glean enterprise knowledge - use for find the doc about, search for, where is, look up, search company knowledge, search Glean for; returns vetted results with freshness and authority indicators. For broader enterprise queries needing synthesis across multiple tools, prefer the using-glean skill instead.
---

# Structured Glean Search

Perform a structured search across Glean enterprise knowledge and return vetted, quality-assessed results.

## Core Principles

- **Relevance over completeness**: Show the best results, not all results
- **Be skeptical**: Not every keyword match is relevant
- **Context matters**: Include enough info to assess relevance

## Search Process

### 1. Identify the Query

Determine the search topic from the user's request or current conversation context. If no query is apparent, ask the user what they want to search for before proceeding.

### 2. Execute Search

Use the Glean search tool with the user's query. Return the most relevant results.

### 3. Assess Results

For each result, evaluate:

**Relevance**:
- ✅ RELEVANT: Actually about the query topic
- ❌ SKIP: Keyword coincidence, different context

**Currency**:
- ✅ CURRENT: Recent update
- ⚠️ OLD: May be outdated

Only show results that pass the relevance check. If old, note it.

### 4. Present Vetted Results

For each included result:
- **Title** (as a clickable link if URL available)
- **Source** (app/datasource)
- **Last updated** (with freshness indicator: ✅ <6mo, ⚠️ 6-12mo, ❌ >12mo)
- **Snippet** (relevant excerpt)
- **Relevance note** (why this matches)

### 5. Note Quality

After results, include:
- How many results were found vs. shown
- Any concerns about result quality
- Suggestions if results seem limited

### 6. Offer Follow-up Actions

After showing results, offer these follow-up actions:
- Read a document in full
- Refine the search with filters (by date, owner, app/source, or different keywords)
- Search a related topic

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

## Troubleshooting

### Glean MCP Not Connected
If you see errors about missing Glean MCP tools:
- See your host's Glean MCP setup documentation to configure a connection

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
