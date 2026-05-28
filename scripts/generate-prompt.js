#!/usr/bin/env node
'use strict';

/**
 * Генерирует SYSTEM_PROMPT.md из текущего состояния реестра схем.
 *
 * Использование:
 *   node scripts/generate-prompt.js           → SYSTEM_PROMPT.md
 *   node scripts/generate-prompt.js --stdout  → в консоль
 */

const fs   = require('fs');
const path = require('path');
const { generateSystemPrompt } = require('../src/prompt');
const { VERSION }              = require('../src/version');

const CONFIGS = [
  { lang: 'ru', mode: 'pash',    title: 'RU / mode: pash'    },
  { lang: 'ru', mode: 'pash+id', title: 'RU / mode: pash+id' },
  { lang: 'ru', mode: 'events',  title: 'RU / mode: events'  },
  { lang: 'en', mode: 'pash',    title: 'EN / mode: pash'    },
  { lang: 'en', mode: 'pash+id', title: 'EN / mode: pash+id' },
  { lang: 'en', mode: 'events',  title: 'EN / mode: events'  },
];

const lines = [
  `# PASH System Prompt Reference — v${VERSION}`,
  '',
  '> **Auto-generated.** Do not edit manually.',
  '> Source: `src/schema.js` + `src/prompt.js`',
  '> Regenerate: `npm run prompt`',
  '',
  'Copy the block matching your language and mode into your LLM system role.',
  '',
  '---',
  '',
];

for (const cfg of CONFIGS) {
  const prompt = generateSystemPrompt({ lang: cfg.lang, mode: cfg.mode });
  lines.push(`## ${cfg.title}`);
  lines.push('');
  lines.push('```');
  lines.push(prompt);
  lines.push('```');
  lines.push('');
  lines.push('---');
  lines.push('');
}

const output = lines.join('\n');

if (process.argv.includes('--stdout')) {
  process.stdout.write(output);
} else {
  const dest = path.resolve(__dirname, '../SYSTEM_PROMPT.md');
  fs.writeFileSync(dest, output, 'utf8');
  console.log(`✓ SYSTEM_PROMPT.md updated (${lines.length} lines, ${CONFIGS.length} variants)`);
}
