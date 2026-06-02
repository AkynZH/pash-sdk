var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/schema-ui.js
var require_schema_ui = __commonJS({
  "src/schema-ui.js"(exports, module) {
    "use strict";
    var SCHEMAS_UI = {
      1: {
        v: 1,
        name: "ProductCard",
        fields: [
          { id: 0, type: "string", label: "title", required: true },
          { id: 1, type: "string", label: "desc" },
          { id: 2, type: "number", label: "price", format: "currency" },
          { id: 3, type: "string", label: "cta" }
        ]
      },
      2: {
        v: 1,
        name: "Notification",
        fields: [
          {
            id: 0,
            type: "enum",
            label: "level",
            values: ["info", "warn", "error"],
            required: true
          },
          { id: 1, type: "string", label: "message", required: true }
        ]
      },
      3: {
        v: 1,
        name: "List",
        fields: [
          { id: 0, type: "string", label: "title" },
          { id: 1, type: "list", label: "items", required: true }
        ]
      },
      4: {
        v: 1,
        name: "Hero",
        fields: [
          { id: 0, type: "string", label: "headline", required: true },
          { id: 1, type: "string", label: "sub" },
          { id: 2, type: "string", label: "cta" }
        ]
      },
      // 5 — Article: структурный компонент с richtext-полем summary
      5: {
        v: 1,
        name: "Article",
        fields: [
          { id: 0, type: "string", label: "title", required: true },
          { id: 1, type: "string", label: "author" },
          { id: 2, type: "number", label: "date", format: "date" },
          { id: 3, type: "richtext", label: "summary" }
        ]
      },
      // 6 — RichBlock: standalone richtext-блок
      6: {
        v: 1,
        name: "RichBlock",
        fields: [
          { id: 0, type: "richtext", label: "content", required: true }
        ]
      }
      // ID 7–19 зарезервированы для UI-компонентов (community / extend)
    };
    module.exports = { SCHEMAS_UI };
  }
});

// src/schema-doc.js
var require_schema_doc = __commonJS({
  "src/schema-doc.js"(exports, module) {
    "use strict";
    var SCHEMAS_DOC = {
      // Heading: уровень заголовка 1-6 и текст
      20: {
        v: 1,
        name: "Heading",
        fields: [
          {
            id: 0,
            type: "enum",
            label: "level",
            values: ["1", "2", "3", "4", "5", "6"],
            required: true
          },
          { id: 1, type: "string", label: "text", required: true }
        ]
      },
      // Paragraph: richtext-параграф (основной текстовый блок)
      21: {
        v: 1,
        name: "Paragraph",
        fields: [
          { id: 0, type: "richtext", label: "text", required: true }
        ]
      },
      // Code: блок кода с опциональным указанием языка
      22: {
        v: 1,
        name: "Code",
        fields: [
          { id: 0, type: "string", label: "lang" },
          { id: 1, type: "string", label: "body", required: true }
        ]
      },
      // Blockquote: цитата с опциональным автором
      23: {
        v: 1,
        name: "Blockquote",
        fields: [
          { id: 0, type: "string", label: "author" },
          { id: 1, type: "richtext", label: "text", required: true }
        ]
      },
      // Image: изображение с alt-текстом и подписью
      24: {
        v: 1,
        name: "Image",
        fields: [
          { id: 0, type: "string", label: "url", required: true },
          { id: 1, type: "string", label: "alt" },
          { id: 2, type: "string", label: "caption" }
        ]
      },
      // Divider: горизонтальный разделитель, нет полей
      25: {
        v: 1,
        name: "Divider",
        fields: []
      },
      // Table: таблица
      //   headers: "Год,Узлы,Страна"        (comma-separated)
      //   rows:    "1969,4,США;1970,9,США"  (rows by ;, cells by ,)
      26: {
        v: 1,
        name: "Table",
        fields: [
          { id: 0, type: "list", label: "headers", required: true },
          { id: 1, type: "string", label: "rows", required: true }
        ]
      },
      // OrderedList: нумерованный список
      27: {
        v: 1,
        name: "OrderedList",
        fields: [
          { id: 0, type: "string", label: "title" },
          { id: 1, type: "list", label: "items", required: true }
        ]
      },
      // BulletList: маркированный список
      28: {
        v: 1,
        name: "BulletList",
        fields: [
          { id: 0, type: "string", label: "title" },
          { id: 1, type: "list", label: "items", required: true }
        ]
      },
      // Note: выделенный информационный блок
      29: {
        v: 1,
        name: "Note",
        fields: [
          {
            id: 0,
            type: "enum",
            label: "level",
            values: ["info", "tip", "warn", "danger"],
            required: true
          },
          { id: 1, type: "richtext", label: "text", required: true }
        ]
      },
      // Spoiler: сворачиваемый блок (<details>/<summary>)
      30: {
        v: 1,
        name: "Spoiler",
        fields: [
          { id: 0, type: "string", label: "title", required: true },
          { id: 1, type: "richtext", label: "body", required: true }
        ]
      },
      // Math: математическая формула (LaTeX / KaTeX)
      31: {
        v: 1,
        name: "Math",
        fields: [
          {
            id: 0,
            type: "enum",
            label: "display",
            values: ["block", "inline"],
            required: true
          },
          { id: 1, type: "string", label: "formula", required: true }
        ]
      },
      // Embed: встраивание внешнего контента
      32: {
        v: 1,
        name: "Embed",
        fields: [
          {
            id: 0,
            type: "enum",
            label: "type",
            values: ["youtube", "codepen", "codesandbox", "twitter"],
            required: true
          },
          { id: 1, type: "string", label: "url", required: true },
          { id: 2, type: "string", label: "title" }
        ]
      }
      // 33–39 зарезервированы для сообщества
    };
    module.exports = { SCHEMAS_DOC };
  }
});

