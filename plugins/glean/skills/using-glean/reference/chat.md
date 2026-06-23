# `chat` — synthesis across sources

Glean Assistant. AI-synthesized answers that combine evidence from multiple Glean sources (docs, code, meetings, people) and reason across them.

## When to use

- The question requires interpretation, comparison, or reasoning across sources, not just retrieval
- You need a single answer drawn from many places ("How do we handle X across teams?", "What's our position on Y?")
- The user is debugging an unfamiliar internal system and wants context, not document URLs
- Earlier `search` returned scattered hits with no obvious authoritative answer

**Don't** use `chat` for:
- Simple document discovery (use `search`)
- People lookups (use `employee_search`)
- Anything you'd hand back as raw documents anyway — `chat` adds latency and an LLM layer between the user and the source

## Parameters

| Parameter | Type | Notes |
|---|---|---|
| `message` | string (required) | The question. Phrase it as a question, not keywords. |
| `context` | string array | Optional prior messages, in order, included before `message`. Use for multi-turn follow-ups. |

## Query style

- Full sentences and questions, not keywords. The synthesis layer reads natural language.
- Include the *constraint* the user cares about: "in production", "for new hires", "since the migration", etc. Without scope, the answer drifts.
- Ask for sources explicitly when you intend to verify ("…and cite the docs you used").

## Examples

```
chat(message="What's our current process for rotating production database credentials?")
chat(message="Which team owns the billing reconciliation pipeline, and what are recent incidents?")
chat(message="Summarize the auth migration RFC and how far along the rollout is.")
```

Multi-turn:
```
chat(
  message="Which of those services has the highest priority right now?",
  context=["What services are blocked on the migration?"]
)
```

## Pitfalls

- **Synthesis can drift from sources.** `chat` may produce a plausible answer from weak evidence. For high-stakes claims, follow up with `search` + `read_document` on the cited material.
- **Latency.** `chat` is materially slower than `search`. Don't use it as a search wrapper.
- **No filter parameters.** Unlike `search`, you can't constrain by app, date, or owner. Encode constraints in the message text.

## Typical follow-up

When `chat` cites specific documents, fetch them with `read_document` to verify. For reliability assessment, see [vetting.md](vetting.md).
