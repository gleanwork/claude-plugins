---
name: using-glean
description: Use Glean MCP tools to answer questions about company documents, internal wikis, policies, RFCs, design docs, people, teams, meetings, decisions, action items, email, calendar events, internal code, and the user's own work activity. Reach for this whenever the answer lives in enterprise systems rather than the local codebase or public web. Trigger phrases include "find the doc about", "what's our policy on", "where is the spec for", "who works on", "who owns", "find someone who knows", "what was decided in the meeting", "action items from", "search my email", "what did I work on last week", and "find the implementation in our repos". Don't use it for questions answerable from the local working directory, the public web, or generic programming knowledge.
---

# Using Glean

The Glean MCP server exposes a family of tools that let the assistant query the user's company knowledge: documents, people, meetings, email, internal code, the user's activity feed, structured memory, and the knowledge graph. This skill is the entry point. It maps a user's question to the right tool, names the rules that apply across all of them, and links to per-tool reference files that carry the deep syntax.

## Where these tools live

The tools listed below come from the user's Glean MCP server connection. Refer to them by their bare names (`search`, `employee_search`, `meeting_lookup`, …) — the assistant resolves them against the active tool inventory.

In the raw MCP tool list, Glean tools appear as `mcp__glean_[server-name]__[tool]` where `[server-name]` is the user's configured server identifier (e.g., `default`, `production`, `acme`). The tool suffix after the final `__` is always consistent across deployments. Use whatever Glean server is visible in your tool inventory.

If no Glean tools are visible, the user hasn't configured a Glean MCP server for this host. Point them at the Glean MCP setup for their host.

## Intent → tool decision tree

| The user is asking about... | Reach for | Reference |
|---|---|---|
| Documents, wikis, policies, RFCs, specs | `search` | [search.md](reference/search.md) |
| A complex question that needs synthesis across sources | `chat` | [chat.md](reference/chat.md) |
| Internal source code, files, commits across repos | `code_search` | [code-search.md](reference/code-search.md) |
| People, teams, org structure, reporting lines | `employee_search` | [employee-search.md](reference/employee-search.md) |
| Meetings, transcripts, decisions, action items | `meeting_lookup` | [meeting-lookup.md](reference/meeting-lookup.md) |
| Gmail messages, threads, attachments | `gmail_search` | [gmail-search.md](reference/gmail-search.md) |
| Outlook messages, threads, attachments | `outlook_search` | [outlook-search.md](reference/outlook-search.md) |
| Reading a specific URL / document | `read_document` | [read-document.md](reference/read-document.md) |
| The user's own recent activity (standup, weekly summary) | `user_activity` | [user-activity.md](reference/user-activity.md) |
| The user's stored memories / personalization | `read_memory` (+ `memory_schema`) | [memory.md](reference/memory.md) |
| Structured entity / relationship queries | `knowledge_graph_query` (+ `knowledge_graph_schema`) | [knowledge-graph.md](reference/knowledge-graph.md) |

The reference files are loaded only when needed. Open the relevant one before invoking a tool you haven't used recently — each file carries the exact param shape, the filter syntax, and the pitfalls that have bitten previous calls.

## Cross-tool rules

These apply regardless of which Glean tool is active. Internalize them, don't re-derive per call.

1. **Never use `search` for people lookups.** It searches documents; it doesn't index people. Use `employee_search`.
2. **Cite every claim with a URL.** Glean returns links; surface them so the user can verify. No URL → likely fabricated.
3. **Permission-empty results are valid signals.** If a tool returns nothing, that often means the user lacks access — not that the information is missing. Don't pad with weak alternatives; report empty cleanly.
4. **Prefer recent over old.** Glean returns by relevance; for currency-sensitive questions, add a date filter or sort by recency rather than presenting stale top hits as authoritative.
5. **Vet before presenting.** Apply the criteria in [reference/vetting.md](reference/vetting.md) — relevance, freshness, authority. Better to return three vetted results than ten unfiltered ones.

## Cross-cutting reference

- **[synthesis.md](reference/synthesis.md)** — patterns for combining multiple Glean tools when a single tool doesn't answer the question.
- **[vetting.md](reference/vetting.md)** — how to evaluate source quality, freshness, and authority; when to communicate confidence to the user.

## Glean platform agents

If the user's Glean instance has platform agents enabled, those agents may surface as additional MCP tools alongside the built-in tools above. The set is org-specific and can change at any time. See [agents-as-tools.md](reference/agents-as-tools.md) for how to recognize, introspect, and invoke them.
