# Contributing to PASH

Thank you for your interest. PASH is an open protocol and grows with the community.

---

## Quick start

```bash
git clone https://github.com/YOUR/pash
cd pash
npm install
npm test          # all 218 tests must pass
```

---

## Finding a task

Issues are labelled by complexity:

| Label | Description |
|-------|-------------|
| `good first issue` | Docs, new components, small fixes |
| `sdk` | Port to Python, Go, Rust, PHP |
| `integration` | React/Vue bindings, LangChain plugin |
| `core` | Parser, schema, protocol changes |
| `tooling` | CLI improvements, VSCode extension |

Comment "Taking this" on an issue before starting.

---

## Project structure

```
src/            — SDK core (parser, encoder, renderer, ...)
types/          — TypeScript definitions
test/           — Jest tests (one file per module)
benchmarks/     — Token count measurements
bin/            — CLI
scripts/        — Dev scripts
spec/           — Protocol specification
playground/     — Browser playground
```

---

## PR rules

1. One task — one PR.
2. All tests pass: `npm test` (218 green).
3. New functionality → new tests.
4. `types/index.d.ts` updated if new public API.
5. `spec/pash-v1.md` updated if protocol changes.
6. `npm run prompt` run and `SYSTEM_PROMPT.md` committed if schemas changed.
7. Commit format: `feat: add X` / `fix: Y` / `docs: update Z` / `test: add X tests`.

---

## Adding a new component

The most common contribution. Steps:

1. Add schema to `src/schema-ui.js` (UI) or propose community standard (ID 33–39)
2. Add renderer function to `src/renderer.js` + add to `RENDERERS` map
3. Write tests in `test/renderer.test.js` and `test/pash-doc.test.js`
4. Run `npm run prompt` → commit updated `SYSTEM_PROMPT.md`
5. Add example to `spec/pash-v1.md`
6. Update `CHANGELOG.md`

Use IDs 40+ for custom components, 33–39 for community standard proposals.

---

## Porting to another language

Create `packages/LANGUAGE/` directory.

Minimum implementation:
- `decode_stream(str) → components[]`
- `encode(component) → str`
- `generate_system_prompt(options) → str`

Use `test/` fixtures as reference — identical input must produce identical output across all ports.

---

## Code style

- JavaScript ES2018+, CommonJS (`require`)
- No semicolons required (match existing style)
- Functions < 40 lines, files < 200 lines
- Comments in Russian or English — both welcome
- No external runtime dependencies in `src/`

---

## Questions

Open a [Discussion](../../discussions) — not an Issue.  
Issues are for concrete bugs and tasks only.
