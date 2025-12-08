---
name: Glean Search Optimization
description: This skill should be used when the user asks to "search for documents", "find files", "look up information", "search Glean", mentions search filters like "owner:", "updated:", "after:", "from:", or needs guidance on Glean search query syntax, filter combinations, result interpretation, and search best practices for enterprise knowledge discovery.
version: 1.0.0
---

# Glean Search Optimization

This skill provides guidance for constructing effective Glean search queries to find documents, files, and information across the enterprise.

## Core Tools

- **search** - Document search with filters and snippets
- **read_document** - Retrieve full document content from URLs found in search results

## Search Query Construction

### Basic Strategy

1. Start with core keywords describing what you need
2. Add filters to narrow results based on context clues
3. Use date filters when recency matters
4. Combine multiple filters for precision

### Available Filters

**Person Filters:**
- `owner:"person name"` or `owner:me` - Document creator
- `from:"person name"` or `from:me` - Anyone who updated/commented

**Date Filters:**
- `updated:today` - Updated today
- `updated:yesterday` - Updated yesterday
- `updated:past_week` - Updated in the last 7 days
- `updated:past_month` - Updated in the last 30 days
- `after:YYYY-MM-DD` - Documents created after date (do not use future dates)
- `before:YYYY-MM-DD` - Documents created before date

**Source Filters:**
- `app:confluence` - Filter by application (confluence, github, drive, slack, etc.)
- `channel:"channel-name"` - Slack channel (only when explicitly requested)
- `type:pdf` - Document type (pdf, document, presentation, spreadsheet)

**Result Control:**
- `num_results:N` - Specify number of results to return

## Workflow Patterns

### Pattern 1: Lookup and Quote
Best for finding specific information to cite:
1. `search "[topic] updated:past_week"`
2. Review snippets, select most relevant result
3. `read_document` with the URL to get full content
4. Provide summary with exact quotes and source links

### Pattern 2: Person-Centric Search
Best when user mentions a specific person:
1. `search "owner:\"John Smith\" [topic]"`
2. Review documents created by that person
3. Combine with date filters: `owner:\"John Smith\" updated:past_month`

### Pattern 3: Iterative Refinement
Best for exploratory searches:
1. Start broad: `search "[general topic]"`
2. If too many results, add filters (date, owner, app)
3. If too few, remove constraints or try synonyms
4. Balance precision with recall

### Pattern 4: Multi-Source Investigation
Best for comprehensive research:
1. Search documents: `search "[topic] app:confluence"`
2. Search code: `code_search "[topic]"`
3. Search Slack: `search "[topic] app:slack"`
4. Synthesize findings across sources

## Best Practices

1. **Quote multi-word filter values**: `from:"John Smith"` not `from:John Smith`
2. **Use relative dates first**: `updated:past_week` before `after:2024-01-15`
3. **Combine strategically**: person + timeframe + source for precision
4. **Never use future dates**: `after:` cannot use dates later than today
5. **Read before quoting**: Always use `read_document` to get full context before citing

## Common Mistakes to Avoid

- Don't guess document content - always search and read
- Don't use `channel:` unless user specifically asks about a Slack channel
- Don't overwhelm with results - focus on the most relevant 3-5
- Don't forget to provide source links for citations

## Additional Resources

For detailed filter syntax and advanced examples, see:
- **`references/filter-syntax.md`** - Complete filter reference with edge cases
