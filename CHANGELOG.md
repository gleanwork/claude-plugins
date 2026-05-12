# Changelog

## Unreleased

### ⚠️ Breaking changes

This release consolidates several plugins around the [Anthropic-recommended progressive-disclosure pattern](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices) — one parent skill per plugin with topic-specific reference files loaded on demand. Several skill names have changed; the slash invocation paths for the corresponding consolidated skills have changed accordingly.

The motivation: the old structure put many sibling skills' descriptions into Claude's startup context simultaneously, which on a typical install pushed the description budget over its limit and caused descriptions (the trigger signals) to be silently truncated. The consolidation drops one description per plugin into the listing while moving per-tool / per-topic depth into reference files that are only read when needed.

#### `glean-core` — six skills consolidated into one

| Removed slash path | Replacement |
|---|---|
| `/glean-core:enterprise-search` | `/glean-core:using-glean` (or just ask in natural language) |
| `/glean-core:meeting-context` | `/glean-core:using-glean` |
| `/glean-core:people-lookup` | `/glean-core:using-glean` |
| `/glean-core:synthesis-patterns` | `/glean-core:using-glean` |
| `/glean-core:confidence-signals` | `/glean-core:using-glean` |
| `/glean-core:glean-tools-guide` | `/glean-core:using-glean` |

The new `using-glean` skill carries an intent-to-tool decision tree and links to per-MCP-tool reference files (`reference/search.md`, `reference/employee-search.md`, `reference/meeting-lookup.md`, etc.).

#### `glean-code` — two skills consolidated into one

| Removed slash path | Replacement |
|---|---|
| `/glean-code:code-exploration` | `/glean-code:using-glean-code` |
| `/glean-code:plan-prep` | `/glean-code:using-glean-code` |

#### `glean-productivity` — two skills consolidated into one

| Removed slash path | Replacement |
|---|---|
| `/glean-productivity:activity-synthesis` | `/glean-productivity:using-glean-productivity` |
| `/glean-productivity:priority-signals` | `/glean-productivity:using-glean-productivity` |

#### Workflow plugins — `commands/` migrated to `skills/`

`glean-search`, `glean-people`, `glean-meetings`, and `glean-docs` had `commands/` directories that have been migrated to `skills/`. Per Anthropic's plugin docs, these are equivalent at runtime — slash invocations are unchanged (`/glean-search:search`, `/glean-people:find-expert`, `/glean-people:stakeholders`, `/glean-meetings:catch-up`, `/glean-meetings:meeting-prep`, `/glean-docs:onboarding`, `/glean-docs:verify-rfc` all continue to work). The migration enables the skills to auto-trigger on natural-language phrases and unlocks the `reference/` directory pattern for future use.

### Improvements

- Description quality: every plugin's `SKILL.md` now uses a `description` + `when_to_use` pair with concrete trigger phrasing, dropping the previous "Auto-triggers when X tool is considered" framing that didn't reflect how skill triggering actually works.
- `scripts/validate-plugins.mjs`: now correctly passes through YAML block-scalar indicators (`|` and `>`) instead of double-quoting them, allowing multi-paragraph `when_to_use` content.


## [1.1.1](///compare/v1.1.0...v1.1.1) (2026-04-10)

### Bug Fixes

* suppress startup message when Glean is already configured d1e4942

## [1.1.0](///compare/v1.0.0...v1.1.0) (2026-02-23)

### Features

* add plugin-reviewer subagent eb0e354
* add release-workflow skill 5afcf07

### Bug Fixes

* add missing plugins to release-it bumper 5207b0b
* add vetting phase to skill discovery to filter one-off activities 6b2f351
* align plugin versions to 1.0.0 35c4374

## [1.0.0](///compare/v0.13.0...v1.0.0) (2026-02-21)

## [0.13.0](///compare/v0.12.1...v0.13.0) (2026-02-17)

### Features

* add planning bridge to glean-code plugin 5f0dec7

## [0.12.1](///compare/v0.12.0...v0.12.1) (2026-02-16)

## [0.12.0](///compare/v0.11.0...v0.12.0) (2026-02-13)

### Features

* add glean-plugin-checklist skill for marketplace consistency 9252912

### Bug Fixes

* add glean-productivity and glean-project to marketplace b77a400

## [0.11.0](///compare/v0.10.0...v0.11.0) (2026-02-12)

### Features

* add glean-productivity, glean-project plugins and core synthesis skills 2010bed

### Bug Fixes

* address PR review comments db01e6c
* correct meeting_lookup examples to match MCP tool schema b18f387
* revert meeting_lookup to natural language dates 3f356ca, closes #9

## [0.10.0](///compare/v0.9.1...v0.10.0) (2026-02-05)

### Features

* add glean-skills plugin for skill discovery and creation 223970d

### Bug Fixes

* add allowed-tools declaration to create command 25dcd5d
* correct homepage URL in plugin manifests 6a07b0c

## [0.9.1](///compare/v0.9.0...v0.9.1) (2026-02-01)

### Bug Fixes

* add glean-dev-docs plugin to marketplace manifest 1afc48b

## [0.9.0](///compare/v0.8.1...v0.9.0) (2026-02-01)

### Features

* add glean-dev-docs plugin for developer documentation 38f755d

## [0.8.1](///compare/v0.8.0...v0.8.1) (2025-12-19)

### Bug Fixes

* speed up session-start hook by reading config directly 8412611

## [0.8.0](///compare/v0.7.4...v0.8.0) (2025-12-17)

### Bug Fixes

* remove jq dependency from session-start script 0ebef51
* update command namespaces and improve documentation 71722a6, closes #343CED #D8FD49

## [0.7.4](///compare/v0.7.3...v0.7.4) (2025-12-16)

### Bug Fixes

* correct Glean tool query syntax documentation 21bc7d8

## [0.7.3](///compare/v0.7.2...v0.7.3) (2025-12-15)

### Features

* display version in session start and fix release-it config 4d388c7

## [0.7.2](///compare/v0.7.1...v0.7.2) (2025-12-13)

## [0.7.1](///compare/v0.7.0...v0.7.1) (2025-12-12)

## 0.7.0 (2025-12-10)

### Features

* adding changelog support to release-it cc18987
