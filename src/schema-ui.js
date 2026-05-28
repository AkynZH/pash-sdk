'use strict';

/**
 * PASH UI Component Schemas — ID 1–19
 *
 * Каждая схема описывает компонент:
 *   v       — версия схемы
 *   name    — имя типа (используется в parsed-объекте)
 *   fields  — упорядоченный массив полей
 *
 * Поле:
 *   id       — позиция в PASH-потоке (0-based, после COMP_ID)
 *   type     — string | number | list | enum | richtext | component
 *   label    — ключ в fields-объекте распарсенного компонента
 *   required — обязательность (по умолчанию false)
 *   format   — currency | date | percent (для type: number)
 *   values   — допустимые значения (для type: enum)
 *   ref      — COMP_ID вложенного компонента (для type: component)
 */
const SCHEMAS_UI = {
  1: {
    v: 1,
    name: 'ProductCard',
    fields: [
      { id: 0, type: 'string',   label: 'title',   required: true  },
      { id: 1, type: 'string',   label: 'desc'                     },
      { id: 2, type: 'number',   label: 'price',   format: 'currency' },
      { id: 3, type: 'string',   label: 'cta'                      },
    ],
  },

  2: {
    v: 1,
    name: 'Notification',
    fields: [
      { id: 0, type: 'enum',   label: 'level',
        values: ['info', 'warn', 'error'], required: true },
      { id: 1, type: 'string', label: 'message', required: true },
    ],
  },

  3: {
    v: 1,
    name: 'List',
    fields: [
      { id: 0, type: 'string', label: 'title'                 },
      { id: 1, type: 'list',   label: 'items', required: true },
    ],
  },

  4: {
    v: 1,
    name: 'Hero',
    fields: [
      { id: 0, type: 'string', label: 'headline', required: true },
      { id: 1, type: 'string', label: 'sub'                     },
      { id: 2, type: 'string', label: 'cta'                     },
    ],
  },

  // 5 — Article: структурный компонент с richtext-полем summary
  5: {
    v: 1,
    name: 'Article',
    fields: [
      { id: 0, type: 'string',   label: 'title',   required: true },
      { id: 1, type: 'string',   label: 'author'                  },
      { id: 2, type: 'number',   label: 'date',    format: 'date' },
      { id: 3, type: 'richtext', label: 'summary'                 },
    ],
  },

  // 6 — RichBlock: standalone richtext-блок
  6: {
    v: 1,
    name: 'RichBlock',
    fields: [
      { id: 0, type: 'richtext', label: 'content', required: true },
    ],
  },

  // ID 7–19 зарезервированы для UI-компонентов (community / extend)
};

module.exports = { SCHEMAS_UI };
