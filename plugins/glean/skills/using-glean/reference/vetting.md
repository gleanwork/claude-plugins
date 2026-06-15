# Vetting Glean results

Glean returns lots of results. Most should not reach the user verbatim. Vet for relevance, freshness, authority, and corroboration before presenting.

## When this applies

- Any time you're about to surface Glean results to the user
- Especially when the user will *act* on the answer (decisions, code changes, communications)
- When sources disagree
- When results are sparse and there's pressure to fill the gap with weak matches

## The four tests

### Relevance

Does the result actually answer the question, or does it just contain matching keywords?

- **Include**: directly addresses the query
- **Exclude**: tangential mentions, keyword coincidences, unrelated contexts
- Ask: *"If I sent only this to the user, would they say 'yes that answers it'?"*

### Freshness

How recently was the source updated?

| Window | Treatment |
|---|---|
| < 3 months | Current — present without caveat |
| 3–12 months | Aging — note the date |
| 12+ months | Stale — include only if no alternative, with explicit warning |

For currency-sensitive topics (active projects, team ownership, deployment process), tighten the window. For timeless content (architectural patterns, design philosophy), relax it.

### Authority

Where does the source live?

| Tier | Examples |
|---|---|
| Official | RFCs, approved specs, signed-off policies, CODEOWNERS |
| Semi-official | Team wikis, project docs, design docs |
| Discussion | Slack threads, meeting notes |
| Personal | Individual drafts, scratch notes |

Don't present a Slack message as policy. Don't present a draft as approved. When the only result is informal, say so.

### Corroboration

Do multiple sources agree?

- 3+ agree → high confidence
- 2 agree → medium
- 1 source → call it out as single-source
- Sources conflict → see [synthesis.md](synthesis.md) on reconciling

## Filter before presenting

Run results through this filter:

1. Drop tangential keyword matches
2. Drop content older than your freshness threshold (unless no alternative)
3. Drop drafts being passed off as final
4. Drop content from people who left the company (for ownership questions)
5. Drop deprecated / legacy content unless that's what the user asked for

Three vetted results beat ten unfiltered ones.

## "Nothing found" is a valid answer

If vetting eliminates everything, say so cleanly:

> No high-quality results for [topic]. Search returned [N] candidates; vetting excluded them as [reason: stale / tangential / informal].
>
> Suggested next steps:
> - Try alternative terms: [suggestions]
> - Ask in [relevant channel]
> - Check with [likely owner]

Never pad with weak matches to avoid saying "nothing found".

## Communicating confidence

When you do present results, signal confidence. Examples:

- "Per the auth RFC (approved 2025-03, last updated 2025-08): …"
- "From a Slack thread on 2025-09-02 (informal): …"
- "Three sources agree on this: [docs]"
- "Single source — recommend verifying with [owner]"
- "This doc is 14 months old; verify currency before relying on it"

Specificity is the discipline. "Recently" and "according to docs" tell the user nothing.

## Confidence signal templates

Use these when presenting results to users, especially when acting on the information.

### For individual search results

```
**[Title]** ([link])
- Updated: [date] ([freshness: current / aging / stale])
- Source: [official / semi-official / discussion / personal]
- Relevance: [why this matches the query]
```

### For a synthesized answer

```
## [Topic]

**Confidence**: [High / Medium / Low]
- Based on [N] sources
- Most recent: [date]
- [Any caveats — stale, single-source, inferred]

**Sources**:
- [Source 1] — [authority tier], updated [date]
- [Source 2] — [authority tier], updated [date]
```

### For uncertain or sparse results

```
## [Topic]

**What I found**: [Information]

**Caveats**:
- [ ] Source is [X] months old — verify currency
- [ ] Single source — seek corroboration
- [ ] Inferred, not explicitly stated
- [ ] Conflicts with [other source]

**Suggested verification**: Contact [person] or check [source]
```

### For conflicting sources

```
## [Topic] — Conflicting information

| Aspect | Source A | Source B | Assessment |
|--------|----------|----------|------------|
| [Item] | [Says X] | [Says Y] | [Which is likely correct and why] |

**Recommendation**: Verify with [authoritative source / person]
```

## When to always communicate confidence

Signal confidence explicitly when:

- The user will make a decision based on the information
- The information is time-sensitive (deployment process, team ownership, active policy)
- Sources are from informal channels (Slack, personal notes)
- Only one source was found
- The topic involves policy, security, or compliance
- You are synthesizing rather than directly quoting a source

## Inline freshness indicators (shorthand)

When you need a compact signal in a citation line:

- ✅ Updated within 6 months — current
- ⚠️ Updated 6–12 months ago — verify if critical
- ❌ Updated 12+ months ago — likely outdated; include only with warning
