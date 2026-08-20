# Changelog

## 3.0.0 (2026-06-14)

### Features

* add connect-glean skill for Glean MCP setup ([45e6864](https://github.com/gleanwork/agent-plugins/commit/45e6864dd672aec90362e54d2c86891e04ffec7d))
* consolidate Glean agent plugins ([67c689e](https://github.com/gleanwork/agent-plugins/commit/67c689e0e6a5b008e35423638af9494e9a1c5c1f))
* consolidate sources, add skills authoring + project-handoff, scaffold release-it ([c79492c](https://github.com/gleanwork/agent-plugins/commit/c79492c9dc8fab8cd2c5aec4f098df488c09dce7))
* unify skills into one source compiled to one plugin per target ([0f60738](https://github.com/gleanwork/agent-plugins/commit/0f607387890a735fffc94b1742d2dd8debaa7a54))

### Bug Fixes

* bump create-github-app-token to v3 (Node 24) ([eb6183d](https://github.com/gleanwork/agent-plugins/commit/eb6183ddc294b965e87dc740cf09dd5b4705557b))
* pin node-version in publish workflow ([d3c91af](https://github.com/gleanwork/agent-plugins/commit/d3c91afd984d9f17981af7cc5a97eaca9c6bddc2))
* pin pluginpack-action by full commit SHA ([7624de5](https://github.com/gleanwork/agent-plugins/commit/7624de574a3864456bf398b8afedf4b453c965d2))
* read App ID from variable or secret ([0f02ecc](https://github.com/gleanwork/agent-plugins/commit/0f02ecc4465e56e8eefef2a4e0f0c2044771be3c))
* rev package.json on release via release-it ([9b36785](https://github.com/gleanwork/agent-plugins/commit/9b36785a38278d2e7f4f79f6ac52499ccec030a9))
* use client-id for create-github-app-token v3 ([1f949a3](https://github.com/gleanwork/agent-plugins/commit/1f949a3e5a5acab9ef3ca7ca511307b55c50ce75))

## [2.1.1](https://github.com/gleanwork/cursor-plugins/compare/v2.1.0...v2.1.1) (2026-03-17)

## [2.1.0](https://github.com/gleanwork/cursor-plugins/compare/v2.0.0...v2.1.0) (2026-02-26)

### Features

* update plugin category and keywords for Cursor marketplace ([7991c0e](https://github.com/gleanwork/cursor-plugins/commit/7991c0eeb31bac044d7750973c36ee9973e34a02))

## [2.0.0](https://github.com/gleanwork/cursor-plugins/compare/v1.0.0...v2.0.0) (2026-02-25)

## 1.0.0 (2026-02-21)

All notable changes to this project will be documented in this file.

## 0.1.0 (Unreleased)

### Features

- **glean-core**: Foundation plugin with 6 skills, 2 rules, and 2 commands
- **glean-search**: Enterprise search agent and command
- **glean-code**: Cross-repo code exploration with 2 agents and 5 commands
- **glean-people**: People finder agent and stakeholder discovery commands
- Validation script and CI workflow
