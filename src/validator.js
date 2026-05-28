'use strict';

const { SCHEMAS } = require('./schema');

/**
 * PASH Validator
 *
 * validateComponent(node, schemas?)  — валидировать один компонент
 * validateStream(decoded, schemas?)  — валидировать все компоненты потока
 *
 * Проверяет:
 *   - COMP_ID существует в реестре
 *   - required-поля не пустые
 *   - enum-поля содержат допустимое значение
 *   - list-поля являются массивами
 *   - richtext — всегда валиден (содержимое не проверяется)
 *   - Divider (нет полей) — всегда валиден
 */

function validateComponent(node, schemas) {
  schemas = schemas || SCHEMAS;

  if (!node) {
    return { valid: false, errors: ['Пустой компонент'] };
  }

  if (node.type === 'unknown') {
    return { valid: false, errors: [`Неизвестный COMP_ID: ${node.id}`] };
  }

  // Ищем схему по имени типа
  const schema = Object.values(schemas).find(s => s.name === node.type);
  if (!schema) {
    return { valid: false, errors: [`Схема не найдена для типа: ${node.type}`] };
  }

  // Divider и компоненты без полей — всегда валидны
  if (!schema.fields || schema.fields.length === 0) {
    return { valid: true, errors: [] };
  }

  const errors = [];

  for (const fieldDef of schema.fields) {
    const val = node.fields[fieldDef.label];

    // Required: null, undefined или пустая строка
    if (fieldDef.required) {
      const isEmpty = val === undefined || val === null || val === '' ||
        (Array.isArray(val) && val.length === 0);
      if (isEmpty) {
        errors.push(`Поле "${fieldDef.label}" обязательное, но отсутствует или пустое`);
        continue;
      }
    }

    // Пропускаем пустые необязательные поля
    if (val === undefined || val === null || val === '') continue;

    // Enum: проверяем допустимость значения
    if (fieldDef.type === 'enum') {
      const allowed = Array.isArray(fieldDef.values) ? fieldDef.values : [];
      if (!allowed.includes(String(val))) {
        errors.push(`Поле "${fieldDef.label}": значение "${val}" не входит в [${allowed.join(', ')}]`);
      }
    }

    // List: должен быть массивом (после парсинга)
    if (fieldDef.type === 'list' && !Array.isArray(val)) {
      errors.push(`Поле "${fieldDef.label}": ожидался массив, получено ${typeof val}`);
    }

    // Richtext: содержимое не валидируется — это ответственность рендерера
    // Number, string: без дополнительных проверок
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Валидирует все компоненты декодированного потока.
 * @returns {Array<{index, type, valid, errors}>}
 */
function validateStream(decoded, schemas) {
  schemas = schemas || SCHEMAS;

  if (!decoded || !Array.isArray(decoded.components)) {
    return [];
  }

  return decoded.components.map((comp, index) => ({
    index,
    type: comp.type || 'unknown',
    ...validateComponent(comp, schemas),
  }));
}

module.exports = { validateComponent, validateStream };
