#!/usr/bin/env node
/**
 * Validates Claude Code plugin structure:
 * 1. .claude-plugin/marketplace.json at repo root
 * 2. .claude-plugin/plugin.json per plugin
 * 3. Frontmatter in agents/*.md, skills/*\/SKILL.md, commands/*.md
 *
 * Frontmatter validation logic adapted from:
 * https://github.com/anthropics/claude-plugins-official
 */

import { parse as parseYaml } from "yaml";
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

// Characters that require quoting in YAML values when unquoted
const YAML_SPECIAL_CHARS = /[{}[\]*&#!|>%@`]/;
const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)---\s*\n?/;

const pluginNamePattern = /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/;
const marketplaceNamePattern = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const errors = [];
const warnings = [];

function addError(msg) { errors.push(msg); }
function addWarning(msg) { warnings.push(msg); }

// --- Frontmatter parsing (from official validator) ---

function quoteSpecialValues(text) {
  const lines = text.split("\n");
  const result = [];
  for (const line of lines) {
    const match = line.match(/^([a-zA-Z_-]+):\s+(.+)$/);
    if (match) {
      const [, key, value] = match;
      if (!key || !value) { result.push(line); continue; }
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) { result.push(line); continue; }
      if (YAML_SPECIAL_CHARS.test(value)) {
        const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        result.push(`${key}: "${escaped}"`);
        continue;
      }
    }
    result.push(line);
  }
  return result.join("\n");
}

function parseFrontmatter(markdown) {
  const match = markdown.match(FRONTMATTER_REGEX);
  if (!match) {
    return { frontmatter: {}, error: "No frontmatter found" };
  }
  const frontmatterText = quoteSpecialValues(match[1] ?? "");
  try {
    const parsed = parseYaml(frontmatterText);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return { frontmatter: parsed };
    }
    return {
      frontmatter: {},
      error: `YAML parsed but result is not an object (got ${Array.isArray(parsed) ? "array" : typeof parsed})`,
    };
  } catch (err) {
    return { frontmatter: {}, error: `YAML parse failed: ${err.message}` };
  }
}

// --- File type detection (from official validator) ---

function detectFileType(filePath) {
  // Avoid treating content inside a skill directory as agent/command definitions
  const inSkillContent = /\/skills\/[^/]+\//.test(filePath);
  if (filePath.includes("/agents/") && !inSkillContent) return "agent";
  if (filePath.includes("/skills/") && path.basename(filePath) === "SKILL.md") return "skill";
  if (filePath.includes("/commands/") && !inSkillContent) return "command";
  return null;
}

// --- Frontmatter validation rules (from official validator) ---

function validateAgentFrontmatter(fm) {
  const issues = [];
  if (!fm["name"] || typeof fm["name"] !== "string") {
    issues.push({ level: "error", message: 'Missing required "name" field' });
  }
  if (!fm["description"] || typeof fm["description"] !== "string") {
    issues.push({ level: "error", message: 'Missing required "description" field' });
  }
  return issues;
}

function validateSkillFrontmatter(fm) {
  if (!fm["description"] && !fm["when_to_use"]) {
    return [{ level: "error", message: 'Missing required "description" field' }];
  }
  return [];
}

function validateCommandFrontmatter(fm) {
  if (!fm["description"] || typeof fm["description"] !== "string") {
    return [{ level: "error", message: 'Missing required "description" field' }];
  }
  return [];
}

// --- File system helpers ---

async function pathExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function ensureDirectory(p, context) {
  try {
    const stat = await fs.stat(p);
    if (!stat.isDirectory()) {
      addError(`${context} exists but is not a directory: ${p}`);
      return false;
    }
    return true;
  } catch {
    addError(`${context} directory is missing: ${p}`);
    return false;
  }
}

async function readJsonFile(filePath, context) {
  let raw;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch {
    addError(`${context} is missing: ${filePath}`);
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    addError(`${context} contains invalid JSON (${filePath}): ${err.message}`);
    return null;
  }
}

async function walkMdFiles(dirPath) {
  const files = [];
  const stack = [dirPath];
  while (stack.length > 0) {
    const current = stack.pop();
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(full);
      }
    }
  }
  return files;
}

function isSafeRelativePath(value) {
  if (!value) return false;
  if (value.startsWith("http://") || value.startsWith("https://")) return true;
  if (path.isAbsolute(value)) return false;
  const normalized = path.posix.normalize(value.replace(/\\/g, "/"));
  return !normalized.startsWith("../") && normalized !== "..";
}

// --- Component frontmatter validation ---

