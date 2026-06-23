# Cross-repo code exploration workflow

When the user wants to understand a system, pattern, or piece of code that may live anywhere across the org's repositories.

## When this applies

- Locating an unfamiliar system: "Where does the billing reconciliation code live?"
- Mapping breadth: "What repos touch the auth flow?"
- Finding examples: "How do other teams handle WebSocket reconnection?"
- Identifying people through their code activity: "Who's been active in payments lately?"

## Workflow

1. **Find the code.** Start with `code_search` on the most discriminative keyword. Iterate — if results are too broad, narrow with an `extension`, an `owner:` filter, or a date filter. If results are empty, broaden by removing terms (Glean's keyword matching is strict).

2. **Vet the matches.** Filter out:
   - Files in `legacy/`, `deprecated/`, `archive/`, `old/` paths
   - Repos with no commits in 12+ months (likely abandoned)
   - Files dense with `TODO` / `FIXME` / `HACK` comments
   - Generated code (e.g., `*.pb.go`, `*_pb2.py`) unless that's what was asked for

3. **Find related docs.** Search for design docs / RFCs / ADRs about the same system using the `search` tool. Code shows what's built; docs explain why.

4. **Find the people.** For real owners (not titled ones), combine `code_search` with `owner:` filters and `updated:past_month`. People with multiple recent commits are the active maintainers.

5. **Read full content** of the top 3–5 files with `read_document` for quoting / analyzing.

6. **Synthesize.** When the answer requires combining code + docs + meetings, follow [`../../using-glean/reference/synthesis.md`](../../using-glean/reference/synthesis.md).

## Query patterns

Glean's code search understands natural language. Use filters for precision:

```
# Search by content
code_search "authentication middleware"
code_search "rate limiting implementation"

# Search by contributor
code_search "owner:\"John Smith\" billing service"
code_search "from:me updated:past_week"

# Search by time
code_search "after:2024-01-01 payments API"

# Search by file pattern
code_search "*.proto user service"
```

## Output shape

```markdown
## [System / pattern]

### Where it lives
- [`repo/path/file.ext`](url) — [one-line role of this file]
- ...

### Active maintainers
- [Name] — N recent commits, including [most-relevant ones]

### Related docs
- [Doc title](url) — [date]

### Notes
- [Anything surprising: drift between repos, deprecation in progress, recent migration, etc.]
```

## When nothing useful turns up

Don't pad with weak matches. Better:

```markdown
No current implementations found across indexed repos.

What I searched: [queries]
What I filtered out: [N matches removed because deprecated / abandoned / tangential]

Suggestions:
- Try alternative terms: [...]
- Check external libraries
- Ask in [relevant channel]
- This may need to be built from scratch
```