// src/schema.js
var require_schema = __commonJS({
  "src/schema.js"(exports, module) {
    "use strict";
    var { SCHEMAS_UI } = require_schema_ui();
    var { SCHEMAS_DOC } = require_schema_doc();
    var SCHEMAS = Object.assign(/* @__PURE__ */ Object.create(null), SCHEMAS_UI, SCHEMAS_DOC);
    module.exports = { SCHEMAS, SCHEMAS_UI, SCHEMAS_DOC };
  }
});

// src/tokenizer.js
var require_tokenizer = __commonJS({
  "src/tokenizer.js"(exports, module) {
    "use strict";
    function tokenize(line) {
      const tokens = [];
      let cur = "";
      for (let i = 0; i < line.length; i++) {
        if (line[i] === "\\" && i + 1 < line.length && line[i + 1] === "|") {
          cur += "|";
          i++;
        } else if (line[i] === "|") {
          tokens.push(cur);
          cur = "";
        } else {
          cur += line[i];
        }
      }
      tokens.push(cur);
      return tokens;
    }
    module.exports = { tokenize };
  }
});

// src/locale.js
var require_locale = __commonJS({
  "src/locale.js"(exports, module) {
    "use strict";
    var LOCALES = {
      "ru-RU": {
        currency: "\u20BD",
        currencyPos: "after",
        // 'before' | 'after'
        thousandsSep: "\xA0",
        // неразрывный пробел
        decimalSep: ",",
        dateFormat: "DD.MM.YYYY",
        percentSym: "%"
      },
      "en-US": {
        currency: "$",
        currencyPos: "before",
        thousandsSep: ",",
        decimalSep: ".",
        dateFormat: "MM/DD/YYYY",
        percentSym: "%"
      },
      "de-DE": {
        currency: "\u20AC",
        currencyPos: "after",
        thousandsSep: ".",
        decimalSep: ",",
        dateFormat: "DD.MM.YYYY",
        percentSym: "%"
      }
    };
    var _active = "ru-RU";
    function setLocale(code) {
      if (!LOCALES[code])
        throw new Error(`\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043B\u043E\u043A\u0430\u043B\u044C: ${code}. \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B: ${Object.keys(LOCALES).join(", ")}`);
      _active = code;
    }
    function getLocale() {
      return { ...LOCALES[_active], code: _active };
    }
    function addLocale(code, config) {
      if (!config.currency || !config.currencyPos)
        throw new Error("addLocale: \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B currency \u0438 currencyPos");
      LOCALES[code] = config;
    }
    function formatCurrency(value) {
      const raw = String(value != null ? value : "").replace(/[\s\u00A0]/g, "");
      const n = parseFloat(raw);
      if (isNaN(n))
        return String(value != null ? value : "");
      const loc = LOCALES[_active];
      const abs = Math.abs(n);
      const sign = n < 0 ? "-" : "";
      const parts = abs.toFixed(0).split("");
      const int = [];
      parts.reverse().forEach((d, i) => {
        if (i && i % 3 === 0)
          int.unshift(loc.thousandsSep);
        int.unshift(d);
      });
      const formatted = sign + int.join("");
      return loc.currencyPos === "before" ? `${loc.currency}${formatted}` : `${formatted} ${loc.currency}`;
    }
    function formatDate(value) {
      let d;
      if (value instanceof Date)
        d = value;
      else if (typeof value === "number")
        d = new Date(value);
      else
        d = new Date(String(value));
      if (isNaN(d.getTime()))
        return String(value != null ? value : "");
      const loc = LOCALES[_active];
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = String(d.getFullYear());
      return loc.dateFormat.replace("DD", dd).replace("MM", mm).replace("YYYY", yyyy);
    }
    function formatPercent(value) {
      const n = parseFloat(String(value != null ? value : ""));
      if (isNaN(n))
        return String(value != null ? value : "");
      return `${n}${LOCALES[_active].percentSym}`;
    }
    module.exports = { setLocale, getLocale, addLocale, formatCurrency, formatDate, formatPercent };
  }
});

