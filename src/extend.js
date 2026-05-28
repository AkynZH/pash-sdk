'use strict';

const { SCHEMAS }   = require('./schema');
const { RENDERERS } = require('./renderer');

/**
 * PASH Extension API
 *
 * registerComponent(id, definition)
 *
 * Регистрирует новый компонент.
 * Обновляет SCHEMAS (парсер, промпт, валидатор) и RENDERERS (рендерер).
 *
 * Зарезервированные диапазоны:
 *   1–6    — UI компоненты ядра
 *   7–19   — резерв UI
 *   20–32  — PASH-Doc блоки ядра
 *   33–39  — резерв для сообщества
 *   40+    — пользовательские компоненты ← используй этот диапазон
 *
 * @param {number} id — уникальный COMP_ID (рекомендуется 40+)
 * @param {object} definition
 * @param {string}   definition.name    — имя компонента (PascalCase)
 * @param {Array}    definition.fields  — массив FieldDef (id, type, label, ...)
 * @param {Function} definition.render  — (fields) => htmlString
 *
 * @example
 * registerComponent(40, {
 *   name: 'UserCard',
 *   fields: [
 *     { id: 0, type: 'string', label: 'name',  required: true },
 *     { id: 1, type: 'string', label: 'email'                 },
 *     { id: 2, type: 'string', label: 'role'                  },
 *   ],
 *   render: (f) => `<div class="user-card"><b>${f.name}</b><span>${f.email}</span></div>`,
 * });
 * // Теперь ИИ может генерировать: 40|Иван Петров|ivan@example.com|Разработчик
 */
function registerComponent(id, definition) {
  const numId = Number(id);

  if (!Number.isInteger(numId) || numId < 1) {
    throw new Error(`registerComponent: id должен быть положительным целым числом, получено: ${id}`);
  }

  // Сначала проверяем зарезервированный диапазон
  if (numId >= 20 && numId <= 39) {
    throw new Error(
      `registerComponent: COMP_ID ${numId} зарезервирован (20–32 = PASH-Doc, 33–39 = сообщество). ` +
      'Используй ID 40+'
    );
  }

  if (SCHEMAS[numId]) {
    throw new Error(
      `registerComponent: COMP_ID ${numId} уже занят компонентом "${SCHEMAS[numId].name}". ` +
      'Используй ID из диапазона 40+'
    );
  }

  const { name, fields, render } = definition || {};

  if (!name || typeof name !== 'string') {
    throw new Error('registerComponent: поле name обязательно (строка)');
  }
  if (!Array.isArray(fields)) {
    throw new Error('registerComponent: поле fields обязательно (массив FieldDef)');
  }
  if (typeof render !== 'function') {
    throw new Error('registerComponent: поле render обязательно (функция (fields) => string)');
  }

  // Обновляем оба реестра атомарно
  SCHEMAS[numId]    = { v: 1, name, fields };
  RENDERERS[name]   = render;
}

/**
 * Проверить, зарегистрирован ли компонент с данным ID.
 */
function isRegistered(id) {
  return Boolean(SCHEMAS[Number(id)]);
}

/**
 * Получить список всех зарегистрированных компонентов.
 */
function listComponents() {
  return Object.entries(SCHEMAS).map(([id, schema]) => ({
    id: Number(id),
    name: schema.name,
    fieldsCount: schema.fields.length,
  }));
}

module.exports = { registerComponent, isRegistered, listComponents };
