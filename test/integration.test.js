'use strict';

const { generateSystemPrompt } = require('../src/prompt');
const { decodeStream }         = require('../src/parser');
const { validateStream }       = require('../src/validator');
const { renderStream }         = require('../src/renderer');
const { encodeStream }         = require('../src/encoder');
const { StreamingDecoder }     = require('../src/streaming');
const { setLocale }            = require('../src/locale');
const { registerComponent, isRegistered } = require('../src/extend');
const { SCHEMAS }              = require('../src/schema');

afterEach(() => setLocale('ru-RU'));

describe('Full pipeline', () => {
  test('промпт содержит все компоненты', () => {
    const p = generateSystemPrompt({ lang: 'ru', mode: 'pash' });
    expect(p).toContain('ProductCard');
    expect(p).toContain('Notification');
    expect(p).toContain('Paragraph');
    expect(p).toContain('Heading');
  });

  test('типичный AI-ответ декодируется корректно', () => {
    const ai = 'v:1\n1|Смартфон X1|AMOLED 120Hz|69990|Заказать\n2|warn|Последний в наличии';
    const r  = decodeStream(ai);
    expect(r.version).toBe('1');
    expect(r.components[0].type).toBe('ProductCard');
    expect(r.components[0].fields.price).toContain('₽');
    expect(r.components[1].fields.level).toBe('warn');
  });

  test('валидация проходит без ошибок', () => {
    const r = validateStream(decodeStream('1|X1|AMOLED|69990|Купить\n2|info|OK'));
    expect(r.every(x => x.valid)).toBe(true);
  });

  test('рендер возвращает валидный HTML', () => {
    const html = renderStream(decodeStream('1|Смартфон X1|AMOLED|69990|Купить'));
    expect(html).toContain('Смартфон X1');
    expect(html).toContain('₽');
    expect(html).not.toContain('<script>');
  });

  test('encode → decode round-trip', () => {
    const comps = [
      { type: 'ProductCard',  fields: { title: 'X1', desc: 'Y', price: '100', cta: 'Z' } },
      { type: 'Notification', fields: { level: 'warn', message: 'Мало' } },
    ];
    const decoded = decodeStream(encodeStream(comps));
    expect(decoded.components[0].fields.title).toBe('X1');
    expect(decoded.components[1].fields.message).toBe('Мало');
  });

  test('en-US локаль: $ в цене', () => {
    setLocale('en-US');
    const r = decodeStream('1|Phone|OLED|1299|Buy');
    expect(r.components[0].fields.price).toContain('$');
  });

  test('стриминг: побайтовая доставка', () => {
    const received = [];
    const decoder  = new StreamingDecoder(c => received.push(c));
    const stream   = '1|X1|AMOLED|69990|Купить\n2|info|OK\n';
    for (const char of stream) decoder.push(char);
    decoder.flush();
    expect(received).toHaveLength(2);
    expect(received[0].type).toBe('ProductCard');
  });

  test('битый AI-ответ не крашит pipeline', () => {
    const bad = 'не PASH вообще\n99|unknown\n1|X1|Y|100|Z';
    expect(() => renderStream(decodeStream(bad))).not.toThrow();
  });

  test('XSS в AI-ответе нейтрализуется рендерером', () => {
    const html = renderStream(decodeStream('1|<img src=x onerror=alert(1)>|Y|100|Z'));
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;img');
  });

  test('документный поток + UI поток вместе', () => {
    const mixed = '4|Флагман|Лучший 2025|Смотреть\n20|1|Почему флагман\n21|Потому что **лучший**\n1|Смартфон X1|AMOLED|69990|Купить';
    const r = decodeStream(mixed);
    expect(r.components).toHaveLength(4);
    expect(r.components[0].type).toBe('Hero');
    expect(r.components[1].type).toBe('Heading');
    expect(r.components[2].type).toBe('Paragraph');
    expect(r.components[3].type).toBe('ProductCard');
  });
});

describe('registerComponent интеграция', () => {
  afterAll(() => {
    // Чистим тестовый компонент из SCHEMAS
    delete SCHEMAS[50];
    const { RENDERERS } = require('../src/renderer');
    delete RENDERERS['TestWidget'];
  });

  test('зарегистрированный компонент парсится и рендерится', () => {
    registerComponent(50, {
      name: 'TestWidget',
      fields: [{ id: 0, type: 'string', label: 'text', required: true }],
      render: (f) => `<div class="test-widget">${f.text}</div>`,
    });

    expect(isRegistered(50)).toBe(true);

    const decoded = decodeStream('50|Привет мир');
    expect(decoded.components[0].type).toBe('TestWidget');

    const html = renderStream(decoded);
    expect(html).toContain('Привет мир');
    expect(html).toContain('test-widget');
  });

  test('повторная регистрация того же ID бросает ошибку', () => {
    expect(() => registerComponent(50, {
      name: 'AnotherWidget',
      fields: [],
      render: () => '',
    })).toThrow();
  });

  test('ID в диапазоне 20-39 бросает ошибку', () => {
    expect(() => registerComponent(25, {
      name: 'Reserved', fields: [], render: () => '',
    })).toThrow(/зарезервирован/);
  });

  test('промпт включает новый компонент', () => {
    const p = generateSystemPrompt({ lang: 'ru' });
    expect(p).toContain('TestWidget');
    expect(p).toContain('50');
  });
});
