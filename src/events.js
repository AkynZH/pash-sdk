'use strict';

const { SCHEMAS }  = require('./schema');
const { Dictionary } = require('./dictionary');

/**
 * PASH Event Stream Format
 *
 * Ultra-low latency режим: клиент получает поля по одному,
 * начинает рендерить до закрытия компонента.
 *
 * Формат событий:
 *   COMP_START(ID)              — начало компонента
 *   COMP_END(ID)                — конец компонента → эмитим компонент
 *   TEXT(value)                 — строковое поле
 *   TEXT_ID(dict_id)            — строковое поле через dictionary
 *   PRICE(number)               — числовое поле (format: currency)
 *   DATE(value)                 — числовое поле (format: date)
 *   LIST(item1,item2,...)       — поле-список
 *   ENUM(value)                 — enum-поле
 *   RICHTEXT(value)             — richtext-поле
 *
 * Каждое событие — отдельная строка.
 *
 * Пример для ProductCard:
 *   COMP_START(1)
 *   TEXT(Смартфон X1)
 *   TEXT(AMOLED 120Hz)
 *   PRICE(69990)
 *   TEXT(Купить)
 *   COMP_END(1)
 */

const EVENT_RE = /^([A-Z_]+)\(([^)]*)\)$/;

function parseEvent(line) {
  const m = EVENT_RE.exec(line.trim());
  if (!m) return { type: 'UNKNOWN', value: line.trim() };
  return { type: m[1], value: m[2] };
}

class EventStreamDecoder {
  /**
   * @param {object} options
   * @param {function} options.onComponent — коллбэк на готовый компонент
   * @param {function} options.onField     — коллбэк на каждое поле (для live-render)
   * @param {object}   options.registry    — реестр схем
   * @param {Dictionary} options.dictionary — словарь для TEXT_ID
   */
  constructor(options) {
    options       = options || {};
    this._onComp  = options.onComponent || function() {};
    this._onField = options.onField     || function() {};
    this._schemas = options.registry    || SCHEMAS;
    this._dict    = options.dictionary  || new Dictionary();
    this._buffer  = '';
    this._current = null;
    this.version  = null;
  }

  push(chunk) {
    this._buffer += String(chunk ?? '');
    const lines = this._buffer.split('\n');
    this._buffer = lines.pop();
    for (const line of lines) {
      if (line.trim()) this._processEvent(parseEvent(line));
    }
  }

  flush() {
    if (this._buffer.trim()) {
      this._processEvent(parseEvent(this._buffer));
      this._buffer = '';
    }
  }

  _processEvent(ev) {
    const { type, value } = ev;

    switch (type) {
      case 'COMP_START': {
        const id     = parseInt(value, 10);
        const schema = this._schemas[id];
        this._current = { id, schema, fields: {}, fieldIndex: 0 };
        break;
      }

      case 'COMP_END': {
        if (this._current) {
          this._onComp({
            type:   this._current.schema ? this._current.schema.name : 'unknown',
            id:     this._current.id,
            fields: this._current.fields,
          });
          this._current = null;
        }
        break;
      }

      default: {
        if (!this._current || !this._current.schema) break;

        const fieldDef = this._current.schema.fields[this._current.fieldIndex];
        if (!fieldDef) break;

        let resolved = value;
        if (type === 'TEXT_ID') {
          resolved = this._dict.resolve(value);
        }

        const locale = require('./locale');
        let formatted = resolved;
        if (type === 'PRICE')    formatted = locale.formatCurrency(resolved);
        else if (type === 'DATE') formatted = locale.formatDate(resolved);
        else if (type === 'LIST') formatted = resolved.split(',').map(s => s.trim()).filter(Boolean);

        this._current.fields[fieldDef.label] = formatted;
        this._onField({ label: fieldDef.label, value: formatted });
        this._current.fieldIndex++;
        break;
      }
    }
  }
}

/**
 * Конвертирует PASH-поток → Event Stream строку.
 * Удобно для отладки и совместимости.
 */
function pashToEvents(stream) {
  const { decodeStream } = require('./parser');
  const decoded = decodeStream(stream);
  const lines   = [];

  for (const comp of decoded.components) {
    const schema = SCHEMAS[comp.id];
    if (!schema) continue;

    lines.push(`COMP_START(${comp.id})`);

    for (const fieldDef of schema.fields) {
      const val = comp.fields[fieldDef.label] ?? '';
      const evType = _fieldToEventType(fieldDef);
      const evVal  = Array.isArray(val) ? val.join(',') : String(val);
      lines.push(`${evType}(${evVal})`);
    }

    lines.push(`COMP_END(${comp.id})`);
  }

  return lines.join('\n');
}

function _fieldToEventType(fieldDef) {
  if (fieldDef.format === 'currency')  return 'PRICE';
  if (fieldDef.format === 'date')      return 'DATE';
  if (fieldDef.type   === 'list')      return 'LIST';
  if (fieldDef.type   === 'enum')      return 'ENUM';
  if (fieldDef.type   === 'richtext')  return 'RICHTEXT';
  return 'TEXT';
}

module.exports = { parseEvent, EventStreamDecoder, pashToEvents };
