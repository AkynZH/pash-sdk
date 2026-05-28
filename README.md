# PASH — Protocol for Agentic Semantic Hypermedia

[![npm](https://img.shields.io/npm/v/pash-sdk)](https://www.npmjs.com/package/pash-sdk)
[![CI](https://github.com/YOUR/pash/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR/pash/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **The AI doesn't write markup. It sends intent. The client renders.**

PASH is a token-efficient text format for transmitting UI components from LLMs to clients.

Instead of asking the AI to generate HTML:
```html
<div class="product-card"><h3>Смартфон X1</h3><p>AMOLED 120Hz</p>
<span class="price">69 990 ₽</span><button>Купить</button></div>
```
*(52 tokens)*

The AI outputs:
```
1|Смартфон X1|AMOLED 120Hz|69990|Купить
```
*(11 tokens — 79% fewer)*

Your client knows `1 = ProductCard`, renders it with your CSS, your locale, your design system.

---

## Quick Start: 1 minute integration

### Step 1 — Get the system prompt

```js
const { generateSystemPrompt } = require('pash-sdk');

const system = generateSystemPrompt({ lang: 'ru', mode: 'pash' });
// Auto-generated from your component registry. Always in sync.
```

### Step 2 — Decode the AI response

```js
const { decodeStream, renderStream } = require('pash-sdk');

const aiResponse = `
1|Смартфон X1|AMOLED 120Hz, 256GB|69990|Купить
2|warn|Последний в наличии
`;

const decoded = decodeStream(aiResponse);
// { version: null, components: [ ProductCard, Notification ] }

document.getElementById('output').innerHTML = renderStream(decoded);
```

### Step 3 — Streaming (optional)

```js
const { StreamingDecoder, renderComponent } = require('pash-sdk');

const decoder = new StreamingDecoder((component) => {
  document.getElementById('output').innerHTML += renderComponent(component);
});

const response = await fetch('/api/ai');
const reader   = response.body.getReader();
const utf8     = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) { decoder.flush(); break; }
  decoder.push(utf8.decode(value));
}
```

### Non-JS users

Copy a ready-to-use prompt from [`SYSTEM_PROMPT.md`](SYSTEM_PROMPT.md) — available in Russian and English, for all three modes.

---

## Installation

```bash
npm install pash-sdk
```

Browser (no bundler):
```html
<script src="https://unpkg.com/pash-sdk/dist/pash.browser.js"></script>
<script>
  const { decodeStream } = PASH;
</script>
```

---

## Format

```
COMP_ID|field1|field2|field3|...
```

- `|` — separator (1 BPE token in GPT-4, LLaMA-3)
- `\|` — escaped pipe inside a value
- `#` — nested component prefix
- `v:1` — optional version header (first line)
- `\n` — component separator

### Token efficiency

| Format    | Tokens | vs HTML |
|-----------|--------|---------|
| HTML      | ~52    | —       |
| JSON      | ~34    | −35%    |
| Markdown  | ~26    | −50%    |
| **PASH**  | **~11**| **−79%**|
| PASH+ID   | ~7     | −87%    |

---

## Component Registry

### UI Components (ID 1–6)

| ID | Component    | Fields                                        |
|----|--------------|-----------------------------------------------|
| 1  | ProductCard  | title\* \| desc \| price[currency] \| cta    |
| 2  | Notification | level\*(info\|warn\|error) \| message\*      |
| 3  | List         | title \| items\*                             |
| 4  | Hero         | headline\* \| sub \| cta                    |
| 5  | Article      | title\* \| author \| date \| summary         |
| 6  | RichBlock    | content\*[richtext]                          |

### PASH-Doc Blocks (ID 20–32)

| ID | Block        | Fields                                        |
|----|--------------|-----------------------------------------------|
| 20 | Heading      | level\*(1-6) \| text\*                       |
| 21 | Paragraph    | text\*[richtext]                             |
| 22 | Code         | lang \| body\*                               |
| 23 | Blockquote   | author \| text\*[richtext]                   |
| 24 | Image        | url\* \| alt \| caption                      |
| 25 | Divider      | —                                            |
| 26 | Table        | headers\* \| rows\*                          |
| 27 | OrderedList  | title \| items\*                             |
| 28 | BulletList   | title \| items\*                             |
| 29 | Note         | level\*(info\|tip\|warn\|danger) \| text\*   |
| 30 | Spoiler      | title\* \| body\*[richtext]                  |
| 31 | Math         | display\*(block\|inline) \| formula\*        |
| 32 | Embed        | type\*(youtube\|...) \| url\* \| title       |

`*` = required. ID 40+ available for custom components.

---

## What's in the SDK

| Module | Description |
|--------|-------------|
| `decodeStream` / `parseLine` | Parse PASH stream |
| `encode` / `encodeStream` | Serialize components to PASH |
| `renderComponent` / `renderStream` | Components → HTML |
| `setRichtextRenderer` | Plug in marked/remark for richtext |
| `StreamingDecoder` | Byte-by-byte SSE decoder |
| `EventStreamDecoder` | Event Stream format decoder |
| `Dictionary` | Content Layer for PASH+ID mode |
| `setLocale` / `addLocale` | i18n: ru-RU, en-US, de-DE + custom |
| `validateStream` | Validate against schema |
| `registerComponent` | Add custom component (ID 40+) |
| `generateSystemPrompt` | System prompt, always in sync with registry |
| `VERSION` | SDK version string |

---

## Modes

| Mode | Example | Tokens |
|------|---------|--------|
| `pash` | `1\|Смартфон X1\|AMOLED\|69990\|Купить` | ~11 |
| `pash+id` | `1\|102\|45\|69990\|12` | ~7 |
| `events` | `COMP_START(1)\nTEXT(Смартфон X1)...` | similar |

---

## CLI

```bash
npm install -g pash-sdk

echo "1|Смартфон X1|AMOLED|69990|Купить" | pash decode
echo "1|Смартфон X1|AMOLED|69990|Купить" | pash validate
echo "1|Смартфон X1|AMOLED|69990|Купить" | pash render
pash prompt --lang ru --mode pash
```

---

## Custom component

```js
const { registerComponent } = require('pash-sdk');

registerComponent(40, {
  name: 'UserCard',
  fields: [
    { id: 0, type: 'string', label: 'name',  required: true },
    { id: 1, type: 'string', label: 'email'                 },
  ],
  render: (f) => `<div class="user-card"><b>${f.name}</b><span>${f.email}</span></div>`,
});

// AI can now generate: 40|Иван Петров|ivan@example.com
```

---

## Locale

```js
const { setLocale } = require('pash-sdk');

setLocale('en-US');  // price: 69990 → $69,990
setLocale('de-DE');  // price: 69990 → 69.990 €
setLocale('ru-RU');  // price: 69990 → 69 990 ₽  (default)
```

---

## Links

- [Specification](spec/pash-v1.md)
- [System Prompts](SYSTEM_PROMPT.md)
- [Playground](https://YOUR.github.io/pash)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

---

## Community

**Good first issues:** new components, language ports, React/Vue bindings.  
See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

[MIT](LICENSE) — Copyright (c) 2026 Sergei
