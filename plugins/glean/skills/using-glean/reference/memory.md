# `read_memory` + `memory_schema` — the user's long-term work memory

Glean Memory stores per-user context: writing style, role, active projects, explicit notes the user saved, recent topics. Use it to personalize responses and to recall facts the user established in earlier sessions.

The two tools are paired:
- **`memory_schema`** — discover what categories exist and what fields each carries (call first if unsure)
- **`read_memory`** — read entries from one or more categories

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
3. read_memory(action="read", category="ActiveProjects", query="…")
```

For routine reads of well-known categories, you can skip step 2 — but always run step 1 if you're unfamiliar with what's available.

## Categories (the standard set)

`WritingStyle`, `RolesAndResponsibilities`, `ActiveProjects`, `ExplicitMemories`, `RecentTopics`, `CommunicationPreferences`, `KnowledgeLevelMap`, `Preferences`, `GoalsAndPriorities`, `IdentityAndNarrative`, `ConstraintsAndGuardrails`, `DecisionHeuristics`, `WorkingStyle`, `DomainContext`, `RelationshipContext`, `CommitmentsAndResponsibilities`, `ContextualState`, `Miscellaneous`, `NativeMemories`.

If your client has write access (varies by Glean instance and integration), `read_memory` also supports `action: "add" | "update" | "delete"`. Default is `"read"`.

## Parameters (read action)

| Parameter | Type | Notes |
|---|---|---|
| `action` | enum | `"read"` for retrieval. |
| `category` | enum | Omit to read across categories. |
| `query` | string | Optional semantic search within the category. |
| `read_filters` | map | Field equality filters (use `memory_schema` to discover filterable fields). |
| `memory_source` | enum | Optional source filter: `GleanAssistant`, `ClaudeCode`, `Cursor`, etc. |
| `limit` | number | Default 10. |

## Examples

```
read_memory(action="read", category="ActiveProjects")
read_memory(action="read", category="WritingStyle", limit=3)
read_memory(action="read", query="auth migration", limit=5)
read_memory(action="read", category="ExplicitMemories", read_filters={"topic":"deployment"})
```

## Pitfalls

- **Memory can be stale.** A `WorkingStyle` entry from a year ago may no longer reflect the user. Treat as context, not ground truth, for facts that change.
- **Categories vary by Glean instance.** The standard set above is the maximum; some categories may be empty or absent. `memory_schema` tells you what's actually available.
- **Empty results are normal.** A new user's memory is sparse. Don't probe repeatedly — fall back to asking the user.

## Typical follow-up

For status reports / weekly summaries, pair `read_memory` (what the user *says* they work on) with `user_activity` ([user-activity.md](user-activity.md), what they actually touched) and surface any drift.
