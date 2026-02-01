---
description: Quick search across Glean enterprise knowledge
argument-hint: <search query>
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

After showing results, offer to:
- Read the full content of a specific document
- Refine the search with filters (owner, date, app)
- Search for related topics
