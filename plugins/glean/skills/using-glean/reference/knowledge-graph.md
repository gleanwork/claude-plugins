# `knowledge_graph_query` + `knowledge_graph_schema` — entity & relationship queries

Glean's knowledge graph stores typed entities (Person, Project, Customer, Opportunity, …) and the predicates that link them (`worksOn`, `manager`, `activeContributor`, `name`, …). Use it for structured questions that document search can't answer well: "who works on X projects?", "what's the customer's tier?", "all projects where Y is an active contributor".

The two tools are paired:
- **`knowledge_graph_schema`** — list every entity type and every predicate available, with cardinality and reverse-traversal info
- **`knowledge_graph_query`** — run a structured query against the graph

## When to use

- Multi-hop questions: "Find the manager of everyone working on the auth project"
- Filtered enumerations: "All Customers whose tier is Enterprise"
- Reverse traversals: "All projects that list Alice as activeContributor"

**Don't** use for:
- Plain document search (`search`)
- People lookup by name where you don't need relationships (`employee_search`)
- Anything where free-text matching is the right primitive

## Schema-then-query pattern

The knowledge graph schema varies by Glean instance — the entity types and predicates an org exposes depend on configuration. **Always call `knowledge_graph_schema` before constructing a query** unless you've already retrieved the schema in this session.

```
1. knowledge_graph_schema()
   -> { types: [{ name: "Person", predicates: [...] }, ...] }
2. knowledge_graph_query({
     start: { types: ["Person"], filters: [...] },
     traverse: [{ predicate: "worksOn" }],
     render: { include: ["name"] }
   })
```

## Query shape

`knowledge_graph_query` takes a JSON object with three top-level keys:

| Key | Required | Purpose |
|---|---|---|
| `start` | yes | Where to begin: by IDs, by free-text query, or by type with filters |
| `traverse` | no | Steps along predicates from the start nodes |
| `render` | no | What to return per result (predicates to include, sort/limit, extensions) |

### `start` variants

```json
{ "ids": ["kgid:abc", "kgid:xyz"] }
{ "query": "Alice", "predicates": ["name", "alias"], "limit": 5 }
{ "types": ["Person"], "filters": [{"predicate": "manager", "condition": "EXISTS"}] }
```

### `traverse` clause

```json
{ "predicate": "worksOn", "reverse": false, "limit": 10 }
```

`reverse: true` follows the predicate backwards — e.g., from a Project, `reverse: true` on `worksOn` lists the people working on it.

### `render` clause

```json
{ "include": ["name", "type"], "sortPredicate": "name", "limit": 25 }
```

## Examples

Find Alice and the projects she works on:
```
knowledge_graph_query({
  start: { query: "Alice Chen", predicates: ["name"], limit: 1 },
  traverse: [{ predicate: "worksOn" }],
  render: { include: ["name", "description"] }
})
```

All people who report to a given manager (by ID):
```
knowledge_graph_query({
  start: { ids: ["kgid:manager-id"] },
  traverse: [{ predicate: "manager", reverse: true }],
  render: { include: ["name"], limit: 50 }
})
```

## Pitfalls

- **Predicate names are schema-specific.** Don't guess `worksOn` vs `works_on` vs `assignedTo` — pull the schema and use what's there.
- **Reverse traversal direction.** A predicate `manager` on Person points *to* the manager. To list reports, you `reverse: true` on `manager` from a manager node.
- **Filter syntax has structure.** Each filter is `{ predicate, condition, comparison? }`. `condition` is one of `EXISTS`, `NOT_EXISTS`, `ANY`, `ALL`. Don't try to write SQL-style `WHERE`.
- **Empty results are common** when an org has the type but the calling user lacks visibility into specific entities.

## Typical follow-up

After identifying entities of interest, use `read_document` (if the entity has documents) or `employee_search` (for people) to fetch fuller context.
