# `code_search` — internal code across repos

Search code across the user's organization's connected source repositories. Critically different from local `grep` / `glob`: those see only the current repo; `code_search` sees every repo Glean indexes.

## When to use

- "How do other teams handle X?" — finding implementation patterns across the org
- "Where does the code for Y live?" — locating a service whose repo you don't know
- "Who's been active in Z?" — combining `code_search` with author filters reveals owners
- Looking for prior art before designing something new

**Don't** use for:
- Code in the current working directory (use local search tools)
- External / open-source code (use a web search)
- Documentation about code (use `search` with `app:github` for READMEs / `app:confluence` for design docs)

## Parameters

| Parameter | Type | Notes |
|---|---|---|
| `query` | string (required) | Keywords + inline filters (see below). |
| `extension` | string | Filter by file extension without the leading dot: `py`, `ts`, `tsx`, `go`, `rb`, `java`, `proto`, etc. |
| `exhaustive` | boolean | Return all matches. Use only when the user asks for "all" or "every". |

## Inline filters

Unlike `search` (structured params), `code_search` filters live **inside the query string**:

| Filter | Example | Meaning |
|---|---|---|
| `owner:"name"` | `owner:"Jane Doe"` | Author of the file/commit |
| `from:"name"` | `from:me` | Updater (broader than owner) |
| `updated:` | `updated:past_week` | Relative window: `today`, `yesterday`, `past_week`, `past_month` |
| `after:` | `after:2025-09-01` | YYYY-MM-DD, exclusive |
| `before:` | `before:2025-12-01` | YYYY-MM-DD, exclusive |

Multi-word values must be quoted. `me` and `myteam` are valid sentinels for person filters.

## Examples

```
code_search(query="authentication middleware")
code_search(query="rate limit retry owner:\"Alice Chen\"")
code_search(query="payment processor after:2025-06-01", extension="ts")
code_search(query="websocket handler from:me updated:past_month")
code_search(query="circuit breaker pattern", extension="go")
```

## Pitfalls

- **Inline `app:` does not apply.** `code_search` is already scoped to code sources; using `app:` from `search` syntax has no effect.
- **Quoting matters.** `owner:"Jane Doe"` works; `owner:Jane Doe` parses only `Jane` as the value.
- **No boolean operators.** `OR` / `AND` are ignored. Run separate searches and combine results.
- **Stale or deprecated paths.** Code in `legacy/`, `old/`, `archive/` directories often shows up. Filter by recency or path keywords when freshness matters.

## Typical follow-up

After locating relevant files, read full content with `read_document` (Glean understands repo URLs). For multi-signal expertise discovery (code + docs + meetings), see [synthesis.md](synthesis.md).
