'use strict';

const { tokenize }    = require('./tokenizer');
const { formatField } = require('./formatter');
const { SCHEMAS }     = require('./schema');

/**
 * PASH Parser
 *
 * parseLine(line, schemas?)   — разобрать одну строку → объект компонента
 * decodeStream(stream, schemas?) — разобрать полный поток → { version, components }
 *
 * Возвращаемый объект компонента:
 * {
 *   type:   string,               // 'ProductCard' | 'Notification' | 'unknown' | ...
 *   id:     number,               // числовой COMP_ID
 *   fields: Record<string, any>,  // { label: formatValue }
 * }
 *
 * Если COMP_ID неизвестен:
 * { type: 'unknown', id: number, raw: string }
 *
 * Вложенный компонент (поле начинается с #):
 * fields.desc = { type: 'Notification', id: 2, fields: { level, message } }
 */
function parseLine(line, schemas) {
  schemas = schemas || SCHEMAS;
  const tokens = tokenize(line.trim());
  return _parseTokens(tokens, 0, schemas).component;
}

/**
 * Разбирает компонент начиная с позиции offset в массиве tokens.
 * Возвращает { component, nextOffset } — чтобы родитель знал,
 * сколько токенов потребил вложенный компонент.
 */
function _parseTokens(tokens, offset, schemas) {
  const id     = parseInt(tokens[offset], 10);
  const schema = schemas[id];

  if (!schema) {
    return {
      component: { type: 'unknown', id, raw: tokens.slice(offset).join('|') },
      nextOffset: tokens.length,
    };
  }

  const fields = {};
  let pos = offset + 1; // позиция после COMP_ID

  for (const fieldDef of schema.fields) {
    const raw = pos < tokens.length ? tokens[pos] : '';

    if (raw.startsWith('#') && raw.length > 1) {
      // Вложенный компонент: #ID — следующие токены принадлежат ему
      // Подменяем tokens[pos] без '#' и рекурсивно парсим
      const nestedTokens = [raw.slice(1), ...tokens.slice(pos + 1)];
      const { component: nested, nextOffset: consumed } =
        _parseTokens(nestedTokens, 0, schemas);

      fields[fieldDef.label] = nested;
      // consumed — сколько токенов из nestedTokens использовал вложенный
      // consumed включает ID вложенного + его поля
      pos = pos + consumed; // пропускаем всё, что съел вложенный
    } else {
      fields[fieldDef.label] = formatField(raw, fieldDef);
      pos++;
    }
  }

  return {
    component: { type: schema.name, id, fields },
    nextOffset: pos - offset, // сколько токенов потребили начиная с offset
  };
}

/**
 * Декодирует полный PASH-поток.
 *
 * Опциональная первая строка "v:N" задаёт версию схемы.
 * Компоненты разделяются символом \n.
 * Пустые строки и строки с только пробелами — игнорируются.
 */
function decodeStream(stream, schemas) {
  schemas = schemas || SCHEMAS;

  let data    = String(stream ?? '').trim();
  let version = null;

  // Парсим версионный заголовок v:N
  if (data.startsWith('v:')) {
    const nl = data.indexOf('\n');
    if (nl !== -1) {
      version = data.slice(2, nl).trim();
      data    = data.slice(nl + 1);
    } else {
      // Только заголовок, нет компонентов
      return { version: data.slice(2).trim() || null, components: [] };
    }
  }

  const components = data
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => parseLine(l, schemas));

  return { version, components };
}

module.exports = { parseLine, decodeStream };
