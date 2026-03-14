const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['./src/app.ts'],
    bundle: true,
    platform: 'node',
    target: 'node24',
    outfile: './dist/app.js',
    // 아래 리스트를 반드시 추가하세요
    external: [
        'puppeteer',
        'puppeteer-extra',
        'puppeteer-extra-plugin-stealth',
        'puppeteer-extra-plugin-user-data-dir',
        'puppeteer-extra-plugin-user-preferences'
    ],
    format: 'cjs',
}).catch(() => process.exit(1));