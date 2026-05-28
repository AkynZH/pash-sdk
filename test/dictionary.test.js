'use strict';

const { Dictionary, defaultDictionary } = require('../src/dictionary');

describe('Dictionary', () => {
  test('resolve существующего ID', () => {
    const d = new Dictionary({ 102: 'Смартфон X1', 12: 'Купить' });
    expect(d.resolve(102)).toBe('Смартфон X1');
    expect(d.resolve('102')).toBe('Смартфон X1');
  });

  test('resolve несуществующего → fallback [id]', () => {
    const d = new Dictionary({});
    expect(d.resolve(999)).toBe('[999]');
  });

  test('reverseResolve text → id', () => {
    const d = new Dictionary({ 102: 'Смартфон X1' });
    expect(d.reverseResolve('Смартфон X1')).toBe('102');
  });

  test('reverseResolve не найдено → null', () => {
    const d = new Dictionary({});
    expect(d.reverseResolve('Нет в словаре')).toBeNull();
  });

  test('set добавляет запись', () => {
    const d = new Dictionary({});
    d.set(5, 'Тест');
    expect(d.resolve(5)).toBe('Тест');
  });

  test('load загружает пакет', () => {
    const d = new Dictionary({});
    d.load({ 10: 'A', 20: 'B' });
    expect(d.resolve(10)).toBe('A');
    expect(d.resolve(20)).toBe('B');
  });

  test('delete удаляет запись', () => {
    const d = new Dictionary({ 5: 'Привет' });
    d.delete(5);
    expect(d.resolve(5)).toBe('[5]');
  });

  test('size возвращает количество записей', () => {
    const d = new Dictionary({ 1: 'a', 2: 'b', 3: 'c' });
    expect(d.size).toBe(3);
  });

  test('Dictionary.isId — числовые строки', () => {
    expect(Dictionary.isId('102')).toBe(true);
    expect(Dictionary.isId(102)).toBe(true);
    expect(Dictionary.isId('Смартфон')).toBe(false);
    expect(Dictionary.isId('12abc')).toBe(false);
    expect(Dictionary.isId('')).toBe(false);
    expect(Dictionary.isId(null)).toBe(false);
  });

  test('set с undefined id бросает ошибку', () => {
    const d = new Dictionary({});
    expect(() => d.set(undefined, 'x')).toThrow();
  });
});

describe('defaultDictionary', () => {
  afterEach(() => defaultDictionary.delete(9999));

  test('экспортируется как singleton', () => {
    expect(defaultDictionary).toBeInstanceOf(Dictionary);
  });

  test('можно добавлять записи', () => {
    defaultDictionary.set(9999, 'Тест');
    expect(defaultDictionary.resolve(9999)).toBe('Тест');
  });
});
