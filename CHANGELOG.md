# Changelog

All notable changes to pash-sdk are documented here.  
Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
Versioning: [SemVer](https://semver.org/)

---

## [1.0.0] — 2025

### Added

**Protocol**
- PASH grammar: `COMP_ID|field1|field2|...`
- Pipe `|` separator — 1 token in BPE tokenizers
- Escape `\|` for pipe inside field values
- Nested component via `#` prefix with schema-aware field consumption
- Version header `v:N` (optional first line)
- `\n` as component separator

**UI Components (ID 1–6)**
- `1` ProductCard — title, desc, price[currency], cta
- `2` Notification — level(info|warn|error), message
- `3` List — title, items[list]
- `4` Hero — headline, sub, cta
- `5` Article — title, author, date[date], summary[richtext]
- `6` RichBlock — content[richtext]

**PASH-Doc Blocks (ID 20–32)**
- `20` Heading, `21` Paragraph, `22` Code, `23` Blockquote
- `24` Image, `25` Divider, `26` Table
- `27` OrderedList, `28` BulletList
- `29` Note, `30` Spoiler, `31` Math, `32` Embed

**Richtext**
- Field type `richtext` — inline markup in values
- Built-in renderer: bold, italic, code, links, br
- `setRichtextRenderer()` — plug in marked/remark
- XSS protection (unsafe URLs replaced with `#`)

**SDK Modules**
- `tokenizer` — `\|` escape handling
- `formatter` — all types: string, number, list, enum, richtext
- `parser` — `parseLine`, `decodeStream`, schema-aware nested components
- `encoder` — `encode`, `encodeStream`, PASH+ID mode
- `renderer` — all UI + Doc components, XSS escaping, fallback
- `streaming` — `StreamingDecoder` byte-by-byte SSE decoder
- `events` — `EventStreamDecoder`, `pashToEvents`, Event Stream format
- `dictionary` — `Dictionary` class, `reverseResolve`, `defaultDictionary`
- `locale` — ru-RU, en-US, de-DE; `addLocale` for custom locales
- `validator` — `validateComponent`, `validateStream`
- `extend` — `registerComponent` (ID 40+), `isRegistered`, `listComponents`
- `prompt` — `generateSystemPrompt` auto-synced with schemas

**Infrastructure**
- TypeScript definitions (`types/index.d.ts`) — full coverage
- ESM / CJS / Browser IIFE bundles via esbuild
- CLI (`pash decode|validate|render|events|prompt|version`)
- GitHub Actions CI — Node 18/20/22
- GitHub Pages deployment for playground
- `SYSTEM_PROMPT.md` — 6 ready-to-use prompt variants
- Token benchmark (`benchmarks/token-count.js`)

---

## [Unreleased]

### Planned
- Python SDK (`packages/python/`)
- React bindings — `usePASH()` hook, `<PASHRenderer>` component
- VSCode extension — syntax highlighting for PASH streams
- Community component registry (ID 33–39)
- PASH-Inline v1 — token-optimized inline markup research
- PASH-Doc v2 — cross-block `ref` types
- WASM parser for browser
