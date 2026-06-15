# Synthesis across Glean tools

Some questions can't be answered by a single Glean tool. Use this file when the answer requires combining sources — docs + code + meetings, or org structure + activity, or memory + search.

## When this applies

- A question spans documents, meetings, people, and code
- Results from one source need context from another to be useful
- "Who actually knows about X?" — the title says one thing, the activity says another
- "What's the status of project Y?" — need official docs *and* recent meeting context *and* code activity
- Sources disagree and you need to reconcile

## Choose tools by information type

| What you need | Reach for |
|---|---|
| Authoritative doc (RFC, policy, spec) | `search` |
| Synthesized overview across many sources | `chat` |
| Recent discussion / decisions | `meeting_lookup` |
| Org structure, role, reporting | `employee_search` |
| Code-level truth (what's actually built) | `code_search` |
| User's own context / personalization | `read_memory`, `user_activity` |
| Structured entity / relationship | `knowledge_graph_query` |

## Patterns

### "What is X, really?"

1. `chat` for an overview
2. `search` for the authoritative doc
3. `employee_search` for the owner (so the user can verify)
4. Reconcile: what the AI says + what the doc says + who to ask

### "Who actually knows about X?"

Title alone is weak signal. Combine:

1. `employee_search` — who has the role
2. `code_search` with `owner:` — who has been writing code on it
3. `search` with `owner:` — who has been authoring docs on it
4. Rank by how many signals overlap. People with multiple signals are the real experts; single-signal hits are weaker.

### "What's the status of project Y?"

1. `chat` — current-status summary
2. `meeting_lookup` — recent decisions
3. `search` with `app:jira` or `app:notion` — tracking docs
4. Recency-weight: a 2-day-old meeting beats a 6-month-old wiki page.

### "How do we do X?"

1. `search` — process docs
2. `code_search` — what the code actually does
3. `meeting_lookup` — recent changes to the process
4. Reconcile: doc + code + recent updates. Flag any drift.

## Reconciling conflicts

When two sources disagree:

- **Surface the conflict, don't hide it.** "The spec says A; the code does B."
- **Recency wins for state, authority wins for policy.** A recent meeting overrides an old wiki on "what we're doing now"; an approved RFC overrides a Slack thread on "what the rule is".
- **When unsure, suggest verification with the owner.** Better to point to a person than to pick wrong.

## Output discipline

When presenting synthesized answers:

1. **Cite each claim with a URL.** No URL → don't include the claim.
2. **Note recency** for time-sensitive claims.
3. **Show your sources as a list**, not just inline. The user verifies by clicking.
4. **Apply [vetting.md](vetting.md) before presenting.** Three good sources beat ten weak ones.

## When to say "I don't know"

- Sources are missing or all stale
- Conflicts have no clear resolution and no owner to point to
- The user is making a high-stakes decision and the evidence is thin

A clean "I don't have enough to answer this confidently — try [person/channel]" is better than a synthesized answer the user will rely on incorrectly.

## Skeptical source triage (before synthesizing)

Apply these tests before folding any source into a synthesized answer.

**Source quality**
- Official docs, code, recent meeting notes → include
- Secondary or somewhat-dated sources → include with context note
- Hearsay, speculation, very old content → exclude

**Recency vs authority**
- Recent official > stale official — don't treat a 2-year-old RFC as current if a newer one exists
- Recent unofficial vs stale official: weight toward the recent unless it's a one-off Slack message
- Still flag the conflict rather than silently picking one

**Completeness**
- 3+ sources align with comprehensive coverage → high confidence
- Few sources, gaps noted → include with explicit gaps
- Single source for a multi-faceted question → say so

**Conflict handling**
- Always surface conflicts; never pick silently
- State which is likely correct and why (recency? authority? corroboration?)

## Full synthesis output template

```
## [Question / Topic]

### Answer
[Direct answer to the question]

### Supporting evidence

| Source | What it says | Last updated |
|--------|--------------|--------------|
| [Doc title] ([link]) | [Key information] | [Date] |
| [Meeting date] ([link]) | [Decision or discussion point] | [Date] |
| [Repo / file] ([link]) | [What the code does] | [Date] |

### Confidence assessment
- **Overall**: [High / Medium / Low]
- **Data freshness**: [Current / Mostly current / Some stale]
- **Source agreement**: [Strong / Partial / Conflicting]

### Gaps and next steps
- [What's missing or uncertain]
- [Who to verify with if this is critical]
```
