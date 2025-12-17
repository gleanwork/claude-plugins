# Releasing

To release a new version:

```bash
npm run release -- patch   # 0.7.4 → 0.7.5
npm run release -- minor   # 0.7.4 → 0.8.0
npm run release -- major   # 0.7.4 → 1.0.0
```

This bumps versions in:
- `package.json`
- `.claude-plugin/marketplace.json`
- All `plugins/*/.claude-plugin/plugin.json` files

Then creates a commit and git tag, and pushes to the remote repository.

## Preview Mode

Preview changes without executing:

```bash
npm run release -- --dry-run
```

## Manual Version Bump

If you need to bump versions manually, update all of these files:
- `package.json` - root version
- `.claude-plugin/marketplace.json` - marketplace version
- `plugins/glean-core/.claude-plugin/plugin.json`
- `plugins/glean-search/.claude-plugin/plugin.json`
- `plugins/glean-meetings/.claude-plugin/plugin.json`
- `plugins/glean-people/.claude-plugin/plugin.json`
- `plugins/glean-docs/.claude-plugin/plugin.json`
- `plugins/glean-code/.claude-plugin/plugin.json`
