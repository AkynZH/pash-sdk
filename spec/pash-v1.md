# PASH v1 Specification
## Protocol for Agentic Semantic Hypermedia

**Status:** Production  
**Version:** 1.0.0

---

## 1. Overview

PASH is a text-based streaming format for transmitting UI state from LLMs to clients.

**Core principle — Late Binding UI:**
The AI generates only data and intent. The client renders using its own design system, locale, and CSS. The AI does not know about currencies, CSS classes, or button styles.

**Three architecture layers:**

```
Semantic Layer  ← AI generates: COMP_ID + data fields
Content Layer   ← Client: dictionary ID → text (PASH+ID mode)
Render Layer    ← Client: COMP_ID → React / Vue / HTML component
```

---

## 2. Grammar

```ebnf
stream    = [header NEWLINE] component (NEWLINE component)*
header    = "v:" VERSION
component = COMP_ID ("|" field)*
field     = STRING | "#" component
STRING    = (* any chars, "|" escaped as "\|" *)
COMP_ID   = (* positive integer *)
VERSION   = (* integer or semver string *)
NEWLINE   = "\n"
```

---

## 3. Rules

| Rule | Description |
|------|-------------|
| `\|` | Escaped pipe inside a field value |
| `#`  | Field prefix for nested component |
| `v:N`| Optional version header (first line) |
| `\n` | Component separator |
| Empty lines | Ignored |

**PASH+ID mode:** text field values are replaced with numeric dictionary IDs.  
The decoder resolves them via the client-side Dictionary.

---

## 4. ID Ranges

| Range  | Purpose                          |
|--------|----------------------------------|
| 1–6    | Core UI components               |
| 7–19   | Reserved for UI extensions       |
| 20–32  | PASH-Doc document blocks         |
| 33–39  | Reserved for community standards |
| 40+    | Custom components (`registerComponent`) |

---

## 5. UI Component Registry (ID 1–6)

### 1 — ProductCard
```
1|title*|desc|price[currency]|cta
```
Example: `1|Смартфон X1|AMOLED 120Hz|69990|Купить`

### 2 — Notification
```
2|level*(info|warn|error)|message*
```
Example: `2|warn|Последний в наличии`

### 3 — List
```
3|title|items*(comma,separated)
```
Example: `3|Характеристики|AMOLED,256GB,5000mAh`

### 4 — Hero
```
4|headline*|sub|cta
```
Example: `4|Флагман сезона|Лучший смартфон 2025|Смотреть`

### 5 — Article
```
5|title*|author|date[date]|summary[richtext]
```
Example: `5|История PASH|Автор|2025-01-01|Краткое описание`

### 6 — RichBlock
```
6|content*[richtext]
```
Example: `6|Текст с **акцентом** и [ссылкой](https://example.com)`

---

## 6. PASH-Doc Block Registry (ID 20–32)

### 20 — Heading
```
20|level*(1|2|3|4|5|6)|text*
```

### 21 — Paragraph
```
21|text*[richtext]
```

### 22 — Code
```
22|lang|body*
```
Multiline body: use `\n` as literal escape for newlines.

### 23 — Blockquote
```
23|author|text*[richtext]
```

### 24 — Image
```
24|url*|alt|caption
```

### 25 — Divider
```
25
```
No fields.

### 26 — Table
```
26|headers*(comma,separated)|rows*
```
Rows: semicolon-separated rows, comma-separated cells.  
Example rows: `1969,4,USA;1970,9,USA;1971,14,USA`

### 27 — OrderedList
```
27|title|items*(comma,separated)
```

### 28 — BulletList
```
28|title|items*(comma,separated)
```

### 29 — Note
```
29|level*(info|tip|warn|danger)|text*[richtext]
```

### 30 — Spoiler
```
30|title*|body*[richtext]
```

### 31 — Math
```
31|display*(block|inline)|formula*
```
Formula is LaTeX/KaTeX syntax. Client renders with MathJax/KaTeX.