async function validatePluginFrontmatter(pluginDir, pluginName, repoRoot) {
  const mdFiles = await walkMdFiles(pluginDir);

  for (const filePath of mdFiles) {
    const fileType = detectFileType(filePath);
    if (!fileType) continue;

    const rel = path.relative(repoRoot, filePath);
    const content = await fs.readFile(filePath, "utf8");
    const { frontmatter, error } = parseFrontmatter(content);

    const issues = [];
    if (error) {
      issues.push({ level: "error", message: error });
    } else {
      switch (fileType) {
        case "agent":   issues.push(...validateAgentFrontmatter(frontmatter)); break;
        case "skill":   issues.push(...validateSkillFrontmatter(frontmatter)); break;
        case "command": issues.push(...validateCommandFrontmatter(frontmatter)); break;
      }
    }

    for (const issue of issues) {
      if (issue.level === "error") {
        addError(`${pluginName}: ${fileType} frontmatter error in ${rel}: ${issue.message}`);
      } else {
        addWarning(`${pluginName}: ${fileType} frontmatter warning in ${rel}: ${issue.message}`);
      }
    }
  }
}

// --- Hooks validation ---

async function validateHooksJson(pluginDir, pluginName) {
  const hooksPath = path.join(pluginDir, "hooks", "hooks.json");
  if (!(await pathExists(hooksPath))) return;
  const hooks = await readJsonFile(hooksPath, `${pluginName} hooks/hooks.json`);
  if (!hooks) return;
  if (!hooks["hooks"] || typeof hooks["hooks"] !== "object") {
    addError(`${pluginName}: hooks/hooks.json must have a "hooks" object.`);
  }
}

// --- Plugin validation ---

async function validatePlugin(entry, index, repoRoot) {
  const label = `plugins[${index}]`;

  if (typeof entry["name"] !== "string" || !pluginNamePattern.test(entry["name"])) {
    addError(`${label}.name must be lowercase and use only alphanumerics, hyphens, and periods.`);
    return;
  }
  const pluginName = entry["name"];

  if (typeof entry["source"] !== "string" || !entry["source"]) {
    addError(`${label}.source must be a non-empty string path.`);
    return;
  }
  if (!isSafeRelativePath(entry["source"])) {
    addError(`${label}.source is not a safe relative path: "${entry["source"]}"`);
    return;
  }

  const pluginDir = path.join(repoRoot, entry["source"]);
  if (!(await ensureDirectory(pluginDir, `${label}.source`))) return;

  const manifest = await readJsonFile(
    path.join(pluginDir, ".claude-plugin", "plugin.json"),
    `${pluginName} plugin manifest`
  );
  if (!manifest) return;

  if (typeof manifest["name"] !== "string" || !pluginNamePattern.test(manifest["name"])) {
    addError(`${pluginName}: "name" in plugin.json must be lowercase and use only alphanumerics, hyphens, and periods.`);
  }
  if (manifest["name"] && manifest["name"] !== pluginName) {
    addError(`${pluginName}: marketplace entry name does not match plugin.json name ("${manifest["name"]}").`);
  }

  for (const field of ["name", "version", "description"]) {
    if (typeof manifest[field] !== "string" || !manifest[field].length) {
      addError(`${pluginName}: plugin.json is missing required field "${field}".`);
    }
  }

  const author = manifest["author"];
  if (!author || typeof author["name"] !== "string" || !author["name"].length) {
    addError(`${pluginName}: plugin.json is missing "author.name".`);
  }

  await validatePluginFrontmatter(pluginDir, pluginName, repoRoot);
  await validateHooksJson(pluginDir, pluginName);

  if (!(await pathExists(path.join(pluginDir, "README.md")))) {
    addWarning(`${pluginName}: no README.md found in plugin directory.`);
  }
}

// --- Main ---

async function main() {
  const repoRoot = process.cwd();

  const marketplace = await readJsonFile(
    path.join(repoRoot, ".claude-plugin", "marketplace.json"),
    "Marketplace manifest"
  );
  if (!marketplace) { summarizeAndExit(); return; }

  if (typeof marketplace["name"] !== "string" || !marketplaceNamePattern.test(marketplace["name"])) {
    addError('Marketplace "name" must be lowercase kebab-case and start/end with an alphanumeric character.');
  }

  const owner = marketplace["owner"];
  if (!owner || typeof owner["name"] !== "string" || !owner["name"].length) {
    addError('Marketplace "owner.name" is required.');
  }

  const plugins = marketplace["plugins"];
  if (!Array.isArray(plugins) || plugins.length === 0) {
    addError('Marketplace "plugins" must be a non-empty array.');
    summarizeAndExit();
    return;
  }

  const seenNames = new Set();
  for (const [index, entry] of plugins.entries()) {
    if (!entry || typeof entry !== "object") {
      addError(`plugins[${index}] must be an object.`);
      continue;
    }
    const name = entry["name"];
    if (seenNames.has(name)) {
      addError(`Duplicate plugin name in marketplace manifest: "${name}"`);
    }
    seenNames.add(name);
    await validatePlugin(entry, index, repoRoot);
  }

  summarizeAndExit();
}

function summarizeAndExit() {
  if (warnings.length > 0) {
    console.log("Warnings:");
    for (const w of warnings) console.log(`  - ${w}`);
    console.log("");
  }
  if (errors.length > 0) {
    console.error("Validation failed:");
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log("Validation passed.");
}

await main();
