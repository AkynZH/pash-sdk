'use strict';

/**
 * PromptEngine — генерирует системный промпт для LLM из схем PASH-компонентов.
 *
 * Это единственный модуль в экосистеме PASH, который знает про LLM.
 * pash-sdk НЕ зависит от этого пакета.
 *
 * Архитектура:
 *   pash-sdk  → чистый протокол (не знает про LLM)
 *   @pash/prompt → Prompt Engine (мост между протоколом и LLM)
 *   LLM        → внешний плагин (GPT-4, Claude, Llama — любой)
 */

const {
  buildRules,
  buildRegistry,
  buildExamples,
  buildRichtextNote,
} = require('./builders');

class PromptEngine {
  /**
   * @param {object} options
   * @param {object} options.schemas — реестр схем (из pash-sdk: SCHEMAS)
   */
  constructor(options) {
    options = options || {};
    if (!options.schemas || typeof options.schemas !== 'object') {
      throw new Error('PromptEngine: options.schemas обязателен (передай SCHEMAS из pash-sdk)');
    }
    this._schemas = options.schemas;
  }

  /**
   * Генерирует системный промпт для LLM.
   *
   * @param {object} options
   * @param {'ru'|'en'} options.lang  — язык промпта (по умолч. 'ru')
   * @param {'pash'|'pash+id'|'events'} options.mode — режим (по умолч. 'pash')
   * @returns {string}
   */
  generate(options) {
    options = options || {};
    const lang = options.lang || 'ru';
    const mode = options.mode || 'pash';

    const ctx = { schemas: this._schemas, mode };
    return lang === 'en' ? this._buildEn(ctx) : this._buildRu(ctx);
  }

  _buildRu(ctx) {
    return [
      '# Системный промпт: PASH v1 (Protocol for Agentic Semantic Hypermedia)',
      '',
      '## Твоя роль',
      'Ты — поставщик данных и намерений, а не верстальщик.',
      'Ты НЕ пишешь HTML, Markdown, CSS или обычный текст в ответах с UI.',
      'Ты генерируешь структурированный поток в формате PASH.',
      '',
      '## Формат ответа',
      '',
      buildRules(ctx.mode, 'ru'),
      '',
      '## Реестр компонентов',
      '',
      buildRegistry(ctx.schemas, ctx.mode),
      '',
      buildRichtextNote('ru'),
      '',
      '## Примеры',
      '',
      buildExamples(ctx.schemas, ctx.mode),
      '',
      '## Строгие запреты',
      '',
      '- НЕ добавляй пояснения к PASH-ответу ("Вот карточка:", "Результат:")',
      '- НЕ используй Markdown-разметку вне richtext-полей',
      '- НЕ добавляй символ валюты — только чистое число (69990, не 69990₽)',
      '- НЕ изменяй порядок полей — только по схеме',
      '- НЕ используй несуществующие ID компонентов',
      '- Если данных для поля нет — оставь поле пустым, не пропускай разделитель |',
      '- Заголовки (#) внутри richtext-полей ЗАПРЕЩЕНЫ — используй компонент 20',
      '',
      '## Fallback',
      '',
      'Если запрос не требует UI — отвечай обычным текстом.',
      'Если нужного компонента нет — используй ближайший подходящий.',
    ].join('\n');
  }

  _buildEn(ctx) {
    return [
      '# System Prompt: PASH v1 (Protocol for Agentic Semantic Hypermedia)',
      '',
      '## Your role',
      'You are a data and intent provider, not a markup writer.',
      'You do NOT write HTML, Markdown, CSS, or plain prose for UI responses.',
      'You generate structured output in PASH format.',
      '',
      '## Response format',
      '',
      buildRules(ctx.mode, 'en'),
      '',
      '## Component registry',
      '',
      buildRegistry(ctx.schemas, ctx.mode),
      '',
      buildRichtextNote('en'),
      '',
      '## Examples',
      '',
      buildExamples(ctx.schemas, ctx.mode),
      '',
      '## Strict prohibitions',
      '',
      '- Do NOT add commentary ("Here is a card:", "Result:")',
      '- Do NOT use Markdown formatting outside richtext fields',
      '- Do NOT include currency symbols — raw numbers only (69990, not $69990)',
      '- Do NOT reorder fields — follow the schema strictly',
      '- Do NOT invent component IDs not in the registry',
      '- If a field has no data — leave it empty, do NOT skip the | separator',
      '- Headings (#) inside richtext fields are FORBIDDEN — use component 20',
      '',
      '## Fallback',
      '',
      'If the request does not need UI — respond in plain text.',
      'If no matching component exists — use the closest one.',
    ].join('\n');
  }
}

/**
 * Функция-обёртка для совместимости с pash-sdk API.
 * Позволяет использовать как: generateSystemPrompt({ schemas, lang, mode })
 */
function generateSystemPrompt(options) {
  options = options || {};
  const engine = new PromptEngine({ schemas: options.schemas });
  return engine.generate({ lang: options.lang, mode: options.mode });
}

module.exports = { PromptEngine, generateSystemPrompt };