// src/dictionary.js
var require_dictionary = __commonJS({
  "src/dictionary.js"(exports, module) {
    "use strict";
    var Dictionary = class {
      /**
       * @param {Record<string|number, string>} entries — начальные записи { id: text }
       */
      constructor(entries = {}) {
        this._entries = /* @__PURE__ */ Object.create(null);
        this.load(entries);
      }
      /**
       * Резолвить ID → текст.
       * Если ID не найден — возвращает "[id]" (fallback без краша).
       */
      resolve(id) {
        const key = String(id);
        return Object.prototype.hasOwnProperty.call(this._entries, key) ? this._entries[key] : `[${id}]`;
      }
      /**
       * Обратный резолв: текст → ID.
       * Возвращает null если не найдено.
       */
      reverseResolve(text) {
        for (const [id, val] of Object.entries(this._entries)) {
          if (val === text)
            return id;
        }
        return null;
      }
      /**
       * Добавить или обновить одну запись.
       */
      set(id, value) {
        if (id === void 0 || id === null)
          throw new Error("Dictionary.set: id \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D");
        this._entries[String(id)] = String(value);
      }
      /**
       * Загрузить пакет записей (например, ответ RAG).
       */
      load(batch) {
        for (const [id, value] of Object.entries(batch != null ? batch : {})) {
          this._entries[String(id)] = String(value);
        }
      }
      /**
       * Удалить запись.
       */
      delete(id) {
        delete this._entries[String(id)];
      }
      /**
       * Количество записей.
       */
      get size() {
        return Object.keys(this._entries).length;
      }
      /**
       * Проверить, является ли значение числовым ID (а не текстом).
       * ИИ в PASH+ID тире генерирует только числа.
       */
      static isId(value) {
        return /^\d+$/.test(String(value != null ? value : "").trim());
      }
    };
    var defaultDictionary = new Dictionary();
    module.exports = { Dictionary, defaultDictionary };
  }
});

// src/formatter.js
var require_formatter = __commonJS({
  "src/formatter.js"(exports, module) {
    "use strict";
    var locale = require_locale();
    var { Dictionary, defaultDictionary } = require_dictionary();
    function formatField(value, fieldDef) {
      if (!fieldDef)
        return String(value != null ? value : "");
      const { type, format, values: enumValues } = fieldDef;
      let v = String(value != null ? value : "");
      if (Dictionary.isId(v) && type !== "number") {
        const resolved = defaultDictionary.resolve(v);
        if (resolved !== `[${v}]`)
          v = resolved;
      }
      switch (type) {
        case "number":
          if (format === "currency")
            return locale.formatCurrency(v);
          if (format === "date")
            return locale.formatDate(v);
          if (format === "percent")
            return locale.formatPercent(v);
          return v;
        case "list":
          return v.split(",").map((s) => s.trim()).filter(Boolean);
        case "enum":
          return v;
        case "richtext":
          return v;
        case "string":
        default:
          return v;
      }
    }
    module.exports = { formatField };
  }
});

// src/parser.js
var require_parser = __commonJS({
  "src/parser.js"(exports, module) {
    "use strict";
    var { tokenize } = require_tokenizer();
    var { formatField } = require_formatter();
    var { SCHEMAS } = require_schema();
    function parseLine(line, schemas) {
      schemas = schemas || SCHEMAS;
      const tokens = tokenize(line.trim());
      return _parseTokens(tokens, 0, schemas).component;
    }
    function _parseTokens(tokens, offset, schemas) {
      const id = parseInt(tokens[offset], 10);
      const schema = schemas[id];
      if (!schema) {
        return {
          component: { type: "unknown", id, raw: tokens.slice(offset).join("|") },
          nextOffset: tokens.length
        };
      }
      const fields = {};
      let pos = offset + 1;
      for (const fieldDef of schema.fields) {
        const raw = pos < tokens.length ? tokens[pos] : "";
        if (raw.startsWith("#") && raw.length > 1) {
          const nestedTokens = [raw.slice(1), ...tokens.slice(pos + 1)];
          const { component: nested, nextOffset: consumed } = _parseTokens(nestedTokens, 0, schemas);
          fields[fieldDef.label] = nested;
          pos = pos + consumed;
        } else {
          fields[fieldDef.label] = formatField(raw, fieldDef);
          pos++;
        }
      }
      return {
        component: { type: schema.name, id, fields },
        nextOffset: pos - offset
        // сколько токенов потребили начиная с offset
      };
    }
    function decodeStream(stream, schemas) {
      schemas = schemas || SCHEMAS;
      let data = String(stream != null ? stream : "").trim();
      let version = null;
      if (data.startsWith("v:")) {
        const nl = data.indexOf("\n");
        if (nl !== -1) {
          version = data.slice(2, nl).trim();
          data = data.slice(nl + 1);
        } else {
          return { version: data.slice(2).trim() || null, components: [] };
        }
      }
      const components = data.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => parseLine(l, schemas));
      return { version, components };
    }
    module.exports = { parseLine, decodeStream };
  }
});

