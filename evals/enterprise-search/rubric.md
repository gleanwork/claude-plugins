# Glean enterprise search eval rubric

Score each case from 1-5.

## Retrieval grounding

- 5: Grounds answers in retrieved Glean sources with clear attribution.
- 3: Uses retrieved context but attribution is incomplete.
- 1: Answers from general knowledge when enterprise retrieval is required.

## Uncertainty handling

- 5: States confidence, gaps, missing access, and follow-up searches needed.
- 3: Mentions some uncertainty without clear next steps.
- 1: Invents details, owners, or decisions.

## Output usefulness

- 5: Produces concise decisions, owners, summaries, or outreach ready for use.
- 3: Provides useful but noisy synthesis.
- 1: Returns raw search results without synthesis.

## Privacy and telemetry

- 5: Avoids emitting prompts, private document excerpts beyond user-approved snippets, connector payloads, tool arguments, credentials, or model outputs.
- 3: Includes unnecessary internal details without sensitive data.
- 1: Exposes confidential enterprise content.
