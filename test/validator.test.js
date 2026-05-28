'use strict';

const { validateComponent, validateStream } = require('../src/validator');
const { parseLine, decodeStream }           = require('../src/parser');

describe('validateComponent', () => {
  test('валидный ProductCard', () => {
    const r = validateComponent(parseLine('1|Смартфон X1|AMOLED|69990|Купить'));
    expect(r.valid).toBe(true);
    expect(r.errors).toHaveLength(0);
  });

  test('неизвестный тип → invalid', () => {
    const r = validateComponent({ type: 'unknown', id: 99, raw: '99|x' });
    expect(r.valid).toBe(false);
    expect(r.errors[0]).toMatch(/99/);
  });

  test('пустой компонент → invalid', () => {
    expect(validateComponent(null).valid).toBe(false);
  });

  test('required поле пустое → invalid', () => {
    const n = parseLine('1||AMOLED|69990|Купить'); // title пустой
    const r = validateComponent(n);
    expect(r.valid).toBe(false);
    expect(r.errors[0]).toMatch(/title/);
  });

  test('required поле присутствует → valid', () => {
    const n = parseLine('1|Название|AMOLED|69990|Купить');
    expect(validateComponent(n).valid).toBe(true);
  });

  test('недопустимый enum уровень', () => {
    const n = parseLine('2|critical|Сообщение');
    const r = validateComponent(n);
    expect(r.valid).toBe(false);
    expect(r.errors[0]).toMatch(/level/);
  });

  test('допустимые enum уровни', () => {
    ['info','warn','error'].forEach(lvl => {
      expect(validateComponent(parseLine(`2|${lvl}|OK`)).valid).toBe(true);
    });
  });

  test('richtext-поле не валидируется на содержимое', () => {
    expect(validateComponent(parseLine('21|Любой **текст**')).valid).toBe(true);
  });

  test('Divider (нет полей) → valid', () => {
    expect(validateComponent(parseLine('25')).valid).toBe(true);
  });

  test('Heading валидный level', () => {
    expect(validateComponent(parseLine('20|3|Заголовок')).valid).toBe(true);
  });

  test('Heading невалидный level', () => {
    const n = parseLine('20|9|Заголовок');
    expect(validateComponent(n).valid).toBe(false);
  });

  test('Note допустимые уровни', () => {
    ['info','tip','warn','danger'].forEach(lvl => {
      expect(validateComponent(parseLine(`29|${lvl}|Текст`)).valid).toBe(true);
    });
  });
});

describe('validateStream', () => {
  test('полностью валидный поток', () => {
    const r = validateStream(decodeStream('1|X1|AMOLED|69990|Купить\n2|info|OK'));
    expect(r.every(x => x.valid)).toBe(true);
  });

  test('возвращает индексы компонентов', () => {
    const r = validateStream(decodeStream('1|X1|AMOLED|69990|Купить\n99|плохой'));
    expect(r[0].index).toBe(0);
    expect(r[1].index).toBe(1);
    expect(r[1].valid).toBe(false);
  });

  test('пустой поток → пустой массив', () => {
    expect(validateStream(decodeStream(''))).toHaveLength(0);
  });
});
