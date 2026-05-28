'use strict';

/**
 * PASH Dictionary — Content Layer (второй слой архитектуры)
 *
 * Реализует PASH+ID тир: вместо текста ИИ передаёт числовые ID,
 * клиент резолвит их в строки через словарь.
 *
 * Обычный PASH:   1|Смартфон X1|AMOLED 120Hz|69990|Купить  (~11 токенов)
 * PASH+ID:        1|102|45|69990|12                          (~7 токенов)
 *
 * Словарь хранится на клиенте, загружается один раз (или через RAG).
 * ИИ видит только список ID в системном промпте.
 */
class Dictionary {
  /**
   * @param {Record<string|number, string>} entries — начальные записи { id: text }
   */
  constructor(entries = {}) {
    this._entries = Object.create(null);
    this.load(entries);
  }

  /**
   * Резолвить ID → текст.
   * Если ID не найден — возвращает "[id]" (fallback без краша).
   */
  resolve(id) {
    const key = String(id);
    return Object.prototype.hasOwnProperty.call(this._entries, key)
      ? this._entries[key]
      : `[${id}]`;
  }

  /**
   * Обратный резолв: текст → ID.
   * Возвращает null если не найдено.
   */
  reverseResolve(text) {
    for (const [id, val] of Object.entries(this._entries)) {
      if (val === text) return id;
    }
    return null;
  }

  /**
   * Добавить или обновить одну запись.
   */
  set(id, value) {
    if (id === undefined || id === null) throw new Error('Dictionary.set: id обязателен');
    this._entries[String(id)] = String(value);
  }

  /**
   * Загрузить пакет записей (например, ответ RAG).
   */
  load(batch) {
    for (const [id, value] of Object.entries(batch ?? {})) {
      this._entries[String(id)] = String(value);
    }
  }

  /**
   * Удалить запись.
   */
  delete(id) {
    delete this._entries[String(id)];
  }

  /**
   * Количество записей.
   */
  get size() {
    return Object.keys(this._entries).length;
  }

  /**
   * Проверить, является ли значение числовым ID (а не текстом).
   * ИИ в PASH+ID тире генерирует только числа.
   */
  static isId(value) {
    return /^\d+$/.test(String(value ?? '').trim());
  }
}

const defaultDictionary = new Dictionary();

module.exports = { Dictionary, defaultDictionary };
