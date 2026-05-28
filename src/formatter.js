'use strict';

const locale             = require('./locale');
const { Dictionary, defaultDictionary } = require('./dictionary');

/**
 * PASH Formatter
 *
 * Форматирует значение поля по его схемному определению.
 * Вызывается парсером после токенизации.
 *
 * Поддерживаемые типы:
 *   string   — возвращает как есть
 *   number   — форматирует по format: currency | date | percent
 *   list     — разбивает по запятой → массив строк
 *   enum     — проверяет допустимость, fallback на первый элемент
 *   richtext — возвращает как есть (рендерится отдельно через richtext.js)
 *   component — обрабатывается рекурсивно в parser.js
 *
 * PASH+ID: если значение — числовой ID и defaultDictionary содержит его → резолвим.
 */
function formatField(value, fieldDef) {
  if (!fieldDef) return String(value ?? '');

  const { type, format, values: enumValues } = fieldDef;
  let v = String(value ?? '');

  // PASH+ID тир: числовой ID → текст через defaultDictionary
  if (Dictionary.isId(v) && type !== 'number') {
    const resolved = defaultDictionary.resolve(v);
    if (resolved !== `[${v}]`) v = resolved;
  }

  switch (type) {
    case 'number':
      if (format === 'currency') return locale.formatCurrency(v);
      if (format === 'date')     return locale.formatDate(v);
      if (format === 'percent')  return locale.formatPercent(v);
      return v;

    case 'list':
      return v.split(',').map(s => s.trim()).filter(Boolean);

    case 'enum':
      // Возвращаем как есть — валидатор поймает недопустимые значения
      return v;

    case 'richtext':
      // Передаём как есть — рендерится через renderRichtext() в renderer.js
      return v;

    case 'string':
    default:
      return v;
  }
}

module.exports = { formatField };
