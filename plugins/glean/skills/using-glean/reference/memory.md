# `memory` + `memory_schema` — the user's long-term work memory

Glean Memory stores per-user context: writing style, role, active projects, explicit notes the user saved, recent topics. Use it to personalize responses and to recall facts the user established in earlier sessions.

The two tools are paired:
- **`memory_schema`** — discover sources, categories, field schemas, storage limits, and which categories are writable for your client (call first if unsure)
- **`memory`** — read entries, and (when the instance has write access enabled) add, update, or delete them

> Some clients expose these under a prefixed name (e.g. `glean_memory`); the argument shapes are identical.

## When to use

- "What am I working on?" / "What are my active projects?" — pull `ActiveProjects`
- Drafting in the user's voice — pull `WritingStyle`
- "What's my role?" / "What do I work on?" — pull `RolesAndResponsibilities`
- The user references something from earlier sessions ("the X project", "what I told you about Y")
- Personalizing any answer where the user's identity / context matters
- The user states a durable preference, rule, or fact worth persisting — write it (`action="add"`)

**Don't** use for:
- Other people's memory (memory is calling-user only)
- General company knowledge (use `search` / `chat`)
- Real-time activity (use `user_activity`)

## Schema-then-act pattern

Memory categories are an enum; field shapes per category are also enumerated. Don't guess.

```
1. memory_schema()                              -> sources, categories, writable flags
2. memory_schema(category="ActiveProjects")     -> field schema, storage limits for that category
3. memory(action="read", category="ActiveProjects", query="…")
4. memory(action="add", memory_source="…", category="…", content="…")   # if writes enabled
```

For routine reads of well-known categories, you can skip step 2 — but always run step 1 if you're unfamiliar with what's available, and before your first write.

`memory_schema` with no arguments returns every source with its categories; each category carries a `writable` flag, its field schema (name, type, required, filterable), whether semantic search is enabled, and its storage policy (`max_entries`, `eviction`). With `category="…"` it returns the detailed schema for that category across sources.

## Sources

Memory entries are partitioned by **source** — which integration wrote them:

- `GleanAssistant` — Glean's own memory (profile, writing style, explicit memories). **Read-only via MCP.**
- Per-tool sources: `ClaudeCode`, `Cursor`, `CursorAgent`, `Codex`, `ChatGPT`, `ClaudeDesktop`, `Copilot`, `VSCode` — writable by the matching client.
- `Shared` — fallback for clients without a dedicated source. When writing here, identify your client via `options={"proposed_memory_source": "YourClient"}`.

For **reads**, omit `memory_source` to read across all sources. For **writes**, `memory_source` is required; use your client's source, or `Shared` if it isn't listed.

## Categories (the standard set)

`WritingStyle`, `RolesAndResponsibilities`, `ActiveProjects`, `ExplicitMemories`, `RecentTopics`, `CommunicationPreferences`, `KnowledgeLevelMap`, `Preferences`, `GoalsAndPriorities`, `IdentityAndNarrative`, `ConstraintsAndGuardrails`, `DecisionHeuristics`, `WorkingStyle`, `DomainContext`, `RelationshipContext`, `CommitmentsAndResponsibilities`, `ContextualState`, `Miscellaneous`, `NativeMemories`.

## Parameters

| Parameter | Type | Notes |
|---|---|---|
| `action` | enum | `"read"` (default), `"add"`, `"update"`, `"delete"`. Write actions only exist when the instance has memory writes enabled. |
| `memory_source` | enum | Required for writes. Optional source filter for reads (omit = all sources). |
| `category` | enum | Required for writes. Omit on reads to read across categories. |
| `content` | string | Required for `add`/`update`. Must be a plain string — not a JSON/TextContent array. |
| `memory_id` | string | Required for `update`/`delete`. Comes from a prior read/add response. |
| `options` | map | Write-time schema fields (e.g. `proposed_memory_source` for `Shared`, `proposed_category` for `Miscellaneous`, `project_name` for `NativeMemories`). |
| `query` | string | Reads only: semantic search within categories. |
| `read_filters` | map | Reads only: field equality filters (use `memory_schema` to discover filterable fields). |
| `limit` | number | Reads only. Default 10. |

## Examples

```
memory(action="read", category="ActiveProjects")
memory(action="read", category="WritingStyle", limit=3)
memory(action="read", query="auth migration", limit=5)
memory(action="read", category="ExplicitMemories", read_filters={"topic":"deployment"})

memory(action="add", memory_source="Shared", category="ConstraintsAndGuardrails",
       content="Never skip pre-commit hooks (--no-verify) in this repo",
       options={"proposed_memory_source": "MyClient"})
memory(action="update", memory_source="ClaudeCode", category="Preferences",
       memory_id="<id from read/add>", content="Prefers tabs over spaces")
memory(action="delete", memory_source="ClaudeCode", category="Preferences",
       memory_id="<id from read/add>")
```

## Verifying writes

A successful `add`/`update` returns the stored entry **including its `id`** (plus a quota summary like `used/max` for the category). **Treat a response without your new entry's `id` as a failed write.** If the response instead looks like a list of pre-existing memories, your arguments were likely misnamed and the call executed as a read (see pitfalls).

## Pitfalls

- **Argument names must match the schema exactly.** The action parameter is `action` — not `operation`. Older servers silently ignore unknown argument names and default to `action="read"`, so a misnamed write returns a successful-looking read result and **nothing is stored**. Newer servers reject unknown arguments with an error. Either way: confirm writes via the returned `id`.
- **Writes may be disabled.** Write access is per-Glean-instance. The `memory` tool description states whether writes are enabled; when disabled, only `action="read"` exists.
- **Storage limits + eviction.** Most writable categories cap at ~10 entries per source; when full, the oldest entry is silently evicted (`evict_oldest`). `NativeMemories` keeps 1 entry per `project_name`. Check `memory_schema` before bulk-writing.
- **You can only modify your own source's entries.** Entries written by other sources (or by `GleanAssistant`) can be read but not updated/deleted from your source.
- **Memory can be stale.** A `WorkingStyle` entry from a year ago may no longer reflect the user. Treat as context, not ground truth, for facts that change.
- **Categories vary by Glean instance.** The standard set above is the maximum; some categories may be empty, absent, or read-only. `memory_schema` tells you what's actually available.
- **Empty results are normal.** A new user's memory is sparse. Don't probe repeatedly — fall back to asking the user.

## Typical follow-up

For status reports / weekly summaries, pair `memory` (what the user *says* they work on) with `user_activity` ([user-activity.md](user-activity.md), what they actually touched) and surface any drift.
