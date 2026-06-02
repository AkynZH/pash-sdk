#!/usr/bin/env node
'use strict';

const { decodeStream }         = require('../src/parser');
const { encodeStream }         = require('../src/encoder');
const { validateStream }       = require('../src/validator');
const { renderStream }         = require('../src/renderer');
const { pashToEvents }         = require('../src/events');
const { VERSION }              = require('../src/version');

const HELP = `
pash v${VERSION} — CLI for Protocol for Agentic Semantic Hypermedia

Usage:
  echo "1|Смартфон X1|AMOLED|69990|Купить" | pash decode
  echo "1|Смартфон X1|AMOLED|69990|Купить" | pash validate
  echo "1|Смартфон X1|AMOLED|69990|Купить" | pash render
  echo "1|Смартфон X1|AMOLED|69990|Купить" | pash events
  pash prompt [--lang ru|en] [--mode pash|pash+id|events]
  pash version
  pash help

Commands:
  decode    Parse PASH stream → JSON
  validate  Validate stream against schema
  render    Stream → HTML
  events    Convert to Event Stream format
  prompt    Generate system prompt for LLM
  version   Show version
  help      Show this help
`.trim();

const [,, cmd, ...flags] = process.argv;

function parseFlags(arr) {
  const out = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith('--')) {
      out[arr[i].slice(2)] = arr[i + 1] ?? true;
      i++;
    }
  }
  return out;
}

function readStdin() {
  return new Promise(resolve => {
    if (process.stdin.isTTY) return resolve('');
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', c => { data += c; });
    process.stdin.on('end',  () => resolve(data.trim()));
  });
}

async function run() {
  const opts = parseFlags(flags);

  switch (cmd) {

    case 'decode': {
      const input = await readStdin();
      if (!input) { console.error('No input. Pipe a PASH stream.'); process.exit(1); }
      const decoded = decodeStream(input);
      console.log(JSON.stringify(decoded, null, 2));
      break;
    }

    case 'validate': {
      const input = await readStdin();
      if (!input) { console.error('No input.'); process.exit(1); }
      const decoded = decodeStream(input);
      const results = validateStream(decoded);
      let ok = true;
      for (const r of results) {
        if (r.valid) {
          console.log(`✓ [${r.index}] ${r.type}`);
        } else {
          console.error(`✗ [${r.index}] ${r.type}`);
          r.errors.forEach(e => console.error(`  → ${e}`));
          ok = false;
        }
      }
      if (!results.length) console.log('(empty stream)');
      process.exit(ok ? 0 : 1);
    }

    case 'render': {
      const input = await readStdin();
      if (!input) { console.error('No input.'); process.exit(1); }
      const decoded = decodeStream(input);
      console.log(renderStream(decoded));
      break;
    }

    case 'events': {
      const input = await readStdin();
      if (!input) { console.error('No input.'); process.exit(1); }
      console.log(pashToEvents(input));
      break;
    }

    case 'prompt': {
      let promptPkg;
      try {
        promptPkg = require('@pash/prompt');
      } catch {
        console.error(
          'Error: @pash/prompt is not installed.\n' +
          'Run: npm install @pash/prompt\n' +
          '\n' +
          'Note: generateSystemPrompt was moved to @pash/prompt\n' +
          'because pash-sdk is LLM-agnostic (does not contain prompt logic).'
        );
        process.exit(1);
      }
      const { SCHEMAS } = require('../src/schema');
      const lang = opts.lang || 'ru';
      const mode = opts.mode || 'pash';
      const { PromptEngine } = promptPkg;
      const engine = new PromptEngine({ schemas: SCHEMAS });
      console.log(engine.generate({ lang, mode }));
      break;
    }

    case 'version':
      console.log(`pash-sdk v${VERSION}`);
      break;

    case 'help':
    case undefined:
      console.log(HELP);
      break;

    default:
      console.error(`Unknown command: ${cmd}\nRun: pash help`);
      process.exit(1);
  }
}

run().catch(e => { console.error(e.message); process.exit(1); });
