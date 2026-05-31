"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/schema-ui.js
var require_schema_ui = __commonJS({
  "src/schema-ui.js"(exports2, module2) {
    "use strict";
    var SCHEMAS_UI2 = {
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
    module2.exports = { SCHEMAS_UI: SCHEMAS_UI2 };
  }
});

// src/schema-doc.js
var require_schema_doc = __commonJS({
  "src/schema-doc.js"(exports2, module2) {
    "use strict";
    var SCHEMAS_DOC2 = {
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
    module2.exports = { SCHEMAS_DOC: SCHEMAS_DOC2 };
  }
});

// src/schema.js
var require_schema = __commonJS({
  "src/schema.js"(exports2, module2) {
    "use strict";
    var { SCHEMAS_UI: SCHEMAS_UI2 } = require_schema_ui();
    var { SCHEMAS_DOC: SCHEMAS_DOC2 } = require_schema_doc();
    var SCHEMAS2 = Object.assign(/* @__PURE__ */ Object.create(null), SCHEMAS_UI2, SCHEMAS_DOC2);
    module2.exports = { SCHEMAS: SCHEMAS2, SCHEMAS_UI: SCHEMAS_UI2, SCHEMAS_DOC: SCHEMAS_DOC2 };
  }
});

// src/tokenizer.js
var require_tokenizer = __commonJS({
  "src/tokenizer.js"(exports2, module2) {
    "use strict";
    function tokenize2(line) {
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
    module2.exports = { tokenize: tokenize2 };
  }
});

// src/locale.js
var require_locale = __commonJS({
  "src/locale.js"(exports2, module2) {
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
    function setLocale2(code) {
      if (!LOCALES[code])
        throw new Error(`\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043B\u043E\u043A\u0430\u043B\u044C: ${code}. \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B: ${Object.keys(LOCALES).join(", ")}`);
      _active = code;
    }
    function getLocale2() {
      return { ...LOCALES[_active], code: _active };
    }
    function addLocale2(code, config) {
      if (!config.currency || !config.currencyPos)
        throw new Error("addLocale: \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B currency \u0438 currencyPos");
      LOCALES[code] = config;
    }
    function formatCurrency2(value) {
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
    function formatDate2(value) {
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
    function formatPercent2(value) {
      const n = parseFloat(String(value != null ? value : ""));
      if (isNaN(n))
        return String(value != null ? value : "");
      return `${n}${LOCALES[_active].percentSym}`;
    }
    module2.exports = { setLocale: setLocale2, getLocale: getLocale2, addLocale: addLocale2, formatCurrency: formatCurrency2, formatDate: formatDate2, formatPercent: formatPercent2 };
  }
});

// src/dictionary.js
var require_dictionary = __commonJS({
  "src/dictionary.js"(exports2, module2) {
    "use strict";
    var Dictionary2 = class {
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
    var defaultDictionary2 = new Dictionary2();
    module2.exports = { Dictionary: Dictionary2, defaultDictionary: defaultDictionary2 };
  }
});

// src/formatter.js
var require_formatter = __commonJS({
  "src/formatter.js"(exports2, module2) {
    "use strict";
    var locale = require_locale();
    var { Dictionary: Dictionary2, defaultDictionary: defaultDictionary2 } = require_dictionary();
    function formatField2(value, fieldDef) {
      if (!fieldDef)
        return String(value != null ? value : "");
      const { type, format, values: enumValues } = fieldDef;
      let v = String(value != null ? value : "");
      if (Dictionary2.isId(v) && type !== "number") {
        const resolved = defaultDictionary2.resolve(v);
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
    module2.exports = { formatField: formatField2 };
  }
});

// src/parser.js
var require_parser = __commonJS({
  "src/parser.js"(exports2, module2) {
    "use strict";
    var { tokenize: tokenize2 } = require_tokenizer();
    var { formatField: formatField2 } = require_formatter();
    var { SCHEMAS: SCHEMAS2 } = require_schema();
    function parseLine2(line, schemas) {
      schemas = schemas || SCHEMAS2;
      const tokens = tokenize2(line.trim());
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
          fields[fieldDef.label] = formatField2(raw, fieldDef);
          pos++;
        }
      }
      return {
        component: { type: schema.name, id, fields },
        nextOffset: pos - offset
        // сколько токенов потребили начиная с offset
      };
    }
    function decodeStream2(stream, schemas) {
      schemas = schemas || SCHEMAS2;
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
      const components = data.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => parseLine2(l, schemas));
      return { version, components };
    }
    module2.exports = { parseLine: parseLine2, decodeStream: decodeStream2 };
  }
});

// src/encoder.js
var require_encoder = __commonJS({
  "src/encoder.js"(exports2, module2) {
    "use strict";
    var { SCHEMAS: SCHEMAS2 } = require_schema();
    var { Dictionary: Dictionary2 } = require_dictionary();
    function encode2(component, options = {}) {
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
    function encodeStream2(components, options = {}) {
      const { version = null, useIds = false, dict = null } = options;
      const lines = components.map((c) => encode2(c, { useIds, dict }));
      return version ? `v:${version}
${lines.join("\n")}` : lines.join("\n");
    }
    function _findSchema(component) {
      if (component.type && component.type !== "unknown") {
        const entry = Object.entries(SCHEMAS2).find(([, s]) => s.name === component.type);
        if (entry)
          return { ...entry[1], id: Number(entry[0]) };
      }
      const numId = component.id !== void 0 ? Number(component.id) : NaN;
      if (!isNaN(numId) && SCHEMAS2[numId]) {
        return { ...SCHEMAS2[numId], id: numId };
      }
      return null;
    }
    module2.exports = { encode: encode2, encodeStream: encodeStream2 };
  }
});

// src/richtext.js
var require_richtext = __commonJS({
  "src/richtext.js"(exports2, module2) {
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
    function setRichtextRenderer2(fn) {
      if (typeof fn !== "function") {
        throw new TypeError("setRichtextRenderer: \u043E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u0444\u0443\u043D\u043A\u0446\u0438\u044F (text) => string");
      }
      _customRenderer = fn;
    }
    function resetRichtextRenderer2() {
      _customRenderer = null;
    }
    function renderRichtext2(text) {
      if (!text)
        return "";
      return _customRenderer ? _customRenderer(String(text)) : _builtinRender(String(text));
    }
    function renderRichtextWrapped2(text, tag, cls) {
      tag = tag || "p";
      const inner = renderRichtext2(text);
      const clsAttr = cls ? ` class="${cls}"` : "";
      return `<${tag}${clsAttr}>${inner}</${tag}>`;
    }
    module2.exports = { renderRichtext: renderRichtext2, renderRichtextWrapped: renderRichtextWrapped2, setRichtextRenderer: setRichtextRenderer2, resetRichtextRenderer: resetRichtextRenderer2 };
  }
});

// src/renderer.js
var require_renderer = __commonJS({
  "src/renderer.js"(exports2, module2) {
    "use strict";
    var { renderRichtext: renderRichtext2, renderRichtextWrapped: renderRichtextWrapped2 } = require_richtext();
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
  ${f.summary ? renderRichtextWrapped2(f.summary, "div", "pash-article-summary") : ""}
</article>`;
    }
    function _renderRichBlock(f) {
      return renderRichtextWrapped2(f.content, "div", "pash-richblock");
    }
    function _renderHeading(f) {
      const lvl = Math.min(Math.max(parseInt(f.level, 10) || 2, 1), 6);
      return `<h${lvl} class="pash-doc-heading pash-doc-h${lvl}">${_esc(f.text)}</h${lvl}>`;
    }
    function _renderParagraph(f) {
      return renderRichtextWrapped2(f.text, "p", "pash-doc-paragraph");
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
  ${renderRichtextWrapped2(f.text, "p", "pash-doc-blockquote-text")}${cite}
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
      const lis = items.map((i) => `  <li>${renderRichtext2(i)}</li>`).join("\n");
      return `<div class="pash-doc-list pash-doc-list--ordered">
  ${f.title ? `<p class="pash-doc-list-title">${_esc(f.title)}</p>` : ""}
  <ol>
${lis}
  </ol>
</div>`;
    }
    function _renderBulletList(f) {
      const items = Array.isArray(f.items) ? f.items : [];
      const lis = items.map((i) => `  <li>${renderRichtext2(i)}</li>`).join("\n");
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
  ${renderRichtextWrapped2(f.text, "div", "pash-doc-note-text")}
</div>`;
    }
    function _renderSpoiler(f) {
      return `<details class="pash-doc-spoiler">
  <summary class="pash-doc-spoiler-title">${_esc(f.title)}</summary>
  ${renderRichtextWrapped2(f.body, "div", "pash-doc-spoiler-body")}
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
    var RENDERERS2 = {
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
        out[key] = val && typeof val === "object" && val.type ? renderComponent2(val) : val;
      }
      return out;
    }
    function renderComponent2(node) {
      if (!node)
        return "";
      if (node.type === "unknown")
        return _renderUnknown(node);
      const fn = RENDERERS2[node.type];
      if (!fn)
        return _renderUnknown(node);
      return fn(_resolveNested(node.fields));
    }
    function renderStream2(decoded) {
      if (!decoded || !Array.isArray(decoded.components))
        return "";
      return decoded.components.map(renderComponent2).join("\n");
    }
    module2.exports = { renderComponent: renderComponent2, renderStream: renderStream2, RENDERERS: RENDERERS2 };
  }
});

// src/streaming.js
var require_streaming = __commonJS({
  "src/streaming.js"(exports2, module2) {
    "use strict";
    var { parseLine: parseLine2 } = require_parser();
    var { SCHEMAS: SCHEMAS2 } = require_schema();
    var StreamingDecoder2 = class {
      /**
       * @param {function(component, version)} onComponent — коллбэк на готовый компонент
       * @param {object} options
       * @param {object} options.registry — реестр схем (по умолчанию SCHEMAS)
       */
      constructor(onComponent, options) {
        options = options || {};
        this._onComponent = onComponent || function() {
        };
        this._schemas = options.registry || SCHEMAS2;
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
        const component = parseLine2(trimmed, this._schemas);
        this._onComponent(component, this._version);
      }
    };
    module2.exports = { StreamingDecoder: StreamingDecoder2 };
  }
});

// src/events.js
var require_events = __commonJS({
  "src/events.js"(exports2, module2) {
    "use strict";
    var { SCHEMAS: SCHEMAS2 } = require_schema();
    var { Dictionary: Dictionary2 } = require_dictionary();
    var EVENT_RE = /^([A-Z_]+)\(([^)]*)\)$/;
    function parseEvent2(line) {
      const m = EVENT_RE.exec(line.trim());
      if (!m)
        return { type: "UNKNOWN", value: line.trim() };
      return { type: m[1], value: m[2] };
    }
    var EventStreamDecoder2 = class {
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
        this._schemas = options.registry || SCHEMAS2;
        this._dict = options.dictionary || new Dictionary2();
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
            this._processEvent(parseEvent2(line));
        }
      }
      flush() {
        if (this._buffer.trim()) {
          this._processEvent(parseEvent2(this._buffer));
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
    function pashToEvents2(stream) {
      var _a;
      const { decodeStream: decodeStream2 } = require_parser();
      const decoded = decodeStream2(stream);
      const lines = [];
      for (const comp of decoded.components) {
        const schema = SCHEMAS2[comp.id];
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
    module2.exports = { parseEvent: parseEvent2, EventStreamDecoder: EventStreamDecoder2, pashToEvents: pashToEvents2 };
  }
});

// src/validator.js
var require_validator = __commonJS({
  "src/validator.js"(exports2, module2) {
    "use strict";
    var { SCHEMAS: SCHEMAS2 } = require_schema();
    function validateComponent2(node, schemas) {
      schemas = schemas || SCHEMAS2;
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
    function validateStream2(decoded, schemas) {
      schemas = schemas || SCHEMAS2;
      if (!decoded || !Array.isArray(decoded.components)) {
        return [];
      }
      return decoded.components.map((comp, index) => ({
        index,
        type: comp.type || "unknown",
        ...validateComponent2(comp, schemas)
      }));
    }
    module2.exports = { validateComponent: validateComponent2, validateStream: validateStream2 };
  }
});

// src/extend.js
var require_extend = __commonJS({
  "src/extend.js"(exports2, module2) {
    "use strict";
    var { SCHEMAS: SCHEMAS2 } = require_schema();
    var { RENDERERS: RENDERERS2 } = require_renderer();
    function registerComponent2(id, definition) {
      const numId = Number(id);
      if (!Number.isInteger(numId) || numId < 1) {
        throw new Error(`registerComponent: id \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C \u0446\u0435\u043B\u044B\u043C \u0447\u0438\u0441\u043B\u043E\u043C, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E: ${id}`);
      }
      if (numId >= 20 && numId <= 39) {
        throw new Error(
          `registerComponent: COMP_ID ${numId} \u0437\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043E\u0432\u0430\u043D (20\u201332 = PASH-Doc, 33\u201339 = \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E). \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 ID 40+`
        );
      }
      if (SCHEMAS2[numId]) {
        throw new Error(
          `registerComponent: COMP_ID ${numId} \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C "${SCHEMAS2[numId].name}". \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 ID \u0438\u0437 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0430 40+`
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
      SCHEMAS2[numId] = { v: 1, name, fields };
      RENDERERS2[name] = render;
    }
    function isRegistered2(id) {
      return Boolean(SCHEMAS2[Number(id)]);
    }
    function listComponents2() {
      return Object.entries(SCHEMAS2).map(([id, schema]) => ({
        id: Number(id),
        name: schema.name,
        fieldsCount: schema.fields.length
      }));
    }
    module2.exports = { registerComponent: registerComponent2, isRegistered: isRegistered2, listComponents: listComponents2 };
  }
});

// src/prompt.js
var require_prompt = __commonJS({
  "src/prompt.js"(exports2, module2) {
    "use strict";
    var { SCHEMAS: SCHEMAS2 } = require_schema();
    function generateSystemPrompt2(options) {
      options = options || {};
      const schemas = options.schemas || SCHEMAS2;
      const mode = options.mode || "pash";
      const lang = options.lang || "ru";
      const ctx = { schemas, mode };
      return lang === "en" ? _buildEn(ctx) : _buildRu(ctx);
    }
    function _buildRu(ctx) {
      return [
        "# \u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u043F\u0440\u043E\u043C\u043F\u0442: PASH v1 (Protocol for Agentic Semantic Hypermedia)",
        "",
        "## \u0422\u0432\u043E\u044F \u0440\u043E\u043B\u044C",
        "\u0422\u044B \u2014 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043D\u0430\u043C\u0435\u0440\u0435\u043D\u0438\u0439, \u0430 \u043D\u0435 \u0432\u0435\u0440\u0441\u0442\u0430\u043B\u044C\u0449\u0438\u043A.",
        "\u0422\u044B \u041D\u0415 \u043F\u0438\u0448\u0435\u0448\u044C HTML, Markdown, CSS \u0438\u043B\u0438 \u043E\u0431\u044B\u0447\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u0432 \u043E\u0442\u0432\u0435\u0442\u0430\u0445 \u0441 UI.",
        "\u0422\u044B \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0435\u0448\u044C \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043F\u043E\u0442\u043E\u043A \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 PASH.",
        "",
        "## \u0424\u043E\u0440\u043C\u0430\u0442 \u043E\u0442\u0432\u0435\u0442\u0430",
        "",
        _buildRules(ctx.mode, "ru"),
        "",
        "## \u0420\u0435\u0435\u0441\u0442\u0440 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432",
        "",
        _buildRegistry(ctx.schemas, ctx.mode),
        "",
        _buildRichtextNote("ru"),
        "",
        "## \u041F\u0440\u0438\u043C\u0435\u0440\u044B",
        "",
        _buildExamples(ctx.schemas, ctx.mode),
        "",
        "## \u0421\u0442\u0440\u043E\u0433\u0438\u0435 \u0437\u0430\u043F\u0440\u0435\u0442\u044B",
        "",
        '- \u041D\u0415 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0439 \u043F\u043E\u044F\u0441\u043D\u0435\u043D\u0438\u044F \u043A PASH-\u043E\u0442\u0432\u0435\u0442\u0443 ("\u0412\u043E\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430:", "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442:")',
        "- \u041D\u0415 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 Markdown-\u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0443 \u0432\u043D\u0435 richtext-\u043F\u043E\u043B\u0435\u0439",
        "- \u041D\u0415 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0439 \u0441\u0438\u043C\u0432\u043E\u043B \u0432\u0430\u043B\u044E\u0442\u044B \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0438\u0441\u0442\u043E\u0435 \u0447\u0438\u0441\u043B\u043E (69990, \u043D\u0435 69990\u20BD)",
        "- \u041D\u0415 \u0438\u0437\u043C\u0435\u043D\u044F\u0439 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u043F\u043E\u043B\u0435\u0439 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E \u0441\u0445\u0435\u043C\u0435",
        "- \u041D\u0415 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 \u043D\u0435\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 ID \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432",
        "- \u0415\u0441\u043B\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043F\u043E\u043B\u044F \u043D\u0435\u0442 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C \u043F\u043E\u043B\u0435 \u043F\u0443\u0441\u0442\u044B\u043C, \u043D\u0435 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0439 \u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C |",
        "- \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 (#) \u0432\u043D\u0443\u0442\u0440\u0438 richtext-\u043F\u043E\u043B\u0435\u0439 \u0417\u0410\u041F\u0420\u0415\u0429\u0415\u041D\u042B \u2014 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 20",
        "",
        "## Fallback",
        "",
        "\u0415\u0441\u043B\u0438 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 UI \u2014 \u043E\u0442\u0432\u0435\u0447\u0430\u0439 \u043E\u0431\u044B\u0447\u043D\u044B\u043C \u0442\u0435\u043A\u0441\u0442\u043E\u043C.",
        "\u0415\u0441\u043B\u0438 \u043D\u0443\u0436\u043D\u043E\u0433\u043E \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430 \u043D\u0435\u0442 \u2014 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0438\u0439 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0439."
      ].join("\n");
    }
    function _buildEn(ctx) {
      return [
        "# System Prompt: PASH v1 (Protocol for Agentic Semantic Hypermedia)",
        "",
        "## Your role",
        "You are a data and intent provider, not a markup writer.",
        "You do NOT write HTML, Markdown, CSS, or plain prose for UI responses.",
        "You generate structured output in PASH format.",
        "",
        "## Response format",
        "",
        _buildRules(ctx.mode, "en"),
        "",
        "## Component registry",
        "",
        _buildRegistry(ctx.schemas, ctx.mode),
        "",
        _buildRichtextNote("en"),
        "",
        "## Examples",
        "",
        _buildExamples(ctx.schemas, ctx.mode),
        "",
        "## Strict prohibitions",
        "",
        '- Do NOT add commentary ("Here is a card:", "Result:")',
        "- Do NOT use Markdown formatting outside richtext fields",
        "- Do NOT include currency symbols \u2014 raw numbers only (69990, not $69990)",
        "- Do NOT reorder fields \u2014 follow the schema strictly",
        "- Do NOT invent component IDs not in the registry",
        "- If a field has no data \u2014 leave it empty, do NOT skip the | separator",
        "- Headings (#) inside richtext fields are FORBIDDEN \u2014 use component 20",
        "",
        "## Fallback",
        "",
        "If the request does not need UI \u2014 respond in plain text.",
        "If no matching component exists \u2014 use the closest one."
      ].join("\n");
    }
    function _buildRules(mode, lang) {
      if (mode === "events") {
        return lang === "ru" ? "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 Event Stream \u0444\u043E\u0440\u043C\u0430\u0442:\nCOMP_START(ID)\nTEXT(\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435) | PRICE(\u0447\u0438\u0441\u043B\u043E) | LIST(a,b,c) | ENUM(val) | RICHTEXT(\u0442\u0435\u043A\u0441\u0442)\nCOMP_END(ID)\n\u041A\u0430\u0436\u0434\u043E\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u0435 \u2014 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430." : "Use Event Stream format:\nCOMP_START(ID)\nTEXT(value) | PRICE(number) | LIST(a,b,c) | ENUM(val) | RICHTEXT(text)\nCOMP_END(ID)\nOne event per line.";
      }
      if (mode === "pash+id") {
        return lang === "ru" ? "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 PASH+ID \u0444\u043E\u0440\u043C\u0430\u0442 (\u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u0436\u0430\u0442\u0438\u0435):\nCOMP_ID|DICT_ID|DICT_ID|\u0447\u0438\u0441\u043B\u043E|DICT_ID\n\u0412\u0441\u0435 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0437\u0430\u043C\u0435\u043D\u044F\u0439 \u043D\u0430 \u0447\u0438\u0441\u043B\u043E\u0432\u044B\u0435 ID \u0438\u0437 \u0441\u043B\u043E\u0432\u0430\u0440\u044F.\n\u0427\u0438\u0441\u043B\u0430 (\u0446\u0435\u043D\u044B) \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0439 \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E. \u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C | . \u041E\u0434\u0438\u043D \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 \u2014 \u043E\u0434\u043D\u0430 \u0441\u0442\u0440\u043E\u043A\u0430." : "Use PASH+ID format (maximum compression):\nCOMP_ID|DICT_ID|DICT_ID|number|DICT_ID\nReplace all text values with numeric dictionary IDs.\nNumbers (prices) pass directly. Separator | . One component per line.";
      }
      return lang === "ru" ? "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 PASH \u0444\u043E\u0440\u043C\u0430\u0442:\nCOMP_ID|\u043F\u043E\u043B\u04351|\u043F\u043E\u043B\u04352|\u043F\u043E\u043B\u04353|...\n\u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u2014 \u043F\u0430\u0439\u043F |. \u041A\u0430\u0436\u0434\u044B\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 \u2014 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430.\n\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432 \u2014 \u043A\u0430\u0436\u0434\u044B\u0439 \u043D\u0430 \u043D\u043E\u0432\u043E\u0439 \u0441\u0442\u0440\u043E\u043A\u0435.\n\u041E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E \u043F\u0435\u0440\u0432\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: v:1\n\u0415\u0441\u043B\u0438 \u043F\u043E\u043B\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 | \u2014 \u044D\u043A\u0440\u0430\u043D\u0438\u0440\u0443\u0439: \\|" : "Use PASH format:\nCOMP_ID|field1|field2|field3|...\nSeparator is pipe |. One component per line.\nMultiple components \u2014 one per line.\nOptional first line: v:1\nIf a field value contains | \u2014 escape it: \\|";
    }
    function _buildRegistry(schemas, mode) {
      const lines = [];
      for (const [id, schema] of Object.entries(schemas)) {
        const fieldList = schema.fields.map((f) => {
          let s = f.label;
          if (f.type === "enum" && f.values)
            s += `(${f.values.join("|")})`;
          if (f.format)
            s += `[${f.format}]`;
          if (f.required)
            s += "*";
          return s;
        }).join(" | ");
        const example = _buildOneExample(id, schema, mode);
        lines.push(`${id} = ${schema.name}: ${fieldList || "\u2014"}`);
        lines.push(`   \u2192 ${example}`);
        lines.push("");
      }
      lines.push("* = \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043B\u0435 / required");
      lines.push("[currency] = \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0439 \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0438\u0441\u043B\u043E, \u043A\u043B\u0438\u0435\u043D\u0442 \u0434\u043E\u0431\u0430\u0432\u0438\u0442 \u0432\u0430\u043B\u044E\u0442\u0443 / pass raw number");
      return lines.join("\n");
    }
    function _buildOneExample(id, schema, mode) {
      const samples = {
        title: mode === "pash+id" ? "102" : "\u0421\u043C\u0430\u0440\u0442\u0444\u043E\u043D X1",
        desc: mode === "pash+id" ? "45" : "AMOLED 120Hz",
        price: "69990",
        cta: mode === "pash+id" ? "12" : "\u041A\u0443\u043F\u0438\u0442\u044C",
        level: "info",
        message: mode === "pash+id" ? "78" : "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 1-2 \u0434\u043D\u044F",
        items: "AMOLED,256GB,5000mAh",
        headline: mode === "pash+id" ? "55" : "\u0424\u043B\u0430\u0433\u043C\u0430\u043D \u0441\u0435\u0437\u043E\u043D\u0430",
        sub: mode === "pash+id" ? "56" : "\u041B\u0443\u0447\u0448\u0438\u0439 \u0441\u043C\u0430\u0440\u0442\u0444\u043E\u043D 2025",
        text: mode === "pash+id" ? "60" : "\u0422\u0435\u043A\u0441\u0442 \u043F\u0430\u0440\u0430\u0433\u0440\u0430\u0444\u0430",
        body: mode === "pash+id" ? "61" : "\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u0431\u043B\u043E\u043A\u0430",
        author: "\u0410\u0432\u0442\u043E\u0440",
        caption: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C",
        url: "https://example.com/image.jpg",
        alt: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
        headers: "\u0413\u043E\u0434,\u0423\u0437\u043B\u044B",
        rows: "1969,4;1970,9",
        lang: "python",
        display: "block",
        formula: "E = mc^2",
        type: "youtube",
        summary: "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
        content: "\u0422\u0435\u043A\u0441\u0442 \u0441 **\u0430\u043A\u0446\u0435\u043D\u0442\u043E\u043C**",
        date: "2025-01-01"
      };
      if (mode === "events") {
        const events = [`COMP_START(${id})`];
        schema.fields.forEach((f) => {
          const val = samples[f.label] || "value";
          const evType = f.format === "currency" ? "PRICE" : f.format === "date" ? "DATE" : f.type === "list" ? "LIST" : f.type === "enum" ? "ENUM" : f.type === "richtext" ? "RICHTEXT" : "TEXT";
          events.push(`${evType}(${val})`);
        });
        events.push(`COMP_END(${id})`);
        return "\n   " + events.join("\n   ");
      }
      const values = schema.fields.map((f) => samples[f.label] || "");
      return `${id}|${values.join("|")}`;
    }
    function _buildExamples(schemas, mode) {
      const ids = Object.keys(schemas);
      const lines = [];
      if (ids.length > 0) {
        const id = ids[0];
        const schema = schemas[id];
        lines.push("# \u041E\u0434\u0438\u043D \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442");
        lines.push(_buildOneExample(id, schema, mode));
        lines.push("");
      }
      if (ids.length > 1 && mode !== "events") {
        lines.push("# \u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432");
        lines.push(_buildOneExample(ids[0], schemas[ids[0]], mode));
        lines.push(_buildOneExample(ids[1], schemas[ids[1]], mode));
        lines.push("");
      }
      return lines.join("\n");
    }
    function _buildRichtextNote(lang) {
      return lang === "ru" ? [
        "## \u0421\u0438\u043D\u0442\u0430\u043A\u0441\u0438\u0441 richtext-\u043F\u043E\u043B\u0435\u0439",
        "",
        "\u0412 \u043F\u043E\u043B\u044F\u0445 \u0441 \u0442\u0438\u043F\u043E\u043C richtext \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F inline-\u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0430:",
        "  **\u0436\u0438\u0440\u043D\u044B\u0439**     \u2014 bold",
        "  _\u043A\u0443\u0440\u0441\u0438\u0432_       \u2014 italic",
        "  `\u043A\u043E\u0434`          \u2014 inline code",
        "  [\u0442\u0435\u043A\u0441\u0442](url)   \u2014 \u0441\u0441\u044B\u043B\u043A\u0430",
        "  \\n             \u2014 \u043F\u0435\u0440\u0435\u043D\u043E\u0441 \u0441\u0442\u0440\u043E\u043A\u0438",
        "",
        "\u0422\u043E\u043B\u044C\u043A\u043E inline. \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 (#) \u2014 \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u044B, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 20."
      ].join("\n") : [
        "## Richtext field syntax",
        "",
        "Fields with type richtext support inline markup:",
        "  **bold**       \u2014 bold",
        "  _italic_       \u2014 italic",
        "  `code`         \u2014 inline code",
        "  [text](url)    \u2014 link",
        "  \\n             \u2014 line break",
        "",
        "Inline only. Headings (#) are forbidden \u2014 use component 20."
      ].join("\n");
    }
    module2.exports = { generateSystemPrompt: generateSystemPrompt2 };
  }
});

// package.json
var require_package = __commonJS({
  "package.json"(exports2, module2) {
    module2.exports = {
      name: "pash-sdk",
      version: "1.0.0",
      description: "Protocol for Agentic Semantic Hypermedia \u2014 token-efficient UI format for AI agents",
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
        prompt: "node scripts/generate-prompt.js",
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
  "src/version.js"(exports2, module2) {
    "use strict";
    var pkg = require_package();
    module2.exports = { VERSION: pkg.version };
  }
});

// index.js
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
var { generateSystemPrompt } = require_prompt();
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
  // ─── System Prompt ──────────────────────────────────────────────────────────
  generateSystemPrompt,
  // ─── Meta ───────────────────────────────────────────────────────────────────
  VERSION
};
