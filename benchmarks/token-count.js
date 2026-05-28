#!/usr/bin/env node
'use strict';

/**
 * PASH Token Benchmark
 *
 * Реальные замеры токенов через tiktoken (GPT-4 BPE).
 *
 * Установка: npm install tiktoken  (в /benchmarks)
 * Запуск:    npm run benchmark
 */

let enc;
try {
  const tiktoken = require('tiktoken');
  enc = tiktoken.encoding_for_model('gpt-4');
} catch {
  console.error('tiktoken не установлен. Запусти: npm install tiktoken');
  console.error('Используем грубую оценку (chars / 4)...\n');
  enc = { encode: (s) => ({ length: Math.ceil(s.replace(/\s+/g,' ').length / 4) }), free: () => {} };
}

const { encodeStream } = require('../src/encoder');

// ─── Данные: одна карточка товара ────────────────────────────────────────────

const COMPONENT = {
  type:   'ProductCard',
  fields: { title: 'Смартфон X1', desc: 'AMOLED 120Hz, 256GB', price: '69990', cta: 'Купить' },
};

const PASH_STREAM = encodeStream([COMPONENT]);

const FORMATS = {
  'XML':        `<ProductCard><title>Смартфон X1</title><desc>AMOLED 120Hz, 256GB</desc><price>69990</price><cta>Купить</cta></ProductCard>`,
  'HTML':       `<div class="product-card"><h3>Смартфон X1</h3><p>AMOLED 120Hz, 256GB</p><span class="price">69990</span><button>Купить</button></div>`,
  'JSON':       `{"type":"ProductCard","title":"Смартфон X1","desc":"AMOLED 120Hz, 256GB","price":69990,"cta":"Купить"}`,
  'YAML':       `type: ProductCard\ntitle: Смартфон X1\ndesc: AMOLED 120Hz, 256GB\nprice: 69990\ncta: Купить`,
  'Markdown':   `### Смартфон X1\n**AMOLED 120Hz, 256GB**\nЦена: 69990\n[Купить](#)`,
  'CHTML 1.0':  `[P]Смартфон X1\n[-]AMOLED 120Hz, 256GB\n[$]69990 [B]Купить`,
  'PASH':       PASH_STREAM,
  'PASH+ID':    `1|102|45|69990|12`,
};

// ─── Замер ────────────────────────────────────────────────────────────────────

const results = Object.entries(FORMATS).map(([name, text]) => ({
  name,
  tokens: enc.encode(text).length,
  chars:  text.length,
})).sort((a, b) => b.tokens - a.tokens);

const baseline = results.find(r => r.name === 'HTML').tokens;

console.log('\n┌──────────────┬────────┬────────┬──────────────────────┐');
console.log('│ Формат       │ Токены │  Chars │ vs HTML              │');
console.log('├──────────────┼────────┼────────┼──────────────────────┤');

for (const r of results) {
  const saving = r.name === 'HTML' ? 'baseline'
    : `−${Math.round((1 - r.tokens / baseline) * 100)}%`;
  console.log(
    `│ ${r.name.padEnd(12)} │   ${String(r.tokens).padStart(3)}  │   ${String(r.chars).padStart(3)}  │ ${saving.padEnd(20)} │`
  );
}
console.log('└──────────────┴────────┴────────┴──────────────────────┘\n');

// ─── Многокомпонентный тест ───────────────────────────────────────────────────

console.log('Многокомпонентный поток (3 компонента):');
console.log('─'.repeat(50));

const multi = [
  COMPONENT,
  { type: 'Notification', fields: { level: 'warn', message: 'Последний в наличии' } },
  { type: 'List',         fields: { title: 'Хар-ки', items: ['AMOLED', '256GB', '5000mAh'] } },
];

const multiPASH = encodeStream(multi);
const multiJSON  = JSON.stringify(multi);

const pt = enc.encode(multiPASH).length;
const jt = enc.encode(multiJSON).length;

console.log(`PASH: ${pt} токенов`);
console.log(`      ${multiPASH}`);
console.log(`JSON: ${jt} токенов`);
console.log(`Экономия: −${Math.round((1 - pt / jt) * 100)}%\n`);

enc.free();
