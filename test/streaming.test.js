'use strict';

const { StreamingDecoder } = require('../src/streaming');

describe('StreamingDecoder', () => {
  test('целая строка за один чанк', () => {
    const received = [];
    const d = new StreamingDecoder(c => received.push(c));
    d.push('1|Смартфон|AMOLED|69990|Купить\n');
    expect(received).toHaveLength(1);
    expect(received[0].type).toBe('ProductCard');
  });

  test('строка разбита на несколько чанков', () => {
    const received = [];
    const d = new StreamingDecoder(c => received.push(c));
    d.push('1|Смарт');
    d.push('фон|AMOLED');
    d.push('|69990|Купить\n');
    expect(received).toHaveLength(1);
    expect(received[0].fields.title).toBe('Смартфон');
  });

  test('несколько компонентов в одном чанке', () => {
    const received = [];
    const d = new StreamingDecoder(c => received.push(c));
    d.push('1|X|Y|100|Z\n2|info|OK\n');
    expect(received).toHaveLength(2);
  });

  test('flush добивает строку без \\n', () => {
    const received = [];
    const d = new StreamingDecoder(c => received.push(c));
    d.push('1|X|Y|100|Z');
    d.flush();
    expect(received).toHaveLength(1);
  });

  test('версионный заголовок не эмитит компонент', () => {
    const received = [];
    const d = new StreamingDecoder(c => received.push(c));
    d.push('v:1\n');
    d.push('1|X|Y|100|Z\n');
    expect(received).toHaveLength(1);
    expect(d.version).toBe('1');
  });

  test('пустые чанки не крашат', () => {
    const d = new StreamingDecoder(() => {});
    expect(() => { d.push(''); d.push('\n'); d.flush(); }).not.toThrow();
  });

  test('коллбэк получает version вторым аргументом', () => {
    const versions = [];
    const d = new StreamingDecoder((c, v) => versions.push(v));
    d.push('v:2\n1|X|Y|100|Z\n');
    expect(versions[0]).toBe('2');
  });
});