// src/encoder.js
var require_encoder = __commonJS({
  "src/encoder.js"(exports, module) {
    "use strict";
    var { SCHEMAS } = require_schema();
    var { Dictionary } = require_dictionary();
    function encode(component, options = {}) {
      var _a;
      const { useIds = false, dict = null } = options;
      const schema = _findSchema(component);
      if (!schema) {
        throw new Error(`encode: \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 "${(_a = component.type) != null ? _a : component.id}"`);
      }
      const values = schema.fields.map((fieldDef) => {
        const raw = component.fields[fieldDef.label];
        const val = raw !== void 0 && raw !== null ? raw : "";
        if (useIds && dict && typeof val === "string") {
          const id = dict.reverseResolve(val);
          if (id !== null)
            return String(id);
        }
        if (fieldDef.type === "number" || fieldDef.format === "currency") {
          const numeric = String(val).replace(/[^\d.-]/g, "");
          return numeric || String(val);
        }
        if (fieldDef.type === "list") {
          return Array.isArray(val) ? val.join(",") : String(val);
        }
        return String(val).replace(/\|/g, "\\|");
      });
      return `${schema.id}|${values.join("|")}`;
    }
    function encodeStream(components, options = {}) {
      const { version = null, useIds = false, dict = null } = options;
      const lines = components.map((c) => encode(c, { useIds, dict }));
      return version ? `v:${version}
${lines.join("\n")}` : lines.join("\n");
    }
    function _findSchema(component) {
      if (component.type && component.type !== "unknown") {
        const entry = Object.entries(SCHEMAS).find(([, s]) => s.name === component.type);
        if (entry)
          return { ...entry[1], id: Number(entry[0]) };
      }
      const numId = component.id !== void 0 ? Number(component.id) : NaN;
      if (!isNaN(numId) && SCHEMAS[numId]) {
        return { ...SCHEMAS[numId], id: numId };
      }
      return null;
    }
    module.exports = { encode, encodeStream };
  }
});

// src/richtext.js
var require_richtext = __commonJS({
  "src/richtext.js"(exports, module) {
    "use strict";
    var _customRenderer = null;
    function _escape(str) {
      return String(str != null ? str : "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    function _builtinRender(text) {
      const escaped = _escape(text);
      return escaped.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        (_, label, url) => {
          const safeUrl = /^(https?:|mailto:)/i.test(url.trim()) ? url : "#";
          return `<a href="${_escape(safeUrl)}" rel="noopener">${_escape(label)}</a>`;
        }
      ).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/(?<!\w)_([^_]+)_(?!\w)/g, "<em>$1</em>").replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>").replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\n/g, "<br>");
    }
    function setRichtextRenderer(fn) {
      if (typeof fn !== "function") {
        throw new TypeError("setRichtextRenderer: \u043E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u0444\u0443\u043D\u043A\u0446\u0438\u044F (text) => string");
      }
      _customRenderer = fn;
    }
    function resetRichtextRenderer() {
      _customRenderer = null;
    }
    function renderRichtext(text) {
      if (!text)
        return "";
      return _customRenderer ? _customRenderer(String(text)) : _builtinRender(String(text));
    }
    function renderRichtextWrapped(text, tag, cls) {
      tag = tag || "p";
      const inner = renderRichtext(text);
      const clsAttr = cls ? ` class="${cls}"` : "";
      return `<${tag}${clsAttr}>${inner}</${tag}>`;
    }
    module.exports = { renderRichtext, renderRichtextWrapped, setRichtextRenderer, resetRichtextRenderer };
  }
});

