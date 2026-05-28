'use strict';

const esbuild = require('esbuild');
const path    = require('path');
const fs      = require('fs');

const dist = path.resolve(__dirname, 'dist');
if (!fs.existsSync(dist)) fs.mkdirSync(dist);

const shared = {
  entryPoints: ['index.js'],
  bundle:      true,
  target:      ['es2018'],
};

async function build() {
  // CommonJS — Node.js / require()
  await esbuild.build({
    ...shared,
    format:   'cjs',
    platform: 'node',
    outfile:  'dist/pash.cjs.js',
  });

  // ESM — browser / import
  await esbuild.build({
    ...shared,
    format:   'esm',
    platform: 'neutral',
    outfile:  'dist/pash.esm.js',
  });

  // IIFE — <script src="dist/pash.browser.js">
  await esbuild.build({
    ...shared,
    format:     'iife',
    platform:   'browser',
    globalName: 'PASH',
    outfile:    'dist/pash.browser.js',
    minify:     true,
  });

  const sizes = ['pash.cjs.js', 'pash.esm.js', 'pash.browser.js'].map(f => {
    const bytes = fs.statSync(`dist/${f}`).size;
    return `  ${f.padEnd(20)} ${(bytes / 1024).toFixed(1)} KB`;
  });

  console.log('Build complete:\n' + sizes.join('\n'));
}

build().catch(e => { console.error(e); process.exit(1); });
