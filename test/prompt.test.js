'use strict';

const { generateSystemPrompt } = require('../src/prompt');
const { SCHEMAS }              = require('../src/schema');

describe('generateSystemPrompt', () => {
  test('строка, не пустая', () => {
    const p = generateSystemPrompt();
    expect(typeof p).toBe('string');
    expect(p.length).toBeGreaterThan(500);
  });

  test('содержит все компоненты из SCHEMAS', () => {
    const p = generateSystemPrompt({ lang: 'ru', mode: 'pash' });
    for (const [id, schema] of Object.entries(SCHEMAS)) {
      expect(p).toContain(String(id));
      expect(p).toContain(schema.name);
    }
  });

  test('ru/pash — русские ключевые фразы', () => {
    const p = generateSystemPrompt({ lang: 'ru', mode: 'pash' });
    expect(p).toContain('НЕ пишешь HTML');
    expect(p).toContain('Строгие запреты');
    expect(p).toContain('richtext');
  });

  test('en/pash — английские ключевые фразы', () => {
    const p = generateSystemPrompt({ lang: 'en', mode: 'pash' });
    expect(p).toContain('You are a data and intent provider');
    expect(p).toContain('Strict prohibitions');
  });

  test('mode pash+id — DICT_ID', () => {
    const p = generateSystemPrompt({ lang: 'ru', mode: 'pash+id' });
    expect(p).toContain('DICT_ID');
  });

  test('mode events — COMP_START/COMP_END', () => {
    const p = generateSystemPrompt({ lang: 'ru', mode: 'events' });
    expect(p).toContain('COMP_START');
    expect(p).toContain('COMP_END');
  });

  test('неизвестный lang → fallback на ru', () => {
    const p = generateSystemPrompt({ lang: 'zz' });
    expect(p).toContain('НЕ пишешь HTML');
  });

  test('содержит richtext-блок', () => {
    const p = generateSystemPrompt({ lang: 'ru' });
    expect(p).toContain('**жирный**');
    expect(p).toContain('_курсив_');
  });
});