// src/renderer.js
var require_renderer = __commonJS({
  "src/renderer.js"(exports, module) {
    "use strict";
    var { renderRichtext, renderRichtextWrapped } = require_richtext();
    function _esc(str) {
      return String(str != null ? str : "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    function _renderProductCard(f) {
      return `<div class="pash-product-card">
  <h3 class="pash-product-title">${_esc(f.title)}</h3>
  <p class="pash-product-desc">${_esc(f.desc)}</p>
  <span class="pash-product-price">${_esc(f.price)}</span>
  <button class="pash-product-cta">${_esc(f.cta || "\u041A\u0443\u043F\u0438\u0442\u044C")}</button>
</div>`;
    }
    function _renderNotification(f) {
      const allowed = ["info", "warn", "error"];
      const lvl = allowed.includes(f.level) ? f.level : "info";
      return `<div class="pash-notification pash-notification--${_esc(lvl)}">
  <span class="pash-notification-level">${_esc(lvl)}</span>
  <span class="pash-notification-message">${_esc(f.message)}</span>
</div>`;
    }
    function _renderList(f) {
      const items = Array.isArray(f.items) ? f.items : [];
      const lis = items.map((i) => `  <li>${_esc(i)}</li>`).join("\n");
      return `<div class="pash-list">
  ${f.title ? `<p class="pash-list-title">${_esc(f.title)}</p>` : ""}
  <ul>
${lis}
  </ul>
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
  ${f.author ? `<span class="pash-article-author">${_esc(f.author)}</span>` : ""}
  ${f.date ? `<time class="pash-article-date">${_esc(f.date)}</time>` : ""}
  ${f.summary ? renderRichtextWrapped(f.summary, "div", "pash-article-summary") : ""}
</article>`;
    }
    function _renderRichBlock(f) {
      return renderRichtextWrapped(f.content, "div", "pash-richblock");
    }
    function _renderHeading(f) {
      const lvl = Math.min(Math.max(parseInt(f.level, 10) || 2, 1), 6);
      return `<h${lvl} class="pash-doc-heading pash-doc-h${lvl}">${_esc(f.text)}</h${lvl}>`;
    }
    function _renderParagraph(f) {
      return renderRichtextWrapped(f.text, "p", "pash-doc-paragraph");
    }
    function _renderCode(f) {
      var _a;
      const lang = f.lang ? ` data-lang="${_esc(f.lang)}"` : "";
      const body = _esc(String((_a = f.body) != null ? _a : "")).replace(/\\n/g, "\n");
      return `<pre class="pash-doc-code"${lang}><code>${body}</code></pre>`;
    }
    function _renderBlockquote(f) {
      const cite = f.author ? `
  <cite class="pash-doc-blockquote-author">\u2014 ${_esc(f.author)}</cite>` : "";
      return `<blockquote class="pash-doc-blockquote">
  ${renderRichtextWrapped(f.text, "p", "pash-doc-blockquote-text")}${cite}
</blockquote>`;
    }
    function _renderImage(f) {
      const caption = f.caption ? `
  <figcaption class="pash-doc-image-caption">${_esc(f.caption)}</figcaption>` : "";
      return `<figure class="pash-doc-image">
  <img src="${_esc(f.url)}" alt="${_esc(f.alt || "")}" loading="lazy">${caption}
</figure>`;
    }
    function _renderDivider() {
      return `<hr class="pash-doc-divider">`;
    }
    function _renderTable(f) {
      var _a;
      const headers = Array.isArray(f.headers) ? f.headers : [];
      const rowsRaw = String((_a = f.rows) != null ? _a : "");
      const rows = rowsRaw.split(";").map((r) => r.trim()).filter(Boolean).map((r) => r.split(",").map((c) => c.trim()));
      const thead = headers.map((h) => `<th>${_esc(h)}</th>`).join("");
      const tbody = rows.map((row) => `<tr>${row.map((c) => `<td>${_esc(c)}</td>`).join("")}</tr>`).join("\n    ");
      return `<div class="pash-doc-table-wrap">
  <table class="pash-doc-table">
    <thead><tr>${thead}</tr></thead>
    <tbody>
    ${tbody}
    </tbody>
  </table>
</div>`;
    }
    function _renderOrderedList(f) {
      const items = Array.isArray(f.items) ? f.items : [];
      const lis = items.map((i) => `  <li>${renderRichtext(i)}</li>`).join("\n");
      return `<div class="pash-doc-list pash-doc-list--ordered">
  ${f.title ? `<p class="pash-doc-list-title">${_esc(f.title)}</p>` : ""}
  <ol>
${lis}
  </ol>
</div>`;
    }
    function _renderBulletList(f) {
      const items = Array.isArray(f.items) ? f.items : [];
      const lis = items.map((i) => `  <li>${renderRichtext(i)}</li>`).join("\n");
      return `<div class="pash-doc-list pash-doc-list--bullet">
  ${f.title ? `<p class="pash-doc-list-title">${_esc(f.title)}</p>` : ""}
  <ul>
${lis}
  </ul>
</div>`;
    }
    function _renderNote(f) {
      const allowed = ["info", "tip", "warn", "danger"];
      const lvl = allowed.includes(f.level) ? f.level : "info";
      return `<div class="pash-doc-note pash-doc-note--${_esc(lvl)}">
  <span class="pash-doc-note-level">${_esc(lvl)}</span>
  ${renderRichtextWrapped(f.text, "div", "pash-doc-note-text")}
</div>`;
    }
    function _renderSpoiler(f) {
      return `<details class="pash-doc-spoiler">
  <summary class="pash-doc-spoiler-title">${_esc(f.title)}</summary>
  ${renderRichtextWrapped(f.body, "div", "pash-doc-spoiler-body")}
</details>`;
    }
    function _renderMath(f) {
      const isBlock = f.display === "block";
      const cls = `pash-doc-math pash-doc-math--${isBlock ? "block" : "inline"}`;
      const tag = isBlock ? "div" : "span";
      return `<${tag} class="${cls}" data-formula="${_esc(f.formula)}">${_esc(f.formula)}</${tag}>`;
    }
    function _renderEmbed(f) {
      const title = f.title ? ` title="${_esc(f.title)}"` : "";
      const iframes = {
        youtube: (url) => {
          var _a, _b;
          const id = (_b = (_a = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)) == null ? void 0 : _a[1]) != null ? _b : "";
          return id ? `<iframe src="https://www.youtube.com/embed/${id}" allowfullscreen loading="lazy" title="${_esc(f.title || "")}"></iframe>` : `<a href="${_esc(url)}">${_esc(url)}</a>`;
        },
        codepen: (url) => `<iframe src="${_esc(url)}?default-tab=result" loading="lazy"></iframe>`,
        codesandbox: (url) => `<iframe src="${_esc(url)}" loading="lazy"></iframe>`,
        twitter: (url) => `<blockquote class="twitter-tweet"><a href="${_esc(url)}"></a></blockquote>`
      };
      const embedFn = iframes[f.type] || ((url) => `<a href="${_esc(url)}">${_esc(url)}</a>`);
      return `<div class="pash-doc-embed pash-doc-embed--${_esc(f.type)}"${title}>
  ${embedFn(f.url)}
</div>`;
    }
    function _renderUnknown(node) {
      return `<div class="pash-unknown" data-id="${Number(node.id) || 0}">[unknown component ${node.id}]</div>`;
    }
    var RENDERERS = {
      // UI
      ProductCard: _renderProductCard,
      Notification: _renderNotification,
      List: _renderList,
      Hero: _renderHero,
      Article: _renderArticle,
      RichBlock: _renderRichBlock,
      // Doc
      Heading: _renderHeading,
      Paragraph: _renderParagraph,
      Code: _renderCode,
      Blockquote: _renderBlockquote,
      Image: _renderImage,
      Divider: _renderDivider,
      Table: _renderTable,
      OrderedList: _renderOrderedList,
      BulletList: _renderBulletList,
      Note: _renderNote,
      Spoiler: _renderSpoiler,
      Math: _renderMath,
      Embed: _renderEmbed
    };
    function _resolveNested(fields) {
      const out = {};
      for (const [key, val] of Object.entries(fields)) {
        out[key] = val && typeof val === "object" && val.type ? renderComponent(val) : val;
      }
      return out;
    }
    function renderComponent(node) {
      if (!node)
        return "";
      if (node.type === "unknown")
        return _renderUnknown(node);
      const fn = RENDERERS[node.type];
      if (!fn)
        return _renderUnknown(node);
      return fn(_resolveNested(node.fields));
    }
    function renderStream(decoded) {
      if (!decoded || !Array.isArray(decoded.components))
        return "";
      return decoded.components.map(renderComponent).join("\n");
    }
    module.exports = { renderComponent, renderStream, RENDERERS };
  }
});

