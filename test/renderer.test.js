'use strict';

const { renderComponent, renderStream } = require('../src/renderer');
const { parseLine, decodeStream }       = require('../src/parser');

describe('renderComponent — UI', () => {
  test('ProductCard содержит title и price', () => {
    const html = renderComponent(parseLine('1|Смартфон X1|AMOLED|69990|Купить'));
    expect(html).toContain('Смартфон X1');
    expect(html).toContain('₽');
    expect(html).toContain('Купить');
    expect(html).toContain('pash-product-card');
  });

  test('Notification info', () => {
    const html = renderComponent(parseLine('2|info|Доставка 1 день'));
    expect(html).toContain('pash-notification--info');
    expect(html).toContain('Доставка 1 день');
  });

  test('Notification warn', () => {
    const html = renderComponent(parseLine('2|warn|Мало'));
    expect(html).toContain('pash-notification--warn');
  });

  test('List → <ul>', () => {
    const html = renderComponent(parseLine('3|Хар-ки|AMOLED,256GB'));
    expect(html).toContain('<li>AMOLED</li>');
    expect(html).toContain('<li>256GB</li>');
  });

  test('Hero', () => {
    const html = renderComponent(parseLine('4|Заголовок|Подзаголовок|Кнопка'));
    expect(html).toContain('pash-hero');
    expect(html).toContain('Заголовок');
  });

  test('unknown → fallback без краша', () => {
    const html = renderComponent({ type: 'unknown', id: 99, raw: '99|данные' });
    expect(html).toContain('pash-unknown');
    expect(html).toContain('99');
  });
});

describe('renderComponent — Doc', () => {
  test('Heading h1', () => {
    const html = renderComponent(parseLine('20|1|Главный заголовок'));
    expect(html).toMatch(/^<h1/);
    expect(html).toContain('Главный заголовок');
  });

  test('Heading h3', () => {
    expect(renderComponent(parseLine('20|3|Заголовок'))).toMatch(/^<h3/);
  });

  test('Paragraph рендерит richtext', () => {
    const html = renderComponent(parseLine('21|Текст с **акцентом** и `кодом`'));
    expect(html).toContain('<strong>акцентом</strong>');
    expect(html).toContain('<code>кодом</code>');
    expect(html).toContain('pash-doc-paragraph');
  });

  test('Code с lang', () => {
    const html = renderComponent(parseLine('22|python|print("hello")'));
    expect(html).toContain('data-lang="python"');
    expect(html).toContain('print');
  });

  test('Code — XSS в lang экранируется', () => {
    const html = renderComponent(parseLine('22|<script>|code'));
    expect(html).not.toContain('<script>');
  });

  test('Blockquote с автором', () => {
    const html = renderComponent(parseLine('23|Пол Баран|Сеть устоит'));
    expect(html).toContain('pash-doc-blockquote');
    expect(html).toContain('Пол Баран');
  });

  test('Image → <figure>', () => {
    const html = renderComponent(parseLine('24|photo.jpg|Фото|Подпись'));
    expect(html).toContain('<figure');
    expect(html).toContain('photo.jpg');
    expect(html).toContain('Подпись');
  });

  test('Divider → <hr>', () => {
    const html = renderComponent(parseLine('25'));
    expect(html).toContain('<hr');
  });

  test('Table → <thead> и <tbody>', () => {
    const html = renderComponent(parseLine('26|A,B|1,2;3,4'));
    expect(html).toContain('<thead>');
    expect(html).toContain('<th>A</th>');
    expect(html).toContain('<td>1</td>');
  });

  test('OrderedList → <ol>', () => {
    const html = renderComponent(parseLine('27|Шаги|Шаг 1,Шаг 2,Шаг 3'));
    expect(html).toContain('<ol>');
    expect(html).toContain('Шаг 1');
  });

  test('BulletList → <ul>', () => {
    const html = renderComponent(parseLine('28||A,B,C'));
    expect(html).toContain('<ul>');
  });

  test('Note уровень в классе', () => {
    const html = renderComponent(parseLine('29|warn|Осторожно'));
    expect(html).toContain('pash-doc-note--warn');
  });

  test('Spoiler → <details>', () => {
    const html = renderComponent(parseLine('30|Спойлер|Содержимое'));
    expect(html).toMatch(/^<details/);
    expect(html).toContain('<summary');
  });

  test('Math → data-formula', () => {
    const html = renderComponent(parseLine('31|block|E = mc^2'));
    expect(html).toContain('data-formula');
    expect(html).toContain('pash-doc-math--block');
  });

  test('Embed youtube → iframe', () => {
    const html = renderComponent(parseLine('32|youtube|https://youtu.be/dQw4w9WgXcQ|'));
    expect(html).toContain('<iframe');
    expect(html).toContain('youtube.com/embed');
  });
});

describe('XSS защита', () => {
  test('XSS в title ProductCard', () => {
    const html = renderComponent(parseLine('1|<img onerror=alert(1)>|Y|100|Z'));
    expect(html).not.toContain('<img onerror');
    expect(html).toContain('&lt;img');
  });
});

describe('renderStream', () => {
  test('несколько компонентов', () => {
    const decoded = decodeStream('1|X|Y|100|Z\n2|warn|Мало');
    const html    = renderStream(decoded);
    expect(html).toContain('pash-product-card');
    expect(html).toContain('pash-notification--warn');
  });

  test('пустой поток → пустая строка', () => {
    expect(renderStream(decodeStream(''))).toBe('');
  });
});
