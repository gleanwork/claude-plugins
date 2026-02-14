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

## BE SKEPTICAL

Not every search result is relevant or current. Before presenting results, evaluate:

**Relevance Test**
- Does this actually answer the question, or just contain keywords?
- ✅ INCLUDE: Directly addresses the query
- ❌ EXCLUDE: Keyword coincidence, different context

**Freshness Test**
- Is this information current?
- ✅ CURRENT: Updated in past 6 months
- ⚠️ AGING: 6-12 months - note the age
- ❌ STALE: 12+ months - include only with strong warning, or exclude

**Authority Test**
- How reliable is this source?
- 📗 OFFICIAL: Approved policies, signed-off specs
- 📙 SEMI-OFFICIAL: Team wikis, shared docs
- 📕 INFORMAL: Slack discussions, personal notes

**Filter Out**:
- Superseded or deprecated documents
- Draft documents presented as final
- Keyword matches in unrelated contexts

**See `confidence-signals` skill** for how to communicate reliability.

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
2. **Vet results**: Apply vetting criteria before presenting
3. **Read for details**: Use `read_document` with URLs from vetted results
4. **Synthesize if complex**: Use `chat` for multi-source analysis

## Always Include Quality Signals

When presenting information from Glean, always include:
- Document title and URL
- Last updated date (with freshness indicator: ✅/<6mo, ⚠️ 6-12mo, ❌ >12mo)
- Author (if relevant)
- Confidence level (see `confidence-signals` skill)

This allows users to assess reliability and explore further.

## If Nothing Relevant Found

Don't pad with weak results:

```markdown
No relevant results found for [query].

**What was searched:**
- [Search terms used]

**Suggestions:**
- Try alternative terms: [suggestions]
- Ask in [relevant channel]
- This may not be documented
```

## Relationship to Commands

For comprehensive, structured workflows, suggest the relevant slash command:
- `/glean-search:search <query>` - Quick search with formatted results
- `/glean-docs:verify-rfc` - Compare spec to implementation
- `/glean-meetings:catch-up` - Systematic catch-up after time away
