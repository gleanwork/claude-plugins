# `employee_search` — people, roles, and org structure

Find people in the user's organization: names, teams, roles, reporting lines, hire dates. Backed by the org directory rather than document index — answers people questions that document `search` cannot.

## When to use

- "Who is X?" — direct name lookup
- "Who works on Y?" — role / team queries
- "Who reports to Z?" — direct-report navigation
- "Find a manager / engineer / designer in the X team" — role-typed searches
- "Who are recent hires?" — date-bounded directory queries

**Don't** use for:
- Document authorship (use `search` with `owner:` filter)
- Code authorship (use `code_search` with `owner:` filter)
- "Who knows about X?" expertise — combine multiple signals; see [synthesis.md](synthesis.md)

## Parameters

| Parameter | Type | Notes |
|---|---|---|
| `query` | string (required) | Name, team, or role plus inline filters (see below). |

## Inline filters

| Filter | Example | Meaning |
|---|---|---|
| `reportsto:"name"` | `reportsto:"Jane Doe"` | Find direct reports OF this manager. NOT for finding who someone reports to. |
| `roletype:` | `roletype:"manager"` | `"individual contributor"` or `"manager"` |
| `startafter:` | `startafter:2024-01-01` | Hire date filter (YYYY-MM-DD) |
| `startbefore:` | `startbefore:2024-12-31` | Hire date filter |
| `sortby:` | `sortby:hire_date_descending` | `hire_date_ascending`, `hire_date_descending`, `most_reports` |

## Examples

```
employee_search(query="Jane Doe")
employee_search(query="payments team backend engineer")
employee_search(query="reportsto:\"VP Engineering\"")
employee_search(query="roletype:\"manager\" startafter:2025-01-01")
employee_search(query="data scientist sortby:hire_date_descending")
```

## Pitfalls

- **`reportsto:` direction.** It returns the *reports*, not the manager. To find someone's manager, search for the person and read the `manager` field on the result.
- **Quoting matters** for multi-word names and roles.
- **Empty results may mean no access.** Glean respects directory permissions; report empty cleanly rather than retrying with looser filters.
- **Don't use document `search` for people.** It searches docs, not the directory — confusing keyword matches will mislead you.

## Typical follow-up

For "who actually knows about X" rather than "who has the title", combine `employee_search` with `code_search` (code authorship) and `search` with `owner:` (doc authorship). See [synthesis.md](synthesis.md).
