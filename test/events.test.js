'use strict';

const { parseEvent, EventStreamDecoder, pashToEvents } = require('../src/events');
const { Dictionary } = require('../src/dictionary');

describe('parseEvent', () => {
  test('TEXT',       () => expect(parseEvent('TEXT(Смартфон X1)')).toEqual({ type: 'TEXT', value: 'Смартфон X1' }));
  test('PRICE',      () => expect(parseEvent('PRICE(69990)')).toEqual({ type: 'PRICE', value: '69990' }));
  test('COMP_START', () => expect(parseEvent('COMP_START(1)')).toEqual({ type: 'COMP_START', value: '1' }));
  test('COMP_END',   () => expect(parseEvent('COMP_END(1)')).toEqual({ type: 'COMP_END', value: '1' }));
  test('LIST',       () => expect(parseEvent('LIST(A,B,C)')).toEqual({ type: 'LIST', value: 'A,B,C' }));
  test('ENUM',       () => expect(parseEvent('ENUM(warn)')).toEqual({ type: 'ENUM', value: 'warn' }));
  test('RICHTEXT',   () => expect(parseEvent('RICHTEXT(текст **жирный**)')).toMatchObject({ type: 'RICHTEXT' }));
  test('битая строка → UNKNOWN', () => expect(parseEvent('не событие')).toMatchObject({ type: 'UNKNOWN' }));
});

describe('EventStreamDecoder', () => {
  test('собирает ProductCard', () => {
    const received = [];
    const d = new EventStreamDecoder({ onComponent: c => received.push(c) });
    ['COMP_START(1)', 'TEXT(Смартфон X1)', 'TEXT(AMOLED)', 'PRICE(69990)', 'TEXT(Купить)', 'COMP_END(1)']
      .forEach(e => d.push(e + '\n'));
    expect(received).toHaveLength(1);
    expect(received[0].type).toBe('ProductCard');
    expect(received[0].fields.title).toBe('Смартфон X1');
    expect(received[0].fields.price).toContain('₽');
  });

  test('TEXT_ID резолвится через dictionary', () => {
    const received = [];
    const dict = new Dictionary({ 102: 'Смартфон X1', 12: 'Купить' });
    const d = new EventStreamDecoder({ onComponent: c => received.push(c), dictionary: dict });
    ['COMP_START(1)', 'TEXT_ID(102)', 'TEXT(AMOLED)', 'PRICE(69990)', 'TEXT_ID(12)', 'COMP_END(1)']
      .forEach(e => d.push(e + '\n'));
    expect(received[0].fields.title).toBe('Смартфон X1');
    expect(received[0].fields.cta).toBe('Купить');
  });

  test('onField вызывается на каждое поле', () => {
    const fields = [];
    const d = new EventStreamDecoder({ onField: f => fields.push(f) });
    ['COMP_START(2)', 'ENUM(warn)', 'TEXT(Мало)', 'COMP_END(2)'].forEach(e => d.push(e + '\n'));
    expect(fields).toHaveLength(2);
    expect(fields[0].label).toBe('level');
  });

  test('поток разбит на чанки', () => {
    const received = [];
    const d = new EventStreamDecoder({ onComponent: c => received.push(c) });
    d.push('COMP_START(1)\nTEXT(X');
    d.push('1)\nTEXT(Y)\nPRICE(100)\nTEXT(Z)\n');
    d.push('COMP_END(1)\n');
    expect(received).toHaveLength(1);
    expect(received[0].fields.title).toBe('X1');
  });

  test('flush добивает последнее событие', () => {
    const received = [];
    const d = new EventStreamDecoder({ onComponent: c => received.push(c) });
    ['COMP_START(2)', 'ENUM(info)', 'TEXT(OK)'].forEach(e => d.push(e + '\n'));
    d.push('COMP_END(2)');
    d.flush();
    expect(received).toHaveLength(1);
  });
});

describe('pashToEvents', () => {
  test('конвертирует PASH → Event Stream', () => {
    const events = pashToEvents('1|Смартфон|AMOLED|69990|Купить');
    expect(events).toContain('COMP_START(1)');
    expect(events).toContain('COMP_END(1)');
    expect(events).toContain('TEXT(Смартфон)');
    expect(events).toContain('PRICE(');
  });
});
