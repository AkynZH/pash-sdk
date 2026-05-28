'use strict';

const { formatField }   = require('../src/formatter');
const { setLocale }     = require('../src/locale');
const { defaultDictionary } = require('../src/dictionary');

afterEach(() => {
  setLocale('ru-RU');
  defaultDictionary.delete(999);
});

describe('formatField — string', () => {
  test('возвращает строку как есть', () => {
    expect(formatField('Привет', { type: 'string', label: 'x' })).toBe('Привет');
  });
  test('null → пустая строка', () => {
    expect(formatField(null, { type: 'string', label: 'x' })).toBe('');
  });
});

describe('formatField — number / currency', () => {
  test('ru-RU: форматирует с пробелом и ₽', () => {
    const r = formatField('69990', { type: 'number', format: 'currency', label: 'price' });
    expect(r).toContain('₽');
    expect(r).toContain('69');
  });
  test('en-US: форматирует с $', () => {
    setLocale('en-US');
    const r = formatField('1299', { type: 'number', format: 'currency', label: 'price' });
    expect(r).toContain('$');
  });
  test('не число → возвращает как есть', () => {
    expect(formatField('по запросу', { type: 'number', format: 'currency', label: 'price' }))
      .toBe('по запросу');
  });
});

describe('formatField — list', () => {
  test('разбивает по запятой', () => {
    expect(formatField('AMOLED,256GB,5000mAh', { type: 'list', label: 'items' }))
      .toEqual(['AMOLED', '256GB', '5000mAh']);
  });
  test('трimmит пробелы', () => {
    expect(formatField(' A , B , C ', { type: 'list', label: 'items' }))
      .toEqual(['A', 'B', 'C']);
  });
  test('фильтрует пустые', () => {
    expect(formatField('A,,B', { type: 'list', label: 'items' }))
      .toEqual(['A', 'B']);
  });
});

describe('formatField — enum', () => {
  const def = { type: 'enum', label: 'level', values: ['info', 'warn', 'error'] };

  test('допустимое значение возвращается как есть', () => {
    expect(formatField('warn', def)).toBe('warn');
  });

  test('недопустимое значение возвращается как есть (валидатор поймает)', () => {
    expect(formatField('critical', def)).toBe('critical');
  });

  test('пустое значение возвращается как есть', () => {
    expect(formatField('', def)).toBe('');
  });
});

describe('formatField — richtext', () => {
  test('передаётся как есть', () => {
    const r = formatField('Текст с **жирным**', { type: 'richtext', label: 'text' });
    expect(r).toBe('Текст с **жирным**');
  });
});

describe('formatField — PASH+ID через defaultDictionary', () => {
  test('числовой ID резолвится если есть в словаре', () => {
    defaultDictionary.set(999, 'Смартфон X1');
    const r = formatField('999', { type: 'string', label: 'title' });
    expect(r).toBe('Смартфон X1');
  });
  test('числовой ID без словаря → оставляет как есть (fallback)', () => {
    // ID 888 не добавляли
    const r = formatField('888', { type: 'string', label: 'title' });
    // defaultDictionary.resolve вернёт "[888]" — не будет резолвиться
    expect(r).toBe('888');
  });
});
