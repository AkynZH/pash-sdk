'use strict';

/**
 * PASH Tokenizer
 *
 * Разбивает строку PASH по разделителю | с учётом экранирования \|
 *
 * "1|Смартфон|69\|990|Купить"  →  ["1", "Смартфон", "69|990", "Купить"]
 * "25"                          →  ["25"]   (Divider — нет полей)
 * "1||69990|"                   →  ["1", "", "69990", ""]
 */
function tokenize(line) {
  const tokens = [];
  let cur = '';

  for (let i = 0; i < line.length; i++) {
    if (line[i] === '\\' && i + 1 < line.length && line[i + 1] === '|') {
      cur += '|';
      i++;
    } else if (line[i] === '|') {
      tokens.push(cur);
      cur = '';
    } else {
      cur += line[i];
    }
  }

  tokens.push(cur);
  return tokens;
}

module.exports = { tokenize };
