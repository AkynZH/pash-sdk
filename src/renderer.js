'use strict';

const { renderRichtext, renderRichtextWrapped } = require('./richtext');

/**
 * PASH Renderer
 *
 * renderComponent(node)  — один компонент → HTML-строка
 * renderStream(decoded)  — все компоненты потока → HTML-строка
 *
 * Рендерер — это клиентский слой. Вы можете:
 * 1. Использовать встроенные шаблоны (этот файл) + написать CSS под классы
 * 2. Заменить конкретные рендереры: RENDERERS['ProductCard'] = myFn
 * 3. Написать React/Vue-компоненты на основе parsed-объектов из parser.js
 *
 * CSS-классы для кастомизации:
 *   UI: .pash-product-card, .pash-notification, .pash-list, .pash-hero, .pash-article, .pash-richblock
 *   Doc: .pash-doc-heading, .pash-doc-paragraph, .pash-doc-code, .pash-doc-blockquote,
 *        .pash-doc-image, .pash-doc-divider, .pash-doc-table, .pash-doc-list,
 *        .pash-doc-note, .pash-doc-spoiler, .pash-doc-math, .pash-doc-embed
 */

function _esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── UI Renderers (ID 1–6) ────────────────────────────────────────────────────

function _renderProductCard(f) {
  return `<div class="pash-product-card">
  <h3 class="pash-product-title">${_esc(f.title)}</h3>
  <p class="pash-product-desc">${_esc(f.desc)}</p>
  <span class="pash-product-price">${_esc(f.price)}</span>
  <button class="pash-product-cta">${_esc(f.cta || 'Купить')}</button>
</div>`;
}

function _renderNotification(f) {
  const allowed = ['info', 'warn', 'error'];
  const lvl     = allowed.includes(f.level) ? f.level : 'info';
  return `<div class="pash-notification pash-notification--${_esc(lvl)}">
  <span class="pash-notification-level">${_esc(lvl)}</span>
  <span class="pash-notification-message">${_esc(f.message)}</span>
</div>`;
}

function _renderList(f) {
  const items = Array.isArray(f.items) ? f.items : [];
  const lis   = items.map(i => `  <li>${_esc(i)}</li>`).join('\n');
  return `<div class="pash-list">
  ${f.title ? `<p class="pash-list-title">${_esc(f.title)}</p>` : ''}
  <ul>\n${lis}\n  </ul>
</div>`;
}

function _renderHero(f) {
  return `<div class="pash-hero">
  <h1 class="pash-hero-headline">${_esc(f.headline)}</h1>
  <p class="pash-hero-sub">${_esc(f.sub)}</p>
  <button class="pash-hero-cta">${_esc(f.cta)}</button>
</div>`;
}

function _renderArticle(f) {
  return `<article class="pash-article">
  <h1 class="pash-article-title">${_esc(f.title)}</h1>
  ${f.author ? `<span class="pash-article-author">${_esc(f.author)}</span>` : ''}
  ${f.date   ? `<time class="pash-article-date">${_esc(f.date)}</time>` : ''}
  ${f.summary ? renderRichtextWrapped(f.summary, 'div', 'pash-article-summary') : ''}
</article>`;
}

function _renderRichBlock(f) {
  return renderRichtextWrapped(f.content, 'div', 'pash-richblock');
}

// ─── Doc Renderers (ID 20–32) ─────────────────────────────────────────────────

function _renderHeading(f) {
  const lvl = Math.min(Math.max(parseInt(f.level, 10) || 2, 1), 6);
  return `<h${lvl} class="pash-doc-heading pash-doc-h${lvl}">${_esc(f.text)}</h${lvl}>`;
}

function _renderParagraph(f) {
  return renderRichtextWrapped(f.text, 'p', 'pash-doc-paragraph');
}

function _renderCode(f) {
  const lang = f.lang ? ` data-lang="${_esc(f.lang)}"` : '';
  // \n в коде — реальные переносы строк (не <br>)
  const body = _esc(String(f.body ?? '')).replace(/\\n/g, '\n');
  return `<pre class="pash-doc-code"${lang}><code>${body}</code></pre>`;
}

function _renderBlockquote(f) {
  const cite = f.author
    ? `\n  <cite class="pash-doc-blockquote-author">— ${_esc(f.author)}</cite>`
    : '';
  return `<blockquote class="pash-doc-blockquote">
  ${renderRichtextWrapped(f.text, 'p', 'pash-doc-blockquote-text')}${cite}
</blockquote>`;
}

function _renderImage(f) {
  const caption = f.caption
    ? `\n  <figcaption class="pash-doc-image-caption">${_esc(f.caption)}</figcaption>`
    : '';
  return `<figure class="pash-doc-image">
  <img src="${_esc(f.url)}" alt="${_esc(f.alt || '')}" loading="lazy">${caption}
</figure>`;
}

function _renderDivider() {
  return `<hr class="pash-doc-divider">`;
}

function _renderTable(f) {
  const headers = Array.isArray(f.headers) ? f.headers : [];
  const rowsRaw = String(f.rows ?? '');
  const rows    = rowsRaw
    .split(';')
    .map(r => r.trim())
    .filter(Boolean)
    .map(r => r.split(',').map(c => c.trim()));

  const thead = headers.map(h => `<th>${_esc(h)}</th>`).join('');
  const tbody = rows
    .map(row => `<tr>${row.map(c => `<td>${_esc(c)}</td>`).join('')}</tr>`)
    .join('\n    ');

  return `<div class="pash-doc-table-wrap">
  <table class="pash-doc-table">
    <thead><tr>${thead}</tr></thead>
    <tbody>\n    ${tbody}\n    </tbody>
  </table>
</div>`;
}

