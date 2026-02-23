#!/bin/bash
# Check if a plugin is registered in the .release-it.json bumper.
# Usage: bash scripts/check-bumper.sh <plugin-name>
# Exit code 0 = found, 1 = missing

set -euo pipefail

PLUGIN_NAME="${1:?Usage: $0 <plugin-name>}"

node -e "
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('.release-it.json', 'utf8'));
const found = config.plugins['@release-it/bumper'].out.some(
  o => o.file.includes('${PLUGIN_NAME}')
);
if (found) {
  console.log('in bumper: ok');
  process.exit(0);
} else {
  console.error('MISSING from bumper: add plugins/${PLUGIN_NAME}/.claude-plugin/plugin.json to .release-it.json');
  process.exit(1);
}
"
