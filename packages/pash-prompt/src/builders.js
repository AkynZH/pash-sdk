'use strict';

/**
 * Builders — shared utilities для генерации блоков промпта.
 * Не знают ни о каких LLM — только о схемах компонентов.
 */

function buildRules(mode, lang) {
  if (mode === 'events') {
    return lang === 'ru'
      ? `Используй Event Stream формат:\nCOMP_START(ID)\nTEXT(значение) | PRICE(число) | LIST(a,b,c) | ENUM(val) | RICHTEXT(текст)\nCOMP_END(ID)\nКаждое событие — отдельная строка.`
      : `Use Event Stream format:\nCOMP_START(ID)\nTEXT(value) | PRICE(number) | LIST(a,b,c) | ENUM(val) | RICHTEXT(text)\nCOMP_END(ID)\nOne event per line.`;
  }

  if (mode === 'pash+id') {
    return lang === 'ru'
      ? `Используй PASH+ID формат (максимальное сжатие):\nCOMP_ID|DICT_ID|DICT_ID|число|DICT_ID\nВсе текстовые значения заменяй на числовые ID из словаря.\nЧисла (цены) передавай напрямую. Разделитель | . Один компонент — одна строка.`
      : `Use PASH+ID format (maximum compression):\nCOMP_ID|DICT_ID|DICT_ID|number|DICT_ID\nReplace all text values with numeric dictionary IDs.\nNumbers (prices) pass directly. Separator | . One component per line.`;
  }

  return lang === 'ru'
    ? `Используй PASH формат:\nCOMP_ID|поле1|поле2|поле3|...\nРазделитель — пайп |. Каждый компонент — отдельная строка.\nНесколько компонентов — каждый на новой строке.\nОпционально первая строка: v:1\nЕсли поле содержит | — экранируй: \\|`
    : `Use PASH format:\nCOMP_ID|field1|field2|field3|...\nSeparator is pipe |. One component per line.\nMultiple components — one per line.\nOptional first line: v:1\nIf a field value contains | — escape it: \\|`;
}

function buildRegistry(schemas, mode) {
  const lines = [];
  for (const [id, schema] of Object.entries(schemas)) {
    const fieldList = schema.fields
      .map(f => {
        let s = f.label;
        if (f.type === 'enum' && f.values) s += `(${f.values.join('|')})`;
        if (f.format)   s += `[${f.format}]`;
        if (f.required) s += '*';
        return s;
      })
      .join(' | ');

    const example = buildOneExample(id, schema, mode);
    lines.push(`${id} = ${schema.name}: ${fieldList || '—'}`);
    lines.push(`   → ${example}`);
    lines.push('');
  }

  lines.push('* = обязательное поле / required');
  lines.push('[currency] = передавай только число, клиент добавит валюту / pass raw number');
  return lines.join('\n');
}

function buildOneExample(id, schema, mode) {
  const samples = {
    title:    mode === 'pash+id' ? '102' : 'Смартфон X1',
    desc:     mode === 'pash+id' ? '45'  : 'AMOLED 120Hz',
    price:    '69990',
    cta:      mode === 'pash+id' ? '12'  : 'Купить',
    level:    'info',
    message:  mode === 'pash+id' ? '78'  : 'Доставка 1-2 дня',
    items:    'AMOLED,256GB,5000mAh',
    headline: mode === 'pash+id' ? '55'  : 'Флагман сезона',
    sub:      mode === 'pash+id' ? '56'  : 'Лучший смартфон 2025',
    text:     mode === 'pash+id' ? '60'  : 'Текст параграфа',
    body:     mode === 'pash+id' ? '61'  : 'Содержимое блока',
    author:   'Автор',
    caption:  'Подпись',
    url:      'https://example.com/image.jpg',
    alt:      'Описание',
    headers:  'Год,Узлы',
    rows:     '1969,4;1970,9',
    lang:     'python',
    display:  'block',
    formula:  'E = mc^2',
    type:     'youtube',
    summary:  'Краткое описание',
    content:  'Текст с **акцентом**',
    date:     '2025-01-01',
    name:     mode === 'pash+id' ? '70'  : 'Иван Петров',
    role:     mode === 'pash+id' ? '71'  : 'Разработчик',
    email:    mode === 'pash+id' ? '72'  : 'ivan@example.com',
    score:    '4.5',
    max:      '5',
    label:    mode === 'pash+id' ? '73'  : 'Отлично',
    original: '89990',
    badge:    '−22%',
    snippet:  mode === 'pash+id' ? '74'  : 'Краткое описание результата',
    color:    'blue',
    avatar:   '',
    headline2:'Флагман',
    format:   'block',
  };

  if (mode === 'events') {
    const events = [`COMP_START(${id})`];
    schema.fields.forEach(f => {
      const val    = samples[f.label] || 'value';
      const evType = f.format === 'currency' ? 'PRICE'
        : f.format === 'date'    ? 'DATE'
        : f.type   === 'list'    ? 'LIST'
        : f.type   === 'enum'    ? 'ENUM'
        : f.type   === 'richtext'? 'RICHTEXT'
        : 'TEXT';
      events.push(`${evType}(${val})`);
    });
    events.push(`COMP_END(${id})`);
    return '\n   ' + events.join('\n   ');
  }

  const values = schema.fields.map(f => samples[f.label] || '');
  return `${id}|${values.join('|')}`;
}

function buildExamples(schemas, mode) {
  const ids   = Object.keys(schemas);
  const lines = [];

  if (ids.length > 0) {
    lines.push('# Один компонент');
    lines.push(buildOneExample(ids[0], schemas[ids[0]], mode));
    lines.push('');
  }

  if (ids.length > 1 && mode !== 'events') {
    lines.push('# Несколько компонентов');
    lines.push(buildOneExample(ids[0], schemas[ids[0]], mode));
    lines.push(buildOneExample(ids[1], schemas[ids[1]], mode));
    lines.push('');
  }

  return lines.join('\n');
}

function buildRichtextNote(lang) {
  return lang === 'ru'
    ? [
        '## Синтаксис richtext-полей',
        '',
        'В полях с типом richtext поддерживается inline-разметка:',
        '  **жирный**      — bold',
        '  _курсив_        — italic',
        '  `код`           — inline code',
        '  [текст](url)    — ссылка',
        '  \\n              — перенос строки',
        '',
        'Только inline. Заголовки (#) — запрещены, используй компонент 20.',
      ].join('\n')
    : [
        '## Richtext field syntax',
        '',
        'Fields with type richtext support inline markup:',
        '  **bold**        — bold',
        '  _italic_        — italic',
        '  `code`          — inline code',
        '  [text](url)     — link',
        '  \\n              — line break',
        '',
        'Inline only. Headings (#) are forbidden — use component 20.',
      ].join('\n');
}

module.exports = {
  buildRules,
  buildRegistry,
  buildOneExample,
  buildExamples,
  buildRichtextNote,
};
