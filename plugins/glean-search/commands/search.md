---
description: Quick search across Glean enterprise knowledge
argument-hint: <search query>
---

# Quick Glean Search

Perform a quick search across Glean enterprise knowledge.

**Search query:** $ARGUMENTS

## Process

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

## Tips for Better Searches

Remind users they can use filters directly in their query:
- `owner:"John Smith"` - Documents created by a person
- `updated:past_week` - Recently updated documents
- `app:confluence` - Documents from a specific app
- `after:2024-01-01` - Documents after a date

## Example Usage

```
/glean:search quarterly planning 2024
/glean:search owner:"Jane Doe" project roadmap
/glean:search updated:past_week API documentation
```
