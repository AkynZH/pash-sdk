'use strict';

const { parseLine, decodeStream } = require('../src/parser');
const { renderComponent, renderStream } = require('../src/renderer');

const DOC_STREAM = [
  '20|1|История интернета',
  '21|Всё началось в **1969** году.',
  '20|2|ARPANET',
  '22|python|import socket',
  '23|Пол Баран|Сеть должна выдержать **ядерный удар**',
  '24|arpanet.jpg|Карта ARPANET|Рис. 1',
  '25',
  '26|Год,Узлы|1969,4;1970,9',
  '27|Шаги|Установить,Настроить,Запустить',
  '28||TCP/IP,DNS,HTTP',
  '29|info|ARPANET предшествовал интернету',
  '30|Подробнее|История в **Where Wizards Stay Up Late**',
  '31|block|E = mc^2',
  '32|youtube|https://youtu.be/dQw4w9WgXcQ|Видео',
].join('\n');

describe('PASH-Doc — парсинг', () => {
  test('20 Heading', () => {
    const n = parseLine('20|2|Подзаголовок');
    expect(n.type).toBe('Heading');
    expect(n.fields.level).toBe('2');
    expect(n.fields.text).toBe('Подзаголовок');
  });

  test('21 Paragraph richtext', () => {
    const n = parseLine('21|Текст с **жирным**');
    expect(n.type).toBe('Paragraph');
    expect(n.fields.text).toBe('Текст с **жирным**');
  });

  test('22 Code', () => {
    const n = parseLine('22|js|const x = 1;');
    expect(n.fields.lang).toBe('js');
    expect(n.fields.body).toBe('const x = 1;');
  });

  test('23 Blockquote с автором', () => {
    const n = parseLine('23|Автор|Текст цитаты');
    expect(n.fields.author).toBe('Автор');
    expect(n.fields.text).toBe('Текст цитаты');
  });

  test('23 Blockquote без автора', () => {
    const n = parseLine('23||Просто цитата');
    expect(n.fields.author).toBe('');
  });

  test('24 Image', () => {
    const n = parseLine('24|img.jpg|Alt текст|Подпись');
    expect(n.fields.url).toBe('img.jpg');
    expect(n.fields.alt).toBe('Alt текст');
    expect(n.fields.caption).toBe('Подпись');
  });

  test('25 Divider — нет полей', () => {
    const n = parseLine('25');
    expect(n.type).toBe('Divider');
    expect(Object.keys(n.fields)).toHaveLength(0);
  });

  test('26 Table — headers массив', () => {
    const n = parseLine('26|Год,Узлы,Страна|1969,4,США;1970,9,США');
    expect(n.fields.headers).toEqual(['Год', 'Узлы', 'Страна']);
  });

  test('27 OrderedList', () => {
    const n = parseLine('27|Шаги|Шаг 1,Шаг 2,Шаг 3');
    expect(n.fields.items).toEqual(['Шаг 1', 'Шаг 2', 'Шаг 3']);
  });

  test('28 BulletList', () => {
    const n = parseLine('28||A,B,C');
    expect(n.fields.items).toHaveLength(3);
  });

  test('29 Note все уровни', () => {
    ['info','tip','warn','danger'].forEach(lvl => {
      expect(parseLine(`29|${lvl}|Текст`).fields.level).toBe(lvl);
    });
  });

  test('30 Spoiler', () => {
    const n = parseLine('30|Заголовок|Тело спойлера');
    expect(n.type).toBe('Spoiler');
  });

  test('31 Math block', () => {
    const n = parseLine('31|block|E = mc^2');
    expect(n.fields.display).toBe('block');
    expect(n.fields.formula).toBe('E = mc^2');
  });

  test('32 Embed', () => {
    const n = parseLine('32|youtube|https://youtu.be/abc|Видео');
    expect(n.fields.type).toBe('youtube');
    expect(n.fields.title).toBe('Видео');
  });
});

describe('PASH-Doc — рендер', () => {
  test('Heading уровень в теге', () => {
    expect(renderComponent(parseLine('20|1|Заголовок'))).toMatch(/^<h1/);
    expect(renderComponent(parseLine('20|4|Заголовок'))).toMatch(/^<h4/);
  });

  test('Paragraph рендерит richtext', () => {
    const html = renderComponent(parseLine('21|Текст с **акцентом**'));
    expect(html).toContain('<strong>акцентом</strong>');
  });

  test('Code — lang в data-атрибуте', () => {
    const html = renderComponent(parseLine('22|python|print()'));
    expect(html).toContain('data-lang="python"');
  });

  test('Divider → <hr>', () => {
    expect(renderComponent(parseLine('25'))).toContain('<hr');
  });

  test('Table → thead и tbody', () => {
    const html = renderComponent(parseLine('26|A,B|1,2;3,4'));
    expect(html).toContain('<th>A</th>');
    expect(html).toContain('<td>1</td>');
  });

  test('Note уровень в классе', () => {
    expect(renderComponent(parseLine('29|danger|Опасность'))).toContain('pash-doc-note--danger');
  });

  test('Spoiler → <details>', () => {
    expect(renderComponent(parseLine('30|Спойлер|Тело'))).toMatch(/^<details/);
  });

  test('Math → data-formula', () => {
    const html = renderComponent(parseLine('31|inline|x^2'));
    expect(html).toContain('pash-doc-math--inline');
    expect(html).toContain('data-formula');
  });
});

describe('PASH-Doc — полный документный поток', () => {
  test(`декодируется в ${DOC_STREAM.split('\n').length} компонентов`, () => {
    const { components } = decodeStream(DOC_STREAM);
    expect(components).toHaveLength(14);
    expect(components.every(c => c.type !== 'unknown')).toBe(true);
  });

  test('рендерится без краша', () => {
    expect(() => renderStream(decodeStream(DOC_STREAM))).not.toThrow();
  });

  test('финальный HTML содержит ключевые элементы', () => {
    const html = renderStream(decodeStream(DOC_STREAM));
    expect(html).toContain('<h1');
    expect(html).toContain('<strong>1969</strong>');
    expect(html).toContain('<pre');
    expect(html).toContain('<blockquote');
    expect(html).toContain('<hr');
    expect(html).toContain('<table');
    expect(html).toContain('<details');
  });
});
