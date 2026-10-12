#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const directivesPkgPath = path.join(projectRoot, 'node_modules/@tutu/kite-ai-directives/package.json');
const localPkgPath = path.join(projectRoot, 'package.json');

if (!fs.existsSync(directivesPkgPath)) {
  console.log('⚠ @tutu/kite-ai-directives not found in node_modules, skipping sync');
  process.exit(0);
}

const directivesDeps = JSON.parse(fs.readFileSync(directivesPkgPath, 'utf-8')).dependencies || {};
const localPkg = JSON.parse(fs.readFileSync(localPkgPath, 'utf-8'));
const localDeps = localPkg.dependencies || {};

const changes = [];

for (const [name, version] of Object.entries(directivesDeps)) {
  if (name in localDeps && localDeps[name] !== version) {
    changes.push(`  ${name}: ${localDeps[name]} → ${version}`);
    localDeps[name] = version;
  }
}

if (changes.length === 0) {
  console.log('✓ Зависимости уже актуальны');
  process.exit(0);
}

console.log('Синхронизируем зависимости из @tutu/kite-ai-directives:\n' + changes.join('\n'));

localPkg.dependencies = localDeps;
fs.writeFileSync(localPkgPath, JSON.stringify(localPkg, null, 2) + '\n');

console.log('\n✓ package.json обновлён, запускаем npm install...\n');
execSync('npm install --legacy-peer-deps', { stdio: 'inherit', cwd: projectRoot });
console.log('\n✓ Зависимости синхронизированы');
