# Changelog

## [3.4.1](https://github.com/gleanwork/agent-plugins/compare/v3.4.0...v3.4.1) (2026-09-02)

### Documentation

* broaden Claude plugin surface guidance ([11d566c](https://github.com/gleanwork/agent-plugins/commit/11d566cf05dba9051c4a7675fe1035ea8ba2cb9f))

## [3.4.0](https://github.com/gleanwork/agent-plugins/compare/v3.3.0...v3.4.0) (2026-08-20)

### Features

* **cursor:** bundle the local Glean MCP server ([14f98d7](https://github.com/gleanwork/agent-plugins/commit/14f98d75e26fb9a15b188cbd43a0269067714e20))
* **plugins:** remove connect skill from Cursor ([adca9a2](https://github.com/gleanwork/agent-plugins/commit/adca9a214116081d4e4d8f0f7722d839aff2bb70))
* **plugins:** use harness setup for Claude and Codex ([bd655fa](https://github.com/gleanwork/agent-plugins/commit/bd655faf6c432e983ae03c50c2bd193ca03534cb))
* **vnext:** notify on setup policy, and print one tool list in setup ([8bd9ace](https://github.com/gleanwork/agent-plugins/commit/8bd9acedbe379eac69e9b68696b8c3b2ca5fc686)), closes [gleanwork/glean-plugins-vnext#54](https://github.com/gleanwork/glean-plugins-vnext/issues/54) [#54](https://github.com/gleanwork/agent-plugins/issues/54) [#55](https://github.com/gleanwork/agent-plugins/issues/55)
* **vnext:** port capability policy and Cursor HITL updates ([65b9c9a](https://github.com/gleanwork/agent-plugins/commit/65b9c9a4721d3eafee2568c440dc6df7280b3bd5))
* **vnext:** port the configured-server inventory capture ([d285152](https://github.com/gleanwork/agent-plugins/commit/d28515273d0f0b68c17a6c07a031d168549679e9)), closes [gleanwork/glean-plugins-vnext#53](https://github.com/gleanwork/glean-plugins-vnext/issues/53) [#17](https://github.com/gleanwork/agent-plugins/issues/17) [#52](https://github.com/gleanwork/agent-plugins/issues/52)

### Documentation

* **codex:** clarify setup and developer docs ordering ([821a894](https://github.com/gleanwork/agent-plugins/commit/821a8943f2f630993e17f7b885177823f72cfb0b))

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
