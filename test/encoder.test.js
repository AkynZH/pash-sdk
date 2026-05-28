'use strict';

const { encode, encodeStream } = require('../src/encoder');
const { decodeStream }         = require('../src/parser');
const { Dictionary }           = require('../src/dictionary');

describe('encode', () => {
  test('ProductCard → строка PASH', () => {
    const s = encode({ type: 'ProductCard', fields: { title: 'X1', desc: 'AMOLED', price: '69990', cta: 'Купить' } });
    expect(s).toBe('1|X1|AMOLED|69990|Купить');
  });

  test('пустые поля → пустые значения, разделители сохраняются', () => {
    const s = encode({ type: 'ProductCard', fields: { title: 'X1' } });
    expect(s).toBe('1|X1|||');
  });

  test('пайп в значении экранируется', () => {
    const s = encode({ type: 'ProductCard', fields: { title: 'A|B', desc: '', price: '', cta: '' } });
    expect(s).toContain('A\\|B');
  });

  test('список → через запятую', () => {
    const s = encode({ type: 'List', fields: { title: 'Хар-ки', items: ['AMOLED', '256GB'] } });
    expect(s).toBe('3|Хар-ки|AMOLED,256GB');
  });

  test('Divider — нет полей', () => {
    const s = encode({ type: 'Divider', fields: {} });
    expect(s).toBe('25|');
  });

  test('PASH+ID: текст → словарный ID', () => {
    const dict = new Dictionary({ 102: 'Смартфон X1', 12: 'Купить' });
    const s = encode(
      { type: 'ProductCard', fields: { title: 'Смартфон X1', desc: 'AMOLED', price: '69990', cta: 'Купить' } },
      { useIds: true, dict }
    );
    expect(s).toContain('102');
    expect(s).toContain('12');
  });

  test('неизвестный тип → бросает ошибку', () => {
    expect(() => encode({ type: 'NonExistent', fields: {} })).toThrow();
  });

  test('round-trip: encode → decode', () => {
    const original = { type: 'ProductCard', fields: { title: 'X1', desc: 'AMOLED', price: '69990', cta: 'Купить' } };
    const encoded  = encode(original);
    const decoded  = decodeStream(encoded);
    expect(decoded.components[0].type).toBe('ProductCard');
    expect(decoded.components[0].fields.title).toBe('X1');
  });
});

describe('encodeStream', () => {
  test('несколько компонентов → несколько строк', () => {
    const s = encodeStream([
      { type: 'ProductCard',  fields: { title: 'X1', desc: 'Y', price: '100', cta: 'Z' } },
      { type: 'Notification', fields: { level: 'info', message: 'OK' } },
    ]);
    expect(s.split('\n')).toHaveLength(2);
  });

  test('с версией → первая строка v:N', () => {
    const s = encodeStream(
      [{ type: 'Notification', fields: { level: 'info', message: 'OK' } }],
      { version: '1' }
    );
    expect(s.startsWith('v:1\n')).toBe(true);
  });

  test('round-trip: encodeStream → decodeStream', () => {
    const components = [
      { type: 'ProductCard',  fields: { title: 'X1', desc: 'Y', price: '100', cta: 'Z' } },
      { type: 'Notification', fields: { level: 'warn', message: 'Мало' } },
    ];
    const stream  = encodeStream(components, { version: '1' });
    const decoded = decodeStream(stream);
    expect(decoded.version).toBe('1');
    expect(decoded.components[0].type).toBe('ProductCard');
    expect(decoded.components[1].fields.level).toBe('warn');
  });
});
