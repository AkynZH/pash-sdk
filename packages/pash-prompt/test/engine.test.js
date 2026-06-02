'use strict';

const { PromptEngine, generateSystemPrompt } = require('../index');
const { SCHEMAS } = require('pash-sdk');

describe('PromptEngine — constructor', () => {
  test('создаётся с корректными schemas', () => {
    expect(() => new PromptEngine({ schemas: SCHEMAS })).not.toThrow();
  });

  test('без schemas бросает ошибку', () => {
    expect(() => new PromptEngine({})).toThrow('schemas обязателен');
  });

  test('без options бросает ошибку', () => {
    expect(() => new PromptEngine()).toThrow();
  });
});

describe('PromptEngine — generate', () => {
  const engine = new PromptEngine({ schemas: SCHEMAS });

  test('возвращает строку', () => {
    const p = engine.generate();
    expect(typeof p).toBe('string');
    expect(p.length).toBeGreaterThan(500);
  });

  test('содержит все компоненты из SCHEMAS', () => {
    const p = engine.generate({ lang: 'ru', mode: 'pash' });
    for (const [id, schema] of Object.entries(SCHEMAS)) {
      expect(p).toContain(String(id));
      expect(p).toContain(schema.name);
    }
  });

  test('lang: ru — русские ключевые фразы', () => {
    const p = engine.generate({ lang: 'ru', mode: 'pash' });
    expect(p).toContain('НЕ пишешь HTML');
    expect(p).toContain('Строгие запреты');
    expect(p).toContain('richtext');
  });

  test('lang: en — английские фразы', () => {
    const p = engine.generate({ lang: 'en', mode: 'pash' });
    expect(p).toContain('You are a data and intent provider');
    expect(p).toContain('Strict prohibitions');
  });

  test('mode: pash+id — DICT_ID в примерах', () => {
    const p = engine.generate({ lang: 'ru', mode: 'pash+id' });
    expect(p).toContain('DICT_ID');
  });

  test('mode: events — COMP_START/COMP_END', () => {
    const p = engine.generate({ lang: 'ru', mode: 'events' });
    expect(p).toContain('COMP_START');
    expect(p).toContain('COMP_END');
  });

  test('неизвестный lang → fallback на ru', () => {
    const p = engine.generate({ lang: 'zz' });
    expect(p).toContain('НЕ пишешь HTML');
  });

  test('mode по умолчанию — pash', () => {
    const p = engine.generate({ lang: 'ru' });
    expect(p).toContain('COMP_ID|поле');
  });

  test('содержит richtext-блок', () => {
    const p = engine.generate({ lang: 'ru' });
    expect(p).toContain('**жирный**');
    expect(p).toContain('_курсив_');
  });
});

describe('generateSystemPrompt — функция-обёртка', () => {
  test('работает как PromptEngine.generate', () => {
    const p = generateSystemPrompt({ schemas: SCHEMAS, lang: 'ru', mode: 'pash' });
    expect(typeof p).toBe('string');
    expect(p).toContain('ProductCard');
  });

  test('совместима с вызовом без lang/mode', () => {
    const p = generateSystemPrompt({ schemas: SCHEMAS });
    expect(typeof p).toBe('string');
  });
});

describe('LLM-agnosticism', () => {
  test('@pash/prompt не требует импорта pash-sdk напрямую из engine.js', () => {
    const customSchemas = {
      99: {
        v: 1,
        name: 'CustomWidget',
        fields: [
          { id: 0, type: 'string', label: 'title', required: true },
        ],
      },
    };
    const engine = new PromptEngine({ schemas: customSchemas });
    const p = engine.generate({ lang: 'ru' });
    expect(p).toContain('CustomWidget');
    expect(p).toContain('99');
  });

  test('работает с любым набором schemas, не только PASH core', () => {
    const mySchemas = {
      1: { v: 1, name: 'Card', fields: [{ id: 0, type: 'string', label: 'text', required: true }] },
      2: { v: 1, name: 'Alert', fields: [{ id: 0, type: 'string', label: 'msg', required: true }] },
    };
    const engine = new PromptEngine({ schemas: mySchemas });
    const p = engine.generate();
    expect(p).toContain('Card');
    expect(p).toContain('Alert');
  });
});
