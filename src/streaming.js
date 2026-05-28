'use strict';

const { parseLine } = require('./parser');
const { SCHEMAS }   = require('./schema');

/**
 * PASH StreamingDecoder
 *
 * Принимает чанки из SSE/ReadableStream, накапливает буфер,
 * эмитит компонент сразу как строка завершена (\n).
 *
 * Компоненты появляются на UI по мере генерации, без ожидания конца ответа.
 *
 * @example
 * const decoder = new StreamingDecoder((component, version) => {
 *   document.getElementById('out').innerHTML += renderComponent(component);
 * });
 *
 * const response = await fetch('/api/ai');
 * const reader   = response.body.getReader();
 * const utf8     = new TextDecoder();
 *
 * while (true) {
 *   const { done, value } = await reader.read();
 *   if (done) { decoder.flush(); break; }
 *   decoder.push(utf8.decode(value));
 * }
 */
class StreamingDecoder {
  /**
   * @param {function(component, version)} onComponent — коллбэк на готовый компонент
   * @param {object} options
   * @param {object} options.registry — реестр схем (по умолчанию SCHEMAS)
   */
  constructor(onComponent, options) {
    options = options || {};
    this._onComponent = onComponent || function() {};
    this._schemas     = options.registry || SCHEMAS;
    this._buffer      = '';
    this._version     = null;
    this._firstLine   = true;
  }

  /**
   * Передать очередной чанк текста.
   */
  push(chunk) {
    this._buffer += String(chunk ?? '');
    const lines = this._buffer.split('\n');
    // Последний элемент может быть неполной строкой — оставляем в буфере
    this._buffer = lines.pop();
    for (const line of lines) {
      this._processLine(line);
    }
  }

  /**
   * Вызвать после конца потока, чтобы обработать остаток буфера.
   */
  flush() {
    if (this._buffer.trim()) {
      this._processLine(this._buffer);
      this._buffer = '';
    }
  }

  /**
   * Версия схемы из заголовка v:N (null если не указана).
   */
  get version() {
    return this._version;
  }

  _processLine(line) {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Версионный заголовок (первая строка)
    if (this._firstLine && trimmed.startsWith('v:')) {
      this._version   = trimmed.slice(2).trim() || null;
      this._firstLine = false;
      return;
    }
    this._firstLine = false;

    const component = parseLine(trimmed, this._schemas);
    this._onComponent(component, this._version);
  }
}

module.exports = { StreamingDecoder };
