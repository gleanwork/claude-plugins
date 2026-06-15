# `search` — document discovery

Search documents across all the user's Glean-indexed sources (Confluence, Google Drive, GitHub, Slack, Jira, Notion, …). This is the workhorse tool for *"find the doc about X"* questions.

## When to use

- Documents, wikis, policies, RFCs, specs, design docs, runbooks
- Slack threads, announcements, public messages
- Any "where is the doc about …" question
- Starting point before reading individual documents with `read_document`

**Don't** use `search` for people (use `employee_search`), code (`code_search`), email (`gmail_search` / `outlook_search`), or meetings (`meeting_lookup`).

## Parameter shape

`search` uses **structured parameters** — pass each filter as its own argument, not embedded in the query string.

| Parameter | Type | Notes |
|---|---|---|
| `query` | string (required) | Keywords to match. Short, discriminative, no boolean operators. |
| `app` | enum | One source app (`confluence`, `gdrive`, `github`, `slack`, `jira`, `notion`, `gong`, `salescloud`, `gmail`, `o365sharepoint`, …). |
| `type` | enum | Document type: `pull`, `spreadsheet`, `slides`, `email`, `direct message`, `folder`. |
| `owner` | string | Document creator. Accepts a name, `me`, or `myteam`. |
| `from` | string | Person who created, updated, or commented on the doc. Same value space as `owner`. |
| `channel` | string | Slack channel name (only meaningful with `app: slack`). |
| `updated` | string | Relative window: `today`, `yesterday`, `past_week`, `past_2_weeks`, `past_month`, or a month name. |
| `after` | string | `YYYY-MM-DD`. Documents updated strictly after this date. No future dates. |
| `before` | string | `YYYY-MM-DD`. Documents updated strictly before this date. |
| `sort_by_recency` | boolean | Newest first instead of by relevance. Use only when the user explicitly asks for the *latest* or *most recent*. |
| `exhaustive` | boolean | Return all matches. Use only when the user asks for "all", "each", or "every". |
| `num_results` | integer | Default is small. Pass up to 500 only when the user wants a comprehensive list. |
| `dynamic_search_result_filters` | string | After a first search, refine using `key:value` filters drawn from the result metadata (e.g., `brand:Apple|screen_size:14-inch`). Never invent values. |
| `cursor` | string | Pagination cursor from a previous response. |

## Query style

- **Short, discriminative keywords.** "auth RFC" beats "documentation about how authentication works at our company".
- **No boolean logic.** `AND`/`OR` is ignored; using them adds noise.
- **No quotes** unless the user is asking for a verbatim phrase.
- **Iterate, don't query-stuff.** If results are wrong, run another search with a tighter term — adding synonyms to one query rarely helps.

## Examples

```
search(query="authentication RFC", app="confluence", updated="past_month")
search(query="payment retry policy", owner="me")
search(query="design doc onboarding", from="Sarah Chen", after="2025-09-01")
search(query="incident runbook", app="confluence", sort_by_recency=true)
search(query="quarterly planning", updated="past_2_weeks", exhaustive=true)
```

## Pitfalls

- **`after:` with a future date returns nothing.** The API silently drops the filter.
- **`updated` keywords vs. `after` / `before` dates.** Use `updated` for relative windows; use `after`/`before` for ISO date ranges. Don't combine both unless the dates are inside the relative window.
- **`sort_by_recency=true` overrides relevance.** A high-relevance match from last quarter will rank below a low-relevance match from yesterday. Only enable it when the user actually wants newest-first ordering.
- **Empty results don't always mean "doesn't exist".** With Glean, empty often means *the calling user doesn't have access* to anything matching. Report cleanly rather than retrying with looser filters that might leak a partial answer from a different scope.
- **`num_results` defaults are small.** If the user said "all" or "every", pass `exhaustive=true` and a large `num_results` together.

## Typical follow-up

After `search` returns candidates, fetch full content with `read_document` (see [read-document.md](read-document.md)) for the URLs you need to quote or analyze. For multi-source synthesis, see [synthesis.md](synthesis.md). Before presenting, apply [vetting.md](vetting.md).

## Cross-tool filter style reference

Different Glean tools accept filters in different places. This matters: putting an inline filter in `search`'s `query` string won't work; putting a structured parameter in a code_search query string will silently fail.

| Tool | Filter style | Example |
|------|-------------|---------|
| `search` | Structured parameters (separate args) | `search(query="auth RFC", app="confluence", updated="past_month")` |
| `code_search` | Inline in query string | `code_search("auth handler owner:me updated:past_week")` |
| `employee_search` | Inline in query string | `employee_search("reportsto:\"VP Engineering\"")` |
| `gmail_search` | Inline in query string | `gmail_search("from:\"alice@co.com\" is:unread")` |
| `meeting_lookup` | Structured `before` / `after` params + inline for `participants` / `topic` | `meeting_lookup(query="standup", after="2025-10-07", before="2025-10-09")` |
| `user_activity` | Structured `start_date` / `end_date` params | `user_activity(start_date="2025-10-01", end_date="2025-10-08")` |

When in doubt: `search` is structural; everything else is inline.
