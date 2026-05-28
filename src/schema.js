'use strict';

/**
 * PASH Schema Registry — единственный источник истины.
 * Агрегирует UI-схемы (1–19) и Doc-схемы (20–32).
 *
 * Все модули SDK используют SCHEMAS из этого файла.
 * Для расширения используй registerComponent() из extend.js — 
 * он добавит новый компонент прямо в этот объект.
 */
const { SCHEMAS_UI }  = require('./schema-ui');
const { SCHEMAS_DOC } = require('./schema-doc');

const SCHEMAS = Object.assign(Object.create(null), SCHEMAS_UI, SCHEMAS_DOC);

module.exports = { SCHEMAS, SCHEMAS_UI, SCHEMAS_DOC };