// src/streaming.js
var require_streaming = __commonJS({
  "src/streaming.js"(exports, module) {
    "use strict";
    var { parseLine } = require_parser();
    var { SCHEMAS } = require_schema();
    var StreamingDecoder = class {
      /**
       * @param {function(component, version)} onComponent — коллбэк на готовый компонент
       * @param {object} options
       * @param {object} options.registry — реестр схем (по умолчанию SCHEMAS)
       */
      constructor(onComponent, options) {
        options = options || {};
        this._onComponent = onComponent || function() {
        };
        this._schemas = options.registry || SCHEMAS;
        this._buffer = "";
        this._version = null;
        this._firstLine = true;
      }
      /**
       * Передать очередной чанк текста.
       */
      push(chunk) {
        this._buffer += String(chunk != null ? chunk : "");
        const lines = this._buffer.split("\n");
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
          this._buffer = "";
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
        if (!trimmed)
          return;
        if (this._firstLine && trimmed.startsWith("v:")) {
          this._version = trimmed.slice(2).trim() || null;
          this._firstLine = false;
          return;
        }
        this._firstLine = false;
        const component = parseLine(trimmed, this._schemas);
        this._onComponent(component, this._version);
      }
    };
    module.exports = { StreamingDecoder };
  }
});

// src/events.js
var require_events = __commonJS({
  "src/events.js"(exports, module) {
    "use strict";
    var { SCHEMAS } = require_schema();
    var { Dictionary } = require_dictionary();
    var EVENT_RE = /^([A-Z_]+)\(([^)]*)\)$/;
    function parseEvent(line) {
      const m = EVENT_RE.exec(line.trim());
      if (!m)
        return { type: "UNKNOWN", value: line.trim() };
      return { type: m[1], value: m[2] };
    }
    var EventStreamDecoder = class {
      /**
       * @param {object} options
       * @param {function} options.onComponent — коллбэк на готовый компонент
       * @param {function} options.onField     — коллбэк на каждое поле (для live-render)
       * @param {object}   options.registry    — реестр схем
       * @param {Dictionary} options.dictionary — словарь для TEXT_ID
       */
      constructor(options) {
        options = options || {};
        this._onComp = options.onComponent || function() {
        };
        this._onField = options.onField || function() {
        };
        this._schemas = options.registry || SCHEMAS;
        this._dict = options.dictionary || new Dictionary();
        this._buffer = "";
        this._current = null;
        this.version = null;
      }
      push(chunk) {
        this._buffer += String(chunk != null ? chunk : "");
        const lines = this._buffer.split("\n");
        this._buffer = lines.pop();
        for (const line of lines) {
          if (line.trim())
            this._processEvent(parseEvent(line));
        }
      }
      flush() {
        if (this._buffer.trim()) {
          this._processEvent(parseEvent(this._buffer));
          this._buffer = "";
        }
      }
      _processEvent(ev) {
        const { type, value } = ev;
        switch (type) {
          case "COMP_START": {
            const id = parseInt(value, 10);
            const schema = this._schemas[id];
            this._current = { id, schema, fields: {}, fieldIndex: 0 };
            break;
          }
          case "COMP_END": {
            if (this._current) {
              this._onComp({
                type: this._current.schema ? this._current.schema.name : "unknown",
                id: this._current.id,
                fields: this._current.fields
              });
              this._current = null;
            }
            break;
          }
          default: {
            if (!this._current || !this._current.schema)
              break;
            const fieldDef = this._current.schema.fields[this._current.fieldIndex];
            if (!fieldDef)
              break;
            let resolved = value;
            if (type === "TEXT_ID") {
              resolved = this._dict.resolve(value);
            }
            const locale = require_locale();
            let formatted = resolved;
            if (type === "PRICE")
              formatted = locale.formatCurrency(resolved);
            else if (type === "DATE")
              formatted = locale.formatDate(resolved);
            else if (type === "LIST")
              formatted = resolved.split(",").map((s) => s.trim()).filter(Boolean);
            this._current.fields[fieldDef.label] = formatted;
            this._onField({ label: fieldDef.label, value: formatted });
            this._current.fieldIndex++;
            break;
          }
        }
      }
    };
    function pashToEvents(stream) {
      var _a;
      const { decodeStream } = require_parser();
      const decoded = decodeStream(stream);
      const lines = [];
      for (const comp of decoded.components) {
        const schema = SCHEMAS[comp.id];
        if (!schema)
          continue;
        lines.push(`COMP_START(${comp.id})`);
        for (const fieldDef of schema.fields) {
          const val = (_a = comp.fields[fieldDef.label]) != null ? _a : "";
          const evType = _fieldToEventType(fieldDef);
          const evVal = Array.isArray(val) ? val.join(",") : String(val);
          lines.push(`${evType}(${evVal})`);
        }
        lines.push(`COMP_END(${comp.id})`);
      }
      return lines.join("\n");
    }
    function _fieldToEventType(fieldDef) {
      if (fieldDef.format === "currency")
        return "PRICE";
      if (fieldDef.format === "date")
        return "DATE";
      if (fieldDef.type === "list")
        return "LIST";
      if (fieldDef.type === "enum")
        return "ENUM";
      if (fieldDef.type === "richtext")
        return "RICHTEXT";
      return "TEXT";
    }
    module.exports = { parseEvent, EventStreamDecoder, pashToEvents };
  }
});

