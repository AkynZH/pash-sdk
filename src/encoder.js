'use strict';

const { SCHEMAS }  = require('./schema');
const { Dictionary } = require('./dictionary');

/**
 * PASH Encoder
 *
 * encode(component, options?)      — объект компонента → строка PASH
 * encodeStream(components, options?) — массив компонентов → поток PASH
 *
 * options:
 *   useIds  {boolean}    — PASH+ID тир: текстовые значения → словарные ID
 *   dict    {Dictionary} — словарь для reverseResolve при useIds=true
 *   version {string}     — добавить v:N заголовок (только в encodeStream)
 */

function encode(component, options = {}) {
  const { useIds = false, dict = null } = options;

  const schema = _findSchema(component);
  if (!schema) {
    throw new Error(`encode: неизвестный компонент "${component.type ?? component.id}"`);
  }

  const values = schema.fields.map(fieldDef => {
    const raw = component.fields[fieldDef.label];
    const val = raw !== undefined && raw !== null ? raw : '';

    // PASH+ID: пробуем заменить текст на словарный ID
    if (useIds && dict && typeof val === 'string') {
      const id = dict.reverseResolve(val);
      if (id !== null) return String(id);
    }

    // Число (цена): возвращаем без форматирования
    if (fieldDef.type === 'number' || fieldDef.format === 'currency') {
      const numeric = String(val).replace(/[^\d.-]/g, '');
      return numeric || String(val);
    }

    // Список: массив → через запятую
    if (fieldDef.type === 'list') {
      return Array.isArray(val) ? val.join(',') : String(val);
    }

    // Строка/richtext: экранируем пайп
    return String(val).replace(/\|/g, '\\|');
  });

  return `${schema.id}|${values.join('|')}`;
}

function encodeStream(components, options = {}) {
  const { version = null, useIds = false, dict = null } = options;
  const lines = components.map(c => encode(c, { useIds, dict }));
  return version ? `v:${version}\n${lines.join('\n')}` : lines.join('\n');
}

function _findSchema(component) {
  // По имени типа
  if (component.type && component.type !== 'unknown') {
    const entry = Object.entries(SCHEMAS).find(([, s]) => s.name === component.type);
    if (entry) return { ...entry[1], id: Number(entry[0]) };
  }
  // По числовому ID
  const numId = component.id !== undefined ? Number(component.id) : NaN;
  if (!isNaN(numId) && SCHEMAS[numId]) {
    return { ...SCHEMAS[numId], id: numId };
  }
  return null;
}

module.exports = { encode, encodeStream };
