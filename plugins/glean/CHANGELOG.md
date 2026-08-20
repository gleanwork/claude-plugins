# Changelog

## [3.3.0](https://github.com/gleanwork/agent-plugins/compare/v3.2.0...v3.3.0) (2026-08-11)

### Features

* migrate plugin sources to pluginpack 0.11 ([2280582](https://github.com/gleanwork/agent-plugins/commit/22805820a68cdaa8ec5d4e3a2b8558a19524e469))

### Bug Fixes

* bump local MCP version during releases ([6838cf6](https://github.com/gleanwork/agent-plugins/commit/6838cf6dbe102041dc0432422ea086376652d18b))
* **vnext:** address security review feedback + add PR CI ([6ae5b6b](https://github.com/gleanwork/agent-plugins/commit/6ae5b6b2d8e4386b14bbd5946532a961ff09ecf4))

### Documentation

* add RELEASE.md describing this repo's release process ([99a8d91](https://github.com/gleanwork/agent-plugins/commit/99a8d911cf3367cd6024d01e7266a79e6a76fa31))

## [3.2.0](https://github.com/gleanwork/agent-plugins/compare/v3.1.0...v3.2.0) (2026-07-29)

### Features

* do not emit glean-vnext for cursor (for now) ([b27f576](https://github.com/gleanwork/agent-plugins/commit/b27f576e4e1eacbaa25ef98f69a3d30cb8fec504))
* fold glean-vnext runtime MCP server into the glean plugin ([92cf686](https://github.com/gleanwork/agent-plugins/commit/92cf68685f749829fc8c305c046b930045b838e5))
* **using-glean:** document memory tool write support and memory_schema ([21f6dc5](https://github.com/gleanwork/agent-plugins/commit/21f6dc503341417e3fe26cd4b7e31fd3c35b72a5))

### Documentation

* correct pluginpack version target (0.8.0 shipped without features; needs 0.8.1+) ([8508c28](https://github.com/gleanwork/agent-plugins/commit/8508c2874931b9ce52773b6aadb43345d1fabcd3))
* developer testing doc for glean-vnext integration ([da98442](https://github.com/gleanwork/agent-plugins/commit/da98442dc1cab51cac3476cfe94f178765941fce))
* move glean-vnext developer testing doc out of the repo ([d90c624](https://github.com/gleanwork/agent-plugins/commit/d90c6248a3f3891752a9cab621b4351c2545b743))

## [3.1.0](https://github.com/gleanwork/agent-plugins/compare/v3.0.0...v3.1.0) (2026-07-14)

### Features

* add Codex plugin support ([#1](https://github.com/gleanwork/agent-plugins/issues/1)) ([10a8b1e](https://github.com/gleanwork/agent-plugins/commit/10a8b1ee34f464a60c19d3c2fa60a2e3e5aa061e))

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
