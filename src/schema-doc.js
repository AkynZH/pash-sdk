'use strict';

/**
 * PASH-Doc Block Schemas — ID 20–32
 *
 * Документ = поток блоков. Каждый блок — отдельная PASH-строка.
 * Тот же декодер обрабатывает UI-компоненты (1–19) и Doc-блоки (20–32).
 *
 * Диапазоны:
 *   1–19   — UI компоненты
 *   20–32  — документные блоки (этот файл)
 *   33–39  — зарезервированы для сообщества
 *   40+    — пользовательские компоненты (registerComponent)
 *
 * Синтаксис строк в потоке для doc-блоков:
 *   COMP_ID|поле1|поле2|...
 *
 * Richtext-поля поддерживают inline-разметку:
 *   **bold**, _italic_, `code`, [text](url), \n → <br>
 */
const SCHEMAS_DOC = {
  // Heading: уровень заголовка 1-6 и текст
  20: {
    v: 1,
    name: 'Heading',
    fields: [
      { id: 0, type: 'enum',   label: 'level',
        values: ['1','2','3','4','5','6'], required: true },
      { id: 1, type: 'string', label: 'text', required: true },
    ],
  },

  // Paragraph: richtext-параграф (основной текстовый блок)
  21: {
    v: 1,
    name: 'Paragraph',
    fields: [
      { id: 0, type: 'richtext', label: 'text', required: true },
    ],
  },

  // Code: блок кода с опциональным указанием языка
  22: {
    v: 1,
    name: 'Code',
    fields: [
      { id: 0, type: 'string', label: 'lang'                  },
      { id: 1, type: 'string', label: 'body', required: true  },
    ],
  },

  // Blockquote: цитата с опциональным автором
  23: {
    v: 1,
    name: 'Blockquote',
    fields: [
      { id: 0, type: 'string',   label: 'author'                },
      { id: 1, type: 'richtext', label: 'text', required: true  },
    ],
  },

  // Image: изображение с alt-текстом и подписью
  24: {
    v: 1,
    name: 'Image',
    fields: [
      { id: 0, type: 'string', label: 'url',     required: true },
      { id: 1, type: 'string', label: 'alt'                     },
      { id: 2, type: 'string', label: 'caption'                 },
    ],
  },

  // Divider: горизонтальный разделитель, нет полей
  25: {
    v: 1,
    name: 'Divider',
    fields: [],
  },

  // Table: таблица
  //   headers: "Год,Узлы,Страна"        (comma-separated)
  //   rows:    "1969,4,США;1970,9,США"  (rows by ;, cells by ,)
  26: {
    v: 1,
    name: 'Table',
    fields: [
      { id: 0, type: 'list',   label: 'headers', required: true },
      { id: 1, type: 'string', label: 'rows',    required: true },
    ],
  },

  // OrderedList: нумерованный список
  27: {
    v: 1,
    name: 'OrderedList',
    fields: [
      { id: 0, type: 'string', label: 'title'                  },
      { id: 1, type: 'list',   label: 'items', required: true  },
    ],
  },

  // BulletList: маркированный список
  28: {
    v: 1,
    name: 'BulletList',
    fields: [
      { id: 0, type: 'string', label: 'title'                  },
      { id: 1, type: 'list',   label: 'items', required: true  },
    ],
  },

  // Note: выделенный информационный блок
  29: {
    v: 1,
    name: 'Note',
    fields: [
      { id: 0, type: 'enum',     label: 'level',
        values: ['info', 'tip', 'warn', 'danger'], required: true },
      { id: 1, type: 'richtext', label: 'text', required: true   },
    ],
  },

  // Spoiler: сворачиваемый блок (<details>/<summary>)
  30: {
    v: 1,
    name: 'Spoiler',
    fields: [
      { id: 0, type: 'string',   label: 'title', required: true },
      { id: 1, type: 'richtext', label: 'body',  required: true },
    ],
  },

  // Math: математическая формула (LaTeX / KaTeX)
  31: {
    v: 1,
    name: 'Math',
    fields: [
      { id: 0, type: 'enum',   label: 'display',
        values: ['block', 'inline'], required: true },
      { id: 1, type: 'string', label: 'formula', required: true },
    ],
  },

  // Embed: встраивание внешнего контента
  32: {
    v: 1,
    name: 'Embed',
    fields: [
      { id: 0, type: 'enum',   label: 'type',
        values: ['youtube', 'codepen', 'codesandbox', 'twitter'], required: true },
      { id: 1, type: 'string', label: 'url',   required: true },
      { id: 2, type: 'string', label: 'title'                  },
    ],
  },

  // 33–39 зарезервированы для сообщества
};

module.exports = { SCHEMAS_DOC };
