# Glean Docs

**Document intelligence — analyze docs, verify specs against implementation, and onboard to new areas.**

Deep analysis of enterprise documents and specifications.

## Prerequisites

Requires [glean-core](../glean-core) to be installed first.

## Installation

```bash
claude plugin install glean-core  # if not already installed
claude plugin install glean-docs
```

## What's included

### Skills

- **`verify-rfc`** — Auto-triggers on "verify the RFC", "compare design doc to implementation", "is the spec implemented", "what's drifted from the RFC". Invokable as `/glean-docs:verify-rfc <RFC or topic>`.
- **`onboarding`** — Auto-triggers on "onboard me on", "get me up to speed on", "intro to [team]", "I'm new to". Invokable as `/glean-docs:onboarding <team or project>`.

### Agent

- **doc-reader** — Reads and analyzes enterprise documents to extract key information, requirements, or structured summaries.

## Example usage

```bash
# Verify specs against code
/glean-docs:verify-rfc authentication RFC
/glean-docs:verify-rfc payments API design doc

# Onboard to a new area
/glean-docs:onboarding payments team
/glean-docs:onboarding search infrastructure

# Skills auto-trigger on natural-language asks
"Summarize the key requirements from the API spec"
"What does the design doc say about error handling?"
```

## Features

- **RFC verification** — compare specs to implementation, find gaps
- **Onboarding** — curated introduction to a team or project
- **Document analysis** — extract requirements, decisions, and key points
- **Cross-reference** — connect docs to code and people

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
