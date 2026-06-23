# Plan-prep: enterprise context before plan mode

When the user is about to enter plan mode for architectural or strategic work, gather org-wide context first so the plan is informed by what already exists rather than reasoning in isolation.

## When this applies

- The user says "plan with glean", "prep for plan", "research before planning", "plan prep"
- The user is starting an architectural change, not a localized fix
- The work touches systems beyond the current repo and existing patterns or owners are relevant
- Better designs would come from seeing prior art across teams

**Don't** use this for:
- Localized bug fixes (just enter plan mode directly)
- Greenfield work in unfamiliar territory (do `using-glean-code` exploration first, *then* plan-prep)

## Workflow

1. **Design & architecture research.** Search for RFCs, design docs, ADRs covering the same area:
   ```
   search(query="[task] architecture OR design doc OR RFC", app="confluence")
   search(query="[task] ADR", app="github")
   ```
   Note proposals that were *rejected* — they record constraints worth respecting.

2. **Code patterns & implementations.** Use `code_search` for similar solutions across the org:
   ```
   code_search(query="[similar component or pattern]")
   code_search(query="[interface or library being affected]")
   ```
   Filter for active code (not legacy paths) per [exploration.md](exploration.md).

3. **Stakeholders & owners.** Identify who needs to know:
   ```
   code_search(query="[relevant systems] updated:past_month")
   employee_search(query="[relevant team or role]")
   ```
   Cross-reference recent code activity with org structure to find real owners (not just titled ones).

4. **Related systems.** Search for upstream / downstream dependencies:
   ```
   code_search(query="[component] import OR dependency")
   ```

5. **Synthesize.** Group findings by category (architecture, implementations, stakeholders, related systems). Cite every claim. Apply vetting per [`../../using-glean/reference/vetting.md`](../../using-glean/reference/vetting.md).

## Output shape

```markdown
## Plan-prep: [task]

### Design & architecture
- [Doc title](url) — [date] — [one-line takeaway]
- ...

### Implementations & patterns
- [`repo/path`](url) — [what it does, why relevant]
- ...

### Stakeholders & owners
- [Name] — [role / signal: code activity, doc authorship, etc.]
- ...

### Related systems
- [System] — [how it depends on or is depended on by this work]
- ...

### Key insights
- [Synthesized observation, e.g., "Two teams independently implemented X; converging would simplify Y"]
- ...
```

## Hand-off to plan mode

When the research is in place, the user enters plan mode with:
- Concrete sources to cite in the plan rationale
- Owners to consult before / after
- Prior art to reuse or supersede
- Awareness of related systems that may be affected

Plan-mode design quality improves materially when it's informed by what already exists in the org.
