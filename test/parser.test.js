'use strict';

const { parseLine, decodeStream } = require('../src/parser');

describe('parseLine — UI компоненты', () => {
  test('ProductCard', () => {
    const n = parseLine('1|Смартфон X1|AMOLED|69990|Купить');
    expect(n.type).toBe('ProductCard');
    expect(n.id).toBe(1);
    expect(n.fields.title).toBe('Смартфон X1');
    expect(n.fields.desc).toBe('AMOLED');
    expect(n.fields.price).toContain('₽');
    expect(n.fields.cta).toBe('Купить');
  });

  test('Notification', () => {
    const n = parseLine('2|warn|Последний в наличии');
    expect(n.type).toBe('Notification');
    expect(n.fields.level).toBe('warn');
    expect(n.fields.message).toBe('Последний в наличии');
  });

  test('List — items как массив', () => {
    const n = parseLine('3|Хар-ки|AMOLED,256GB,5000mAh');
    expect(n.type).toBe('List');
    expect(n.fields.items).toEqual(['AMOLED', '256GB', '5000mAh']);
  });

  test('Hero', () => {
    const n = parseLine('4|Флагман|Best 2025|Смотреть');
    expect(n.type).toBe('Hero');
    expect(n.fields.headline).toBe('Флагман');
  });
});

describe('parseLine — Doc блоки', () => {
  test('Heading', () => {
    const n = parseLine('20|2|Подзаголовок');
    expect(n.type).toBe('Heading');
    expect(n.fields.level).toBe('2');
    expect(n.fields.text).toBe('Подзаголовок');
  });

  test('Paragraph (richtext)', () => {
    const n = parseLine('21|Текст с **жирным**');
    expect(n.type).toBe('Paragraph');
    expect(n.fields.text).toBe('Текст с **жирным**');
  });

  test('Code', () => {
    const n = parseLine('22|python|print("hello")');
    expect(n.type).toBe('Code');
    expect(n.fields.lang).toBe('python');
    expect(n.fields.body).toBe('print("hello")');
  });

  test('Divider — нет полей', () => {
    const n = parseLine('25');
    expect(n.type).toBe('Divider');
    expect(Object.keys(n.fields)).toHaveLength(0);
  });

  test('Table', () => {
    const n = parseLine('26|Год,Узлы|1969,4;1970,9');
    expect(n.type).toBe('Table');
    expect(n.fields.headers).toEqual(['Год', 'Узлы']);
    expect(n.fields.rows).toBe('1969,4;1970,9');
  });

  test('Note — все уровни', () => {
    ['info','tip','warn','danger'].forEach(lvl => {
      const n = parseLine(`29|${lvl}|Текст`);
      expect(n.fields.level).toBe(lvl);
    });
  });

  test('Spoiler', () => {
    const n = parseLine('30|Показать|Содержимое спойлера');
    expect(n.type).toBe('Spoiler');
    expect(n.fields.title).toBe('Показать');
  });

  test('Math', () => {
    const n = parseLine('31|block|E = mc^2');
    expect(n.type).toBe('Math');
    expect(n.fields.formula).toBe('E = mc^2');
  });
});

describe('parseLine — особые случаи', () => {
  test('неизвестный ID → type: unknown', () => {
    const n = parseLine('99|данные');
    expect(n.type).toBe('unknown');
    expect(n.id).toBe(99);
    expect(n.raw).toBe('99|данные');
  });

  test('вложенный компонент через #', () => {
    const n = parseLine('1|X1|#2|warn|Мало|69990|Купить');
    expect(n.fields.desc.type).toBe('Notification');
    expect(n.fields.desc.fields.level).toBe('warn');
    expect(n.fields.desc.fields.message).toBe('Мало');
  });

  test('лишние поля игнорируются', () => {
    const n = parseLine('1|X1|desc|100|cta|extra1|extra2');
    expect(n.type).toBe('ProductCard');
    expect(n.fields.title).toBe('X1');
  });

  test('недостающие поля → пустая строка', () => {
    const n = parseLine('1|X1');
    expect(n.fields.desc).toBe('');
    expect(n.fields.cta).toBe('');
  });
});

describe('decodeStream', () => {
  test('один компонент', () => {
    const r = decodeStream('1|X1|AMOLED|69990|Купить');
    expect(r.version).toBeNull();
    expect(r.components).toHaveLength(1);
    expect(r.components[0].type).toBe('ProductCard');
  });

  test('версионированный поток', () => {
    const r = decodeStream('v:1\n1|X1|AMOLED|69990|Купить');
    expect(r.version).toBe('1');
    expect(r.components).toHaveLength(1);
  });

  test('несколько компонентов', () => {
    const r = decodeStream('1|X1|AMOLED|69990|Купить\n2|info|OK');
    expect(r.components).toHaveLength(2);
    expect(r.components[1].type).toBe('Notification');
  });

  test('пустые строки игнорируются', () => {
    const r = decodeStream('\n1|X1|AMOLED|69990|Купить\n\n');
    expect(r.components).toHaveLength(1);
  });

  test('пустой поток', () => {
    const r = decodeStream('');
    expect(r.version).toBeNull();
    expect(r.components).toHaveLength(0);
  });

  test('только заголовок версии без компонентов', () => {
    const r = decodeStream('v:2');
    expect(r.components).toHaveLength(0);
  });
});