### 32 — Embed
```
32|type*(youtube|codepen|codesandbox|twitter)|url*|title
```

---

## 7. Field Types

| Type       | Description                              |
|------------|------------------------------------------|
| `string`   | Plain text, returned as-is               |
| `number`   | Numeric value with optional format       |
| `list`     | Comma-separated → string array           |
| `enum`     | One of allowed values                    |
| `richtext` | Inline markup (see §8)                   |
| `component`| Nested component via `#` prefix          |

**Number formats:**

| Format     | Input    | Output (ru-RU)  |
|------------|----------|-----------------|
| `currency` | `69990`  | `69 990 ₽`      |
| `date`     | `2025-01-15` | `15.01.2025` |
| `percent`  | `12.5`   | `12.5%`         |

---

## 8. Richtext Inline Syntax

Fields marked `[richtext]` support inline markup only.  
Block elements (headings, horizontal rules, blockquotes) must use dedicated components.

| Syntax           | Output          |
|------------------|-----------------|
| `**text**`       | `<strong>`      |
| `_text_`         | `<em>`          |
| `` `code` ``     | `<code>`        |
| `[text](url)`    | `<a href="url">` |
| `\n`             | `<br>`          |

---

## 9. Stream Examples

### Single component
```
1|Смартфон X1|AMOLED 120Hz, 256GB|69990|Купить
```

### Versioned stream
```
v:1
1|Смартфон X1|AMOLED 120Hz|69990|Купить
```

### Multiple components
```
1|Смартфон X1|AMOLED 120Hz|69990|Купить
2|warn|Последний в наличии
3|Характеристики|AMOLED,256GB,5000mAh
```

### Nested component
```
1|Смартфон X1|#2|warn|Последний|69990|Купить
```

### PASH+ID mode (dictionary)
```
1|102|45|69990|12
```
Where: `102 → "Смартфон X1"`, `45 → "AMOLED 120Hz"`, `12 → "Купить"`

### PASH-Doc article
```
v:1
20|1|История интернета
21|Всё началось в **1969** году.
20|2|ARPANET
22|python|import socket\ns = socket.socket()
23|Пол Баран|Сеть должна выдержать **ядерный удар**
24|arpanet.jpg|Карта ARPANET 1969|Рис. 1
25
26|Год,Узлы,Страна|1969,4,США;1970,9,США;1971,14,США
29|info|ARPANET предшествовал современному интернету
30|Подробнее|История в книге **Where Wizards Stay Up Late**
```

---

## 10. Token Efficiency

Reference measurements (GPT-4 BPE via tiktoken), one ProductCard:

| Format    | Tokens | vs HTML  |
|-----------|--------|----------|
| XML       | ~58    | +12%     |
| HTML      | ~52    | baseline |
| JSON      | ~34    | −35%     |
| YAML      | ~28    | −46%     |
| Markdown  | ~26    | −50%     |
| PASH      | ~11    | −79%     |
| PASH+ID   | ~7     | −87%     |

---

## 11. Event Stream Format

Ultra-low latency mode. Client starts rendering before component is complete.

```
COMP_START(1)
TEXT(Смартфон X1)
TEXT(AMOLED 120Hz)
PRICE(69990)
TEXT(Купить)
COMP_END(1)
```

Event types:

| Type        | Field type          |
|-------------|---------------------|
| `TEXT`      | string              |
| `TEXT_ID`   | string via dict     |
| `PRICE`     | number/currency     |
| `DATE`      | number/date         |
| `LIST`      | list (comma values) |
| `ENUM`      | enum                |
| `RICHTEXT`  | richtext            |
| `COMP_START`| —                   |
| `COMP_END`  | —                   |

---

## 12. Versioning

Backward compatibility policy:
- **PATCH** (1.0.x) — bug fixes, no schema changes
- **MINOR** (1.x.0) — new components, new field types, additive
- **MAJOR** (x.0.0) — breaking grammar or field changes

New components use IDs from 40+ (user-defined) or 33–39 (community).  
Core IDs 1–32 are frozen after v1.0.0.