function _renderOrderedList(f) {
  const items = Array.isArray(f.items) ? f.items : [];
  const lis   = items.map(i => `  <li>${renderRichtext(i)}</li>`).join('\n');
  return `<div class="pash-doc-list pash-doc-list--ordered">
  ${f.title ? `<p class="pash-doc-list-title">${_esc(f.title)}</p>` : ''}
  <ol>\n${lis}\n  </ol>
</div>`;
}

function _renderBulletList(f) {
  const items = Array.isArray(f.items) ? f.items : [];
  const lis   = items.map(i => `  <li>${renderRichtext(i)}</li>`).join('\n');
  return `<div class="pash-doc-list pash-doc-list--bullet">
  ${f.title ? `<p class="pash-doc-list-title">${_esc(f.title)}</p>` : ''}
  <ul>\n${lis}\n  </ul>
</div>`;
}

function _renderNote(f) {
  const allowed = ['info', 'tip', 'warn', 'danger'];
  const lvl     = allowed.includes(f.level) ? f.level : 'info';
  return `<div class="pash-doc-note pash-doc-note--${_esc(lvl)}">
  <span class="pash-doc-note-level">${_esc(lvl)}</span>
  ${renderRichtextWrapped(f.text, 'div', 'pash-doc-note-text')}
</div>`;
}

function _renderSpoiler(f) {
  return `<details class="pash-doc-spoiler">
  <summary class="pash-doc-spoiler-title">${_esc(f.title)}</summary>
  ${renderRichtextWrapped(f.body, 'div', 'pash-doc-spoiler-body')}
</details>`;
}

function _renderMath(f) {
  const isBlock = f.display === 'block';
  const cls     = `pash-doc-math pash-doc-math--${isBlock ? 'block' : 'inline'}`;
  const tag     = isBlock ? 'div' : 'span';
  // Формулу не экранируем — передаём в MathJax/KaTeX как есть
  return `<${tag} class="${cls}" data-formula="${_esc(f.formula)}">${_esc(f.formula)}</${tag}>`;
}

function _renderEmbed(f) {
  const title = f.title ? ` title="${_esc(f.title)}"` : '';

  const iframes = {
    youtube: (url) => {
      const id = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)?.[1] ?? '';
      return id
        ? `<iframe src="https://www.youtube.com/embed/${id}" allowfullscreen loading="lazy" title="${_esc(f.title || '')}"></iframe>`
        : `<a href="${_esc(url)}">${_esc(url)}</a>`;
    },
    codepen:     (url) => `<iframe src="${_esc(url)}?default-tab=result" loading="lazy"></iframe>`,
    codesandbox: (url) => `<iframe src="${_esc(url)}" loading="lazy"></iframe>`,
    twitter:     (url) => `<blockquote class="twitter-tweet"><a href="${_esc(url)}"></a></blockquote>`,
  };

  const embedFn = iframes[f.type] || ((url) => `<a href="${_esc(url)}">${_esc(url)}</a>`);

  return `<div class="pash-doc-embed pash-doc-embed--${_esc(f.type)}"${title}>
  ${embedFn(f.url)}
</div>`;
}

function _renderUnknown(node) {
  return `<div class="pash-unknown" data-id="${Number(node.id) || 0}">[unknown component ${node.id}]</div>`;
}

// ─── Renderer Map ─────────────────────────────────────────────────────────────

const RENDERERS = {
  // UI
  ProductCard:  _renderProductCard,
  Notification: _renderNotification,
  List:         _renderList,
  Hero:         _renderHero,
  Article:      _renderArticle,
  RichBlock:    _renderRichBlock,
  // Doc
  Heading:      _renderHeading,
  Paragraph:    _renderParagraph,
  Code:         _renderCode,
  Blockquote:   _renderBlockquote,
  Image:        _renderImage,
  Divider:      _renderDivider,
  Table:        _renderTable,
  OrderedList:  _renderOrderedList,
  BulletList:   _renderBulletList,
  Note:         _renderNote,
  Spoiler:      _renderSpoiler,
  Math:         _renderMath,
  Embed:        _renderEmbed,
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Рекурсивно резолвит вложенные компоненты в полях.
 */
function _resolveNested(fields) {
  const out = {};
  for (const [key, val] of Object.entries(fields)) {
    out[key] = (val && typeof val === 'object' && val.type)
      ? renderComponent(val)
      : val;
  }
  return out;
}

/**
 * Рендерит один компонент → HTML-строка.
 */
function renderComponent(node) {
  if (!node) return '';
  if (node.type === 'unknown') return _renderUnknown(node);

  const fn = RENDERERS[node.type];
  if (!fn) return _renderUnknown(node);

  return fn(_resolveNested(node.fields));
}

/**
 * Рендерит весь декодированный поток → HTML-строка.
 */
function renderStream(decoded) {
  if (!decoded || !Array.isArray(decoded.components)) return '';
  return decoded.components.map(renderComponent).join('\n');
}

module.exports = { renderComponent, renderStream, RENDERERS };
