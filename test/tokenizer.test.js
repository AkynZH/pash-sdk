'use strict';

const { tokenize } = require('../src/tokenizer');

describe('tokenize', () => {
  test('обычная строка', () => {
    expect(tokenize('1|Смартфон|69990|Купить'))
      .toEqual(['1', 'Смартфон', '69990', 'Купить']);
  });

  test('экранированный пайп \\| не разбивает токен', () => {
    expect(tokenize('1|Быстро\\|Надёжно|69990'))
      .toEqual(['1', 'Быстро|Надёжно', '69990']);
  });

  test('два экранирования в одной строке', () => {
    expect(tokenize('1|A\\|B\\|C|end'))
      .toEqual(['1', 'A|B|C', 'end']);
  });

  test('пустые поля сохраняются', () => {
    expect(tokenize('1||69990|'))
      .toEqual(['1', '', '69990', '']);
  });

  test('одно поле без разделителей', () => {
    expect(tokenize('25')).toEqual(['25']);
  });

  test('пустая строка', () => {
    expect(tokenize('')).toEqual(['']);
  });

  test('только разделители', () => {
    expect(tokenize('||')).toEqual(['', '', '']);
  });

  test('числа и спецсимволы', () => {
    expect(tokenize('1|E = mc^2|69 990|★'))
      .toEqual(['1', 'E = mc^2', '69 990', '★']);
  });
});
