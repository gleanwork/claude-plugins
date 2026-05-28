# `memory` + `memory_schema` — the user's long-term work memory

Glean Memory stores per-user context: writing style, role, active projects, explicit notes the user saved, recent topics. Use it to personalize responses and to recall facts the user established in earlier sessions.

The two tools are paired:
- **`memory_schema`** — discover what categories exist and what fields each carries (call first if unsure)
- **`memory`** — read entries from one or more categories

## When to use

- "What am I working on?" / "What are my active projects?" — pull `ActiveProjects`
- Drafting in the user's voice — pull `WritingStyle`
- "What's my role?" / "What do I work on?" — pull `RolesAndResponsibilities`
- The user references something from earlier sessions ("the X project", "what I told you about Y")
- Personalizing any answer where the user's identity / context matters

**Don't** use for:
- Other people's memory (memory is calling-user only)
- General company knowledge (use `search` / `chat`)
- Real-time activity (use `user_activity`)

## Schema-then-read pattern

Memory categories are an enum; field shapes per category are also enumerated. Don't guess.

```
1. memory_schema()                              -> list of categories
2. memory_schema(category="ActiveProjects")     -> field schema for that category
3. memory(action="read", category="ActiveProjects", query="…")
```

For routine reads of well-known categories, you can skip step 2 — but always run step 1 if you're unfamiliar with what's available.

## Categories (the standard set)

`WritingStyle`, `RolesAndResponsibilities`, `ActiveProjects`, `ExplicitMemories`, `RecentTopics`, `CommunicationPreferences`, `KnowledgeLevelMap`, `Preferences`, `GoalsAndPriorities`, `IdentityAndNarrative`, `ConstraintsAndGuardrails`, `DecisionHeuristics`, `WorkingStyle`, `DomainContext`, `RelationshipContext`, `CommitmentsAndResponsibilities`, `ContextualState`, `Miscellaneous`, `NativeMemories`.

## Parameters (read action)

| Parameter | Type | Notes |
|---|---|---|
| `action` | enum | `"read"` for retrieval. |
| `category` | enum | Omit to read across categories. |
| `query` | string | Optional semantic search within the category. |
| `read_filters` | map | Field equality filters (use `memory_schema` to discover filterable fields). |
| `memory_source` | enum | Optional source filter: `GleanAssistant`, `ClaudeCode`, `Cursor`, etc. |
| `limit` | number | Default 10. |

## Examples (read)

```
memory(action="read", category="ActiveProjects")
memory(action="read", category="WritingStyle", limit=3)
memory(action="read", query="auth migration", limit=5)
memory(action="read", category="ExplicitMemories", read_filters={"topic":"deployment"})
```

## Writing memories (only when writes are enabled)

Write access varies by Glean instance and integration. To check: call `memory_schema` and look for categories where `writable: true`. If no categories are writable, the tool only supports `action: "read"` — skip this section entirely.

When writes **are** enabled, `memory` also supports `action: "add" | "update" | "delete"`.

### When to write

Write a memory when a durable, non-obvious fact surfaces that would help a future session resume cleanly:
- Decisions made and their rationale
- User-stated preferences, goals, or constraints
- Project context that isn't derivable from code or docs
- Correction patterns (the user told you to do X differently)

Do not write ephemeral state, raw transcripts, or anything derivable from source-of-truth systems.

### Write parameters

| Parameter | Type | Notes |
|---|---|---|
| `action` | enum | `"add"`, `"update"`, or `"delete"`. |
| `memory_source` | enum | Required for writes. Use the source matching your client (e.g., `ClaudeCode`, `Cursor`). |
| `category` | enum | Must be a writable category per `memory_schema`. |
| `content` | string | Plain text (not JSON array). Keep concise — a durable nugget, not a transcript. |
| `memory_id` | string | Required for `"update"` and `"delete"`. Obtained from a prior read. |
| `options` | map | Key-value pairs for writable schema fields (e.g., `{"project_name": "scio"}`). |

### Write examples

```
memory(action="add", memory_source="ClaudeCode", category="DomainContext", content="KG reconciliation uses clear_previous_edges_from_same_source=true merge policy")
memory(action="update", memory_source="ClaudeCode", category="ContextualState", memory_id="abc123", content="Migration to new auth middleware — phase 2 complete, phase 3 starts next sprint")
memory(action="delete", memory_source="ClaudeCode", category="ContextualState", memory_id="abc123")
```

### Category selection for writes

Be capability-driven: pick the category whose `memory_schema` description best matches your content. Don't hardcode category names — they may differ across instances. Use `memory_schema` to find the writable category with the right semantics (e.g., a category with a filterable `project_name` field for project-scoped state).

### Storage limits

Each writable category has a `max_entries` and `eviction` policy (typically `evict_oldest` with 10 slots). Write high-value nuggets; don't fill slots with low-signal entries that push out important ones.

## Pitfalls

- **Memory can be stale.** A `WorkingStyle` entry from a year ago may no longer reflect the user. Treat as context, not ground truth, for facts that change.
- **Categories vary by Glean instance.** The standard set above is the maximum; some categories may be empty or absent. `memory_schema` tells you what's actually available.
- **Empty results are normal.** A new user's memory is sparse. Don't probe repeatedly — fall back to asking the user.
- **Writes may not be available.** Always check `memory_schema` for writability before attempting writes. If the tool only exposes `action: "read"`, do not attempt add/update/delete.

## Typical follow-up

For status reports / weekly summaries, pair `memory` (what the user *says* they work on) with `user_activity` ([user-activity.md](user-activity.md), what they actually touched) and surface any drift.
