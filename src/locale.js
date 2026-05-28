'use strict';

/**
 * PASH Locale
 *
 * Локализация числовых значений на стороне клиента.
 * ИИ передаёт чистые числа (69990), клиент добавляет символ валюты и форматирование.
 * Это ключевой принцип PASH: Late Binding — ИИ не знает про ₽, $, форматы дат.
 */
const LOCALES = {
  'ru-RU': {
    currency:     '₽',
    currencyPos:  'after',    // 'before' | 'after'
    thousandsSep: '\u00A0',   // неразрывный пробел
    decimalSep:   ',',
    dateFormat:   'DD.MM.YYYY',
    percentSym:   '%',
  },
  'en-US': {
    currency:     '$',
    currencyPos:  'before',
    thousandsSep: ',',
    decimalSep:   '.',
    dateFormat:   'MM/DD/YYYY',
    percentSym:   '%',
  },
  'de-DE': {
    currency:     '€',
    currencyPos:  'after',
    thousandsSep: '.',
    decimalSep:   ',',
    dateFormat:   'DD.MM.YYYY',
    percentSym:   '%',
  },
};

let _active = 'ru-RU';

function setLocale(code) {
  if (!LOCALES[code]) throw new Error(`Неизвестная локаль: ${code}. Доступны: ${Object.keys(LOCALES).join(', ')}`);
  _active = code;
}

function getLocale() {
  return { ...LOCALES[_active], code: _active };
}

function addLocale(code, config) {
  if (!config.currency || !config.currencyPos) throw new Error('addLocale: необходимы currency и currencyPos');
  LOCALES[code] = config;
}

function formatCurrency(value) {
  const raw = String(value ?? '').replace(/[\s\u00A0]/g, '');
  const n   = parseFloat(raw);
  if (isNaN(n)) return String(value ?? '');

  const loc  = LOCALES[_active];
  const abs  = Math.abs(n);
  const sign = n < 0 ? '-' : '';

  const parts = abs.toFixed(0).split('');
  const int   = [];
  parts.reverse().forEach((d, i) => {
    if (i && i % 3 === 0) int.unshift(loc.thousandsSep);
    int.unshift(d);
  });
  const formatted = sign + int.join('');

  return loc.currencyPos === 'before'
    ? `${loc.currency}${formatted}`
    : `${formatted} ${loc.currency}`;
}

function formatDate(value) {
  let d;
  if (value instanceof Date)        d = value;
  else if (typeof value === 'number') d = new Date(value);
  else d = new Date(String(value));

  if (isNaN(d.getTime())) return String(value ?? '');

  const loc  = LOCALES[_active];
  const dd   = String(d.getDate()).padStart(2, '0');
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = String(d.getFullYear());

  return loc.dateFormat
    .replace('DD', dd)
    .replace('MM', mm)
    .replace('YYYY', yyyy);
}

function formatPercent(value) {
  const n = parseFloat(String(value ?? ''));
  if (isNaN(n)) return String(value ?? '');
  return `${n}${LOCALES[_active].percentSym}`;
}

module.exports = { setLocale, getLocale, addLocale, formatCurrency, formatDate, formatPercent };
