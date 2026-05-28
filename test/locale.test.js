'use strict';

const { setLocale, getLocale, addLocale, formatCurrency, formatDate, formatPercent } = require('../src/locale');

afterEach(() => setLocale('ru-RU'));

describe('formatCurrency', () => {
  test('ru-RU: число с пробелом и ₽ после', () => {
    const r = formatCurrency(69990);
    expect(r).toContain('₽');
    expect(r).toContain('69');
    expect(r.indexOf('₽')).toBeGreaterThan(0); // ₽ после числа
  });

  test('en-US: $ перед числом', () => {
    setLocale('en-US');
    const r = formatCurrency(69990);
    expect(r.startsWith('$')).toBe(true);
  });

  test('de-DE: € после числа', () => {
    setLocale('de-DE');
    const r = formatCurrency(69990);
    expect(r).toContain('€');
  });

  test('не число → возвращает как есть', () => {
    expect(formatCurrency('по запросу')).toBe('по запросу');
  });

  test('отрицательное число', () => {
    expect(formatCurrency(-100)).toContain('-');
  });
});

describe('formatDate', () => {
  test('ru-RU: DD.MM.YYYY', () => {
    expect(formatDate('2025-01-15')).toBe('15.01.2025');
  });

  test('en-US: MM/DD/YYYY', () => {
    setLocale('en-US');
    expect(formatDate('2025-01-15')).toBe('01/15/2025');
  });

  test('невалидная дата → строка как есть', () => {
    expect(formatDate('не дата')).toBe('не дата');
  });
});

describe('formatPercent', () => {
  test('число + символ %', () => {
    expect(formatPercent(12.5)).toBe('12.5%');
  });

  test('строка-число', () => {
    expect(formatPercent('99')).toBe('99%');
  });
});

describe('setLocale / getLocale', () => {
  test('getLocale возвращает активную локаль', () => {
    setLocale('en-US');
    const loc = getLocale();
    expect(loc.currency).toBe('$');
    expect(loc.code).toBe('en-US');
  });

  test('неизвестная локаль бросает ошибку', () => {
    expect(() => setLocale('xx-XX')).toThrow(/Неизвестная локаль/);
  });
});

describe('addLocale', () => {
  afterEach(() => setLocale('ru-RU'));

  test('добавляет новую локаль', () => {
    addLocale('fr-FR', {
      currency: '€', currencyPos: 'after',
      thousandsSep: ' ', decimalSep: ',',
      dateFormat: 'DD/MM/YYYY', percentSym: '%',
    });
    setLocale('fr-FR');
    expect(formatCurrency(100)).toContain('€');
  });

  test('без обязательных полей бросает ошибку', () => {
    expect(() => addLocale('test', {})).toThrow();
  });
});
