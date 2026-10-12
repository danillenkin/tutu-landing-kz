const path = require('path');
const fs = require('fs');

/**
 * Динамически находит CSS файлы в пакете и создаёт webpack aliases
 * для подмены на JS shim с маппингом классов.
 * Это нужно потому что @tutu-react пакеты используют CSS Modules,
 * а хеши в именах файлов меняются при обновлении пакетов.
 */
function setupCssShimAliases(config, packageName, shimPath) {
  try {
    const packagePath = path.dirname(require.resolve(`${packageName}/package.json`));
    const stylesDir = path.join(packagePath, 'dist/styles');
    
    if (!fs.existsSync(stylesDir)) {
      return; // Нет папки styles — пропускаем
    }
    
    const cssFiles = fs.readdirSync(stylesDir)
      .filter(file => file.endsWith('.css') && !file.endsWith('.css.map'));
    
    cssFiles.forEach((cssFile, index) => {
      const shimFile = path.resolve(shimPath, `${packageName.replace(/[@/]/g, '-')}-style${index + 1}.js`);
      
      // Создаём shim файл если его нет
      if (!fs.existsSync(shimFile)) {
        // Читаем CSS и извлекаем имена классов
        const cssContent = fs.readFileSync(path.join(stylesDir, cssFile), 'utf-8');
        const classNames = [...cssContent.matchAll(/\.([a-zA-Z_][a-zA-Z0-9_-]*)\s*\{/g)]
          .map(match => match[1])
          .filter((name, i, arr) => arr.indexOf(name) === i); // уникальные
        
        // Генерируем JS модуль с маппингом 1:1 (классы без хешей)
        // Классы с дефисами нужно экранировать в кавычки
        const shimContent = `/**
 * Auto-generated CSS Modules shim for ${packageName}
 * File: ${cssFile}
 * Классы в CSS без хешей, поэтому маппинг 1:1
 */
module.exports = {
${classNames.map(name => `  '${name}': '${name}',`).join('\n')}
};
`;
        fs.mkdirSync(path.dirname(shimFile), { recursive: true });
        fs.writeFileSync(shimFile, shimContent);
      }
      
      // Добавляем alias для CSS файла
      const cssPath = `${packageName}/dist/styles/${cssFile}`;
      config.resolve.alias[cssPath] = shimFile;
      config.resolve.alias[path.join(stylesDir, cssFile)] = shimFile;
    });
  } catch (e) {
    console.warn(`Warning: Could not setup CSS shim for ${packageName}:`, e.message);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@tutu/kite',
    '@tutu/order-icons',
    '@tutu/kite-assets',
    '@tutu/mother-of-tokens',
    '@tutu-react/header',
    '@tutu-react/kite-footer',
    '@tutu-react/application-buttons',
    '@tutu-react/social-buttons',
  ],

  webpack: (config, { isServer }) => {
    // Алиасы для моков SDK
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tutu/authentication-sdk/react': path.resolve(__dirname, 'app/mocks/authentication-sdk-react.tsx'),
      '@tutu/userway/react': path.resolve(__dirname, 'app/mocks/userway-react.tsx'),
      '@tutu-react/authentication-ui': path.resolve(__dirname, 'app/mocks/authentication-ui.tsx'),
    };

    // Динамически настраиваем CSS shim для @tutu-react пакетов
    const shimPath = path.resolve(__dirname, 'app/styles-shim');
    setupCssShimAliases(config, '@tutu-react/kite-footer', shimPath);
    setupCssShimAliases(config, '@tutu-react/header', shimPath);

    return config;
  },
};

module.exports = nextConfig;
