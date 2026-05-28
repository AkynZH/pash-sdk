'use strict';

/**
 * PASH Richtext Renderer
 *
 * Рендерит inline-разметку в richtext-полях → HTML.
 *
 * Встроенный рендерер (без зависимостей) поддерживает:
 *   **текст**     → <strong>
 *   _текст_       → <em>
 *   `код`         → <code>
 *   [текст](url)  → <a href="url" rel="noopener">
 *   \n            → <br>
 *
 * Для полноценного Markdown подключи внешний парсер:
 *   const { marked } = require('marked');
 *   setRichtextRenderer(text => marked.parseInline(text));
 *
 * Только inline-конструкции! Блочные элементы (#, ---, >) 
 * представлены отдельными компонентами (20, 25, 23).
 */

let _customRenderer = null;

function _escape(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function _builtinRender(text) {
  const escaped = _escape(text);

  return escaped
    // Ссылки — первыми (до обработки ** и _)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_, label, url) => {
        // Базовая защита: только http/https/mailto
        const safeUrl = /^(https?:|mailto:)/i.test(url.trim()) ? url : '#';
        return `<a href="${_escape(safeUrl)}" rel="noopener">${_escape(label)}</a>`;
      }
    )
    // **bold**
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // _italic_ (не _ внутри слова)
    .replace(/(?<!\w)_([^_]+)_(?!\w)/g, '<em>$1</em>')
    // *italic* (не ** — уже обработано)
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
    // `inline code`
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Перенос строки
    .replace(/\n/g, '<br>');
}

/**
 * Подключить внешний парсер вместо встроенного.
 * @param {function(string): string} fn
 */
function setRichtextRenderer(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('setRichtextRenderer: ожидается функция (text) => string');
  }
  _customRenderer = fn;
}

/**
 * Сбросить к встроенному рендереру.
 */
function resetRichtextRenderer() {
  _customRenderer = null;
}

/**
 * Рендерит richtext-строку → HTML.
 */
function renderRichtext(text) {
  if (!text) return '';
  return _customRenderer ? _customRenderer(String(text)) : _builtinRender(String(text));
}

/**
 * Рендерит richtext и оборачивает в HTML-тег.
 * @param {string} text
 * @param {string} tag  — 'p' | 'div' | 'span' и т.д.
 * @param {string} cls  — CSS-класс (опционально)
 */
function renderRichtextWrapped(text, tag, cls) {
  tag = tag || 'p';
  const inner   = renderRichtext(text);
  const clsAttr = cls ? ` class="${cls}"` : '';
  return `<${tag}${clsAttr}>${inner}</${tag}>`;
}

module.exports = { renderRichtext, renderRichtextWrapped, setRichtextRenderer, resetRichtextRenderer };
