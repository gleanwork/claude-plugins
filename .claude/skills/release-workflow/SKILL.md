---
name: release-workflow
description: Use when preparing or executing a release for the glean-claude-plugins marketplace. Triggers on "release", "bump version", "publish", "npm run release", "new version", or when the user wants to cut a new plugin version.
disable-model-invocation: true
---

# Release Workflow

Follow these steps in order. Do not skip steps.

## Pre-flight checks

**Step 1: Verify all plugin versions are in sync**

Run:
```bash
for p in plugins/*/.claude-plugin/plugin.json; do
  echo "$p: $(node -e "console.log(JSON.parse(require('fs').readFileSync('$p','utf8')).version)")"
done
```

All versions must match the current marketplace version in `.claude-plugin/marketplace.json`.
If any are out of sync, fix them before proceeding and commit the fix separately.

**Step 2: Validate plugin structure**

Run:
```bash
node scripts/validate-plugins.mjs
```

All plugins must pass validation. Fix any errors before proceeding.

**Step 3: Verify working tree is clean**

Run:
```bash
git status
```

Expected: `nothing to commit, working tree clean`

## Run the release

**Step 4: Run release-it**

```bash
npm run release
```

This will:
- Prompt for the next version (patch/minor/major)
- Update `package.json`, `.claude-plugin/marketplace.json`, and ALL `plugins/*/.claude-plugin/plugin.json` via the bumper
- Generate/update `CHANGELOG.md` from conventional commits
- Create a git tag `v<version>`
- Commit with message `chore: release v<version>`

**Step 5: Post-release verification**

Run:
```bash
for p in plugins/*/.claude-plugin/plugin.json; do
  echo "$p: $(node -e "console.log(JSON.parse(require('fs').readFileSync('$p','utf8')).version)")"
done
```

All 10 plugin versions should show the new version number.

**Step 6: Push tag and commits**

```bash
git push && git push --tags
```

## Plugins covered by the bumper (bumped automatically)

- `plugins/glean-core`
- `plugins/glean-search`
- `plugins/glean-people`
- `plugins/glean-meetings`
- `plugins/glean-docs`
- `plugins/glean-code`
- `plugins/glean-dev-docs`
- `plugins/glean-skills`
- `plugins/glean-productivity`
- `plugins/glean-project`

**Adding a new plugin?** You MUST add its `plugin.json` path to the `@release-it/bumper` `out` array in `.release-it.json`, or its version will silently drift on the next release.
