# @pash/prompt

> Prompt Engine для PASH — генерирует системные промпты для LLM из схем компонентов.

Это единственный пакет в экосистеме PASH, который знает про LLM.
`pash-sdk` — чистый протокол и не зависит от этого пакета.

## Архитектура

```
pash-sdk    → чистый протокол (не знает про LLM)
@pash/prompt → Prompt Engine (мост между протоколом и любым LLM)
LLM         → внешний плагин (GPT-4 / Claude / Llama — любой)
```

## Установка

```bash
npm install @pash/prompt pash-sdk
```

## Использование

```js
const { PromptEngine } = require('@pash/prompt');
const { SCHEMAS }      = require('pash-sdk');

const engine = new PromptEngine({ schemas: SCHEMAS });

// Системный промпт для OpenAI / Anthropic / любой модели
const systemPrompt = engine.generate({ lang: 'ru', mode: 'pash' });

// Передать в LLM:
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user',   content: 'Покажи карточку товара' },
  ],
});
```

## Режимы

| mode     | Описание                          | Токены |
|----------|-----------------------------------|--------|
| `pash`   | Стандартный (по умолчанию)        | ~11    |
| `pash+id`| Максимальное сжатие (со словарём) | ~7     |
| `events` | Event Stream (ultra-low latency)  | ~same  |

## Языки промпта

- `ru` — русский (по умолчанию)
- `en` — английский

## Со своими компонентами

```js
const { PromptEngine } = require('@pash/prompt');
const { SCHEMAS } = require('pash-sdk');
const { registerComponent } = require('pash-sdk');

// Регистрируем свой компонент
registerComponent(40, {
  name: 'UserCard',
  fields: [
    { id: 0, type: 'string', label: 'name',  required: true },
    { id: 1, type: 'string', label: 'email' },
  ],
  render: (f) => `<div>${f.name}</div>`,
});

// Промпт автоматически включит UserCard
const engine = new PromptEngine({ schemas: SCHEMAS });
const prompt = engine.generate({ lang: 'ru' });
// → промпт содержит: "40 = UserCard: name* | email"
```

## License

MIT — Copyright (c) 2025 Sergei
