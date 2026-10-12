#!/usr/bin/env node
/**
 * Скрипт извлекает CSS файлы из @tutu-react пакетов
 * и объединяет их в public/tutu-styles.css
 * 
 * Запускается при postinstall или вручную: node scripts/extract-tutu-styles.js
 */

const fs = require('fs');
const path = require('path');

const PACKAGES = [
  '@tutu-react/kite-footer',
  '@tutu-react/header',
];

const OUTPUT_FILE = path.resolve(__dirname, '../public/tutu-styles.css');

function extractCss() {
  let allCss = `/* Auto-generated: CSS from @tutu-react packages */\n/* Do not edit manually - regenerate with: node scripts/extract-tutu-styles.js */\n\n`;
  
  for (const packageName of PACKAGES) {
    try {
      const packagePath = path.dirname(require.resolve(`${packageName}/package.json`));
      const stylesDir = path.join(packagePath, 'dist/styles');
      
      if (!fs.existsSync(stylesDir)) {
        console.log(`  - ${packageName}: no styles directory`);
        continue;
      }
      
      const cssFiles = fs.readdirSync(stylesDir)
        .filter(file => file.endsWith('.css') && !file.endsWith('.css.map'));
      
      if (cssFiles.length === 0) {
        console.log(`  - ${packageName}: no CSS files`);
        continue;
      }
      
      allCss += `/* === ${packageName} === */\n`;
      
      for (const cssFile of cssFiles) {
        const cssContent = fs.readFileSync(path.join(stylesDir, cssFile), 'utf-8');
        // Убираем sourcemap комментарии
        const cleanCss = cssContent.replace(/\/\*#\s*sourceMappingURL=.*?\*\//g, '');
        allCss += cleanCss + '\n';
      }
      
      console.log(`  ✓ ${packageName}: ${cssFiles.length} file(s)`);
    } catch (e) {
      console.log(`  - ${packageName}: not found or error (${e.message})`);
    }
  }
  
  // Убедимся что public/ существует
  const publicDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_FILE, allCss);
  console.log(`\n✓ Written to ${OUTPUT_FILE}`);
}

console.log('Extracting CSS from @tutu-react packages...\n');
extractCss();
