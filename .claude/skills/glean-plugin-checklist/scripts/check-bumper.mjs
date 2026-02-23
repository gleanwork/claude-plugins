#!/usr/bin/env node
// Check if a plugin is registered in the .release-it.json bumper.
// Usage: node scripts/check-bumper.mjs <plugin-name>
// Exit code 0 = found, 1 = missing

import { readFileSync } from 'fs';

const pluginName = process.argv[2];
if (!pluginName) {
  console.error('Usage: node scripts/check-bumper.mjs <plugin-name>');
  process.exit(1);
}

const config = JSON.parse(readFileSync('.release-it.json', 'utf8'));
const found = config.plugins['@release-it/bumper'].out.some(
  o => o.file.includes(pluginName)
);

if (found) {
  console.log('in bumper: ok');
} else {
  console.error(`MISSING from bumper: add plugins/${pluginName}/.claude-plugin/plugin.json to .release-it.json`);
  process.exit(1);
}
