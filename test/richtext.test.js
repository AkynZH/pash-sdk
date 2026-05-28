'use strict';

const {
  renderRichtext,
  renderRichtextWrapped,
  setRichtextRenderer,
  resetRichtextRenderer,
} = require('../src/richtext');

afterEach(() => resetRichtextRenderer());

describe('renderRichtext — встроенный рендерер', () => {
  test('plain text экранируется', () => {
    expect(renderRichtext('<b>test</b>')).toBe('&lt;b&gt;test&lt;/b&gt;');
  });

  test('**bold** → <strong>', () => {
    expect(renderRichtext('Текст **жирный** конец'))
      .toContain('<strong>жирный</strong>');
  });

  test('_italic_ → <em>', () => {
    expect(renderRichtext('Текст _курсив_ конец'))
      .toContain('<em>курсив</em>');
  });

  test('`code` → <code>', () => {
    expect(renderRichtext('Функция `decode()` делает'))
      .toContain('<code>decode()</code>');
  });

  test('[text](url) → <a>', () => {
    const r = renderRichtext('[GitHub](https://github.com)');
    expect(r).toContain('href="https://github.com"');
    expect(r).toContain('rel="noopener"');
    expect(r).toContain('GitHub');
  });

  test('\\n → <br>', () => {
    expect(renderRichtext('строка1\nстрока2')).toContain('<br>');
  });

  test('пустая строка → пустая строка', () => {
    expect(renderRichtext('')).toBe('');
    expect(renderRichtext(null)).toBe('');
  });

  test('XSS в URL заменяется на #', () => {
    const r = renderRichtext('[click](javascript:alert(1))');
    expect(r).not.toContain('javascript:');
    expect(r).toContain('href="#"');
  });

  test('XSS в тексте экранируется', () => {
    const r = renderRichtext('<script>alert(1)</script>');
    expect(r).not.toContain('<script>');
    expect(r).toContain('&lt;script&gt;');
  });
});

describe('renderRichtextWrapped', () => {
  test('оборачивает в тег с классом', () => {
    const r = renderRichtextWrapped('текст', 'p', 'myclass');
    expect(r).toMatch(/^<p class="myclass">/);
    expect(r).toMatch(/<\/p>$/);
  });

  test('без класса — нет атрибута class', () => {
    const r = renderRichtextWrapped('текст', 'div');
    expect(r).toMatch(/^<div>/);
  });

  test('tag по умолчанию — p', () => {
    const r = renderRichtextWrapped('текст');
    expect(r).toMatch(/^<p>/);
  });
});

describe('setRichtextRenderer', () => {
  test('кастомный рендерер используется', () => {
    setRichtextRenderer(t => `<CUSTOM>${t}</CUSTOM>`);
    expect(renderRichtext('hello')).toBe('<CUSTOM>hello</CUSTOM>');
  });

  test('resetRichtextRenderer возвращает встроенный', () => {
    setRichtextRenderer(() => 'custom');
    resetRichtextRenderer();
    expect(renderRichtext('**bold**')).toContain('<strong>');
  });

  test('передача не-функции бросает ошибку', () => {
    expect(() => setRichtextRenderer('not-a-function')).toThrow(TypeError);
  });
});
