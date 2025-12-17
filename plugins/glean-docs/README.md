# Glean Docs

**Document intelligence - analyze docs, verify specs against implementation, and onboard to new areas.**

Deep analysis of enterprise documents and specifications.

## Prerequisites

Requires [glean-core](../glean-core) to be installed first.

## Installation

```bash
claude plugin install glean-core  # if not already installed
claude plugin install glean-docs
```

## What's Included

### Agent
- **doc-reader** - Reads and analyzes enterprise documents to extract key information, requirements, or structured summaries

### Commands
- `/glean-docs:verify-rfc <RFC or topic>` - Verify an RFC or design doc against the actual implementation
- `/glean-docs:onboarding <team or project>` - Get up to speed on a new team or project

## Example Usage

```bash
# Verify specs against code
/glean-docs:verify-rfc authentication RFC
/glean-docs:verify-rfc payments API design doc

# Onboard to a new area
/glean-docs:onboarding payments team
/glean-docs:onboarding search infrastructure

# The doc-reader agent is automatically triggered
"Summarize the key requirements from the API spec"
"What does the design doc say about error handling?"
```

## Features

- **RFC Verification** - Compare specs to implementation, find gaps
- **Onboarding** - Curated introduction to a team or project
- **Document Analysis** - Extract requirements, decisions, and key points
- **Cross-Reference** - Connect docs to code and people

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/claude-plugins/issues