// src/validator.js
var require_validator = __commonJS({
  "src/validator.js"(exports, module) {
    "use strict";
    var { SCHEMAS } = require_schema();
    function validateComponent(node, schemas) {
      schemas = schemas || SCHEMAS;
      if (!node) {
        return { valid: false, errors: ["\u041F\u0443\u0441\u0442\u043E\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442"] };
      }
      if (node.type === "unknown") {
        return { valid: false, errors: [`\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 COMP_ID: ${node.id}`] };
      }
      const schema = Object.values(schemas).find((s) => s.name === node.type);
      if (!schema) {
        return { valid: false, errors: [`\u0421\u0445\u0435\u043C\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0434\u043B\u044F \u0442\u0438\u043F\u0430: ${node.type}`] };
      }
      if (!schema.fields || schema.fields.length === 0) {
        return { valid: true, errors: [] };
      }
      const errors = [];
      for (const fieldDef of schema.fields) {
        const val = node.fields[fieldDef.label];
        if (fieldDef.required) {
          const isEmpty = val === void 0 || val === null || val === "" || Array.isArray(val) && val.length === 0;
          if (isEmpty) {
            errors.push(`\u041F\u043E\u043B\u0435 "${fieldDef.label}" \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435, \u043D\u043E \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u0443\u0441\u0442\u043E\u0435`);
            continue;
          }
        }
        if (val === void 0 || val === null || val === "")
          continue;
        if (fieldDef.type === "enum") {
          const allowed = Array.isArray(fieldDef.values) ? fieldDef.values : [];
          if (!allowed.includes(String(val))) {
            errors.push(`\u041F\u043E\u043B\u0435 "${fieldDef.label}": \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 "${val}" \u043D\u0435 \u0432\u0445\u043E\u0434\u0438\u0442 \u0432 [${allowed.join(", ")}]`);
          }
        }
        if (fieldDef.type === "list" && !Array.isArray(val)) {
          errors.push(`\u041F\u043E\u043B\u0435 "${fieldDef.label}": \u043E\u0436\u0438\u0434\u0430\u043B\u0441\u044F \u043C\u0430\u0441\u0441\u0438\u0432, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${typeof val}`);
        }
      }
      return { valid: errors.length === 0, errors };
    }
    function validateStream(decoded, schemas) {
      schemas = schemas || SCHEMAS;
      if (!decoded || !Array.isArray(decoded.components)) {
        return [];
      }
      return decoded.components.map((comp, index) => ({
        index,
        type: comp.type || "unknown",
        ...validateComponent(comp, schemas)
      }));
    }
    module.exports = { validateComponent, validateStream };
  }
});

