'use strict';

const { parseLine, decodeStream } = require('../src/parser');
const { renderStream }            = require('../src/renderer');
const { validateStream }          = require('../src/validator');

describe('Edge cases — парсер', () => {
  test('пустая строка', () => {
    expect(decodeStream('').components).toHaveLength(0);
  });

  test('только пробелы и переносы', () => {
    expect(decodeStream('   \n  \n  ').components).toHaveLength(0);
  });

  test('лишние поля игнорируются', () => {
    const n = parseLine('1|X1|AMOLED|69990|Купить|extra1|extra2');
    expect(n.type).toBe('ProductCard');
    expect(n.fields.title).toBe('X1');
  });

  test('недостающие поля → пустые строки', () => {
    const n = parseLine('1|Только заголовок');
    expect(n.fields.desc).toBe('');
    expect(n.fields.cta).toBe('');
  });

  test('Unicode emoji в значениях', () => {
    const n = parseLine('1|Смартфон 📱|AMOLED|69990|Купить 🛒');
    expect(n.fields.title).toBe('Смартфон 📱');
    expect(n.fields.cta).toBe('Купить 🛒');
  });

  test('экранированный пайп в значении', () => {
    const n = parseLine('1|Быстро\\|Надёжно|AMOLED|69990|Купить');
    expect(n.fields.title).toBe('Быстро|Надёжно');
  });

  test('битый COMP_ID (строка)', () => {
    const n = parseLine('abc|данные');
    expect(n.type).toBe('unknown');
  });

  test('отрицательный COMP_ID', () => {
    const n = parseLine('-1|данные');
    expect(n.type).toBe('unknown');
  });

  test('очень длинное значение не крашит', () => {
    const long = 'A'.repeat(10000);
    const n    = parseLine(`1|${long}|desc|100|cta`);
    expect(n.fields.title).toHaveLength(10000);
  });

  test('только заголовок версии → пустые компоненты', () => {
    const r = decodeStream('v:5');
    expect(r.components).toHaveLength(0);
  });
});

describe('Edge cases — рендерер', () => {
  test('null компонент → пустая строка', () => {
    const { renderComponent } = require('../src/renderer');
    expect(renderComponent(null)).toBe('');
  });

  test('renderStream с undefined → пустая строка', () => {
    expect(renderStream(undefined)).toBe('');
    expect(renderStream(null)).toBe('');
  });

  test('битый поток не крашит pipeline', () => {
    const bad = 'не PASH\n99|unknown\n1|X|Y|100|Z';
    expect(() => renderStream(decodeStream(bad))).not.toThrow();
  });

  test('XSS во всех полях нейтрализуется', () => {
    const xss = '1|<img onerror=x>|<b>|100|<script>';
    const html = renderStream(decodeStream(xss));
    expect(html).not.toContain('<img onerror');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;');
  });
});

describe('Edge cases — валидатор', () => {
  test('поток с хорошими и плохими компонентами', () => {
    const r = validateStream(decodeStream('1|X|Y|100|Z\n99|плохой'));
    expect(r[0].valid).toBe(true);
    expect(r[1].valid).toBe(false);
  });
});