// src/extend.js
var require_extend = __commonJS({
  "src/extend.js"(exports, module) {
    "use strict";
    var { SCHEMAS } = require_schema();
    var { RENDERERS } = require_renderer();
    function registerComponent(id, definition) {
      const numId = Number(id);
      if (!Number.isInteger(numId) || numId < 1) {
        throw new Error(`registerComponent: id \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C \u0446\u0435\u043B\u044B\u043C \u0447\u0438\u0441\u043B\u043E\u043C, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E: ${id}`);
      }
      if (numId >= 20 && numId <= 39) {
        throw new Error(
          `registerComponent: COMP_ID ${numId} \u0437\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043E\u0432\u0430\u043D (20\u201332 = PASH-Doc, 33\u201339 = \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E). \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 ID 40+`
        );
      }
      if (SCHEMAS[numId]) {
        throw new Error(
          `registerComponent: COMP_ID ${numId} \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C "${SCHEMAS[numId].name}". \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 ID \u0438\u0437 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0430 40+`
        );
      }
      const { name, fields, render } = definition || {};
      if (!name || typeof name !== "string") {
        throw new Error("registerComponent: \u043F\u043E\u043B\u0435 name \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E (\u0441\u0442\u0440\u043E\u043A\u0430)");
      }
      if (!Array.isArray(fields)) {
        throw new Error("registerComponent: \u043F\u043E\u043B\u0435 fields \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E (\u043C\u0430\u0441\u0441\u0438\u0432 FieldDef)");
      }
      if (typeof render !== "function") {
        throw new Error("registerComponent: \u043F\u043E\u043B\u0435 render \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E (\u0444\u0443\u043D\u043A\u0446\u0438\u044F (fields) => string)");
      }
      SCHEMAS[numId] = { v: 1, name, fields };
      RENDERERS[name] = render;
    }
    function isRegistered(id) {
      return Boolean(SCHEMAS[Number(id)]);
    }
    function listComponents() {
      return Object.entries(SCHEMAS).map(([id, schema]) => ({
        id: Number(id),
        name: schema.name,
        fieldsCount: schema.fields.length
      }));
    }
    module.exports = { registerComponent, isRegistered, listComponents };
  }
});

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "pash-sdk",
      version: "1.0.0",
      description: "PASH \u2014 Protocol for Agentic Semantic Hypermedia. LLM-agnostic UI protocol. For prompt generation use @pash/prompt.",
      main: "dist/pash.cjs.js",
      module: "dist/pash.esm.js",
      browser: "dist/pash.browser.js",
      types: "types/index.d.ts",
      exports: {
        ".": {
          import: "./dist/pash.esm.js",
          require: "./dist/pash.cjs.js",
          types: "./types/index.d.ts"
        },
        "./richtext": {
          require: "./src/richtext.js",
          types: "./types/index.d.ts"
        },
        "./doc": {
          require: "./src/schema-doc.js"
        }
      },
      bin: {
        pash: "./bin/pash.js"
      },
      files: [
        "dist/",
        "types/",
        "bin/",
        "src/",
        "spec/",
        "SYSTEM_PROMPT.md"
      ],
      scripts: {
        build: "node build.js",
        test: "jest --forceExit",
        "test:coverage": "jest --coverage --forceExit",
        "test:watch": "jest --watch",
        benchmark: "node benchmarks/token-count.js",
        prepublishOnly: "npm run build && npm test",
        release: "node scripts/publish.sh"
      },
      keywords: [
        "ai",
        "llm",
        "protocol",
        "ui",
        "token-efficient",
        "agent",
        "streaming",
        "pash",
        "component",
        "semantic"
      ],
      author: "Sergei",
      license: "MIT",
      devDependencies: {
        esbuild: "^0.20.0",
        jest: "^29.7.0"
      },
      jest: {
        testEnvironment: "node",
        testMatch: [
          "**/test/**/*.test.js"
        ]
      }
    };
  }
});

// src/version.js
var require_version = __commonJS({
  "src/version.js"(exports, module) {
    "use strict";
    var pkg = require_package();
    module.exports = { VERSION: pkg.version };
  }
});

// index.js
var require_pash_sdk_v1_0 = __commonJS({
  "index.js"(exports, module) {
    var { SCHEMAS, SCHEMAS_UI, SCHEMAS_DOC } = require_schema();
    var { tokenize } = require_tokenizer();
    var { formatField } = require_formatter();
    var { parseLine, decodeStream } = require_parser();
    var { encode, encodeStream } = require_encoder();
    var { renderComponent, renderStream, RENDERERS } = require_renderer();
    var {
      renderRichtext,
      renderRichtextWrapped,
      setRichtextRenderer,
      resetRichtextRenderer
    } = require_richtext();
    var { StreamingDecoder } = require_streaming();
    var { EventStreamDecoder, pashToEvents, parseEvent } = require_events();
    var { Dictionary, defaultDictionary } = require_dictionary();
    var {
      setLocale,
      getLocale,
      addLocale,
      formatCurrency,
      formatDate,
      formatPercent
    } = require_locale();
    var { validateComponent, validateStream } = require_validator();
    var { registerComponent, isRegistered, listComponents } = require_extend();
    var { VERSION } = require_version();
    module.exports = {
      // ─── Schemas ────────────────────────────────────────────────────────────────
      SCHEMAS,
      SCHEMAS_UI,
      SCHEMAS_DOC,
      // ─── Parsing ────────────────────────────────────────────────────────────────
      tokenize,
      formatField,
      parseLine,
      decodeStream,
      // ─── Encoding ───────────────────────────────────────────────────────────────
      encode,
      encodeStream,
      // ─── Rendering ──────────────────────────────────────────────────────────────
      renderComponent,
      renderStream,
      RENDERERS,
      // ─── Richtext ───────────────────────────────────────────────────────────────
      renderRichtext,
      renderRichtextWrapped,
      setRichtextRenderer,
      resetRichtextRenderer,
      // ─── Streaming ──────────────────────────────────────────────────────────────
      StreamingDecoder,
      EventStreamDecoder,
      pashToEvents,
      parseEvent,
      // ─── Content Layer (PASH+ID) ─────────────────────────────────────────────────
      Dictionary,
      defaultDictionary,
      // ─── i18n ───────────────────────────────────────────────────────────────────
      setLocale,
      getLocale,
      addLocale,
      formatCurrency,
      formatDate,
      formatPercent,
      // ─── Validation ─────────────────────────────────────────────────────────────
      validateComponent,
      validateStream,
      // ─── Extension ──────────────────────────────────────────────────────────────
      registerComponent,
      isRegistered,
      listComponents,
      // ─── Meta ───────────────────────────────────────────────────────────────────
      VERSION
    };
  }
});
export default require_pash_sdk_v1_0();
