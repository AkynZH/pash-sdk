'use strict';

/**
 * PASH SDK — Protocol for Agentic Semantic Hypermedia
 * Public API
 *
 * NOTE: generateSystemPrompt is NOT part of pash-sdk.
 * Use @pash/prompt package for LLM prompt generation.
 */

// Schemas
const { SCHEMAS, SCHEMAS_UI, SCHEMAS_DOC } = require('./src/schema');

// Core
const { tokenize }                          = require('./src/tokenizer');
const { formatField }                       = require('./src/formatter');
const { parseLine, decodeStream }           = require('./src/parser');
const { encode, encodeStream }              = require('./src/encoder');

// Render
const { renderComponent, renderStream, RENDERERS } = require('./src/renderer');
const { renderRichtext, renderRichtextWrapped,
        setRichtextRenderer, resetRichtextRenderer } = require('./src/richtext');

// Streaming
const { StreamingDecoder }                  = require('./src/streaming');
const { EventStreamDecoder, pashToEvents, parseEvent } = require('./src/events');

// Content Layer
const { Dictionary, defaultDictionary }     = require('./src/dictionary');

// i18n
const { setLocale, getLocale, addLocale,
        formatCurrency, formatDate, formatPercent } = require('./src/locale');

// Validation
const { validateComponent, validateStream } = require('./src/validator');

// Extension
const { registerComponent, isRegistered, listComponents } = require('./src/extend');

// Version
const { VERSION }                           = require('./src/version');

module.exports = {
  // ─── Schemas ────────────────────────────────────────────────────────────────
  SCHEMAS,
  SCHEMAS_UI,
  SCHEMAS_DOC,

  // ─── Parsing ────────────────────────────────────────────────────────────────
  tokenize,
  formatField,
  parseLine,
  decodeStream,

  // ─── Encoding ───────────────────────────────────────────────────────────────
  encode,
  encodeStream,

  // ─── Rendering ──────────────────────────────────────────────────────────────
  renderComponent,
  renderStream,
  RENDERERS,

  // ─── Richtext ───────────────────────────────────────────────────────────────
  renderRichtext,
  renderRichtextWrapped,
  setRichtextRenderer,
  resetRichtextRenderer,

  // ─── Streaming ──────────────────────────────────────────────────────────────
  StreamingDecoder,
  EventStreamDecoder,
  pashToEvents,
  parseEvent,

  // ─── Content Layer (PASH+ID) ─────────────────────────────────────────────────
  Dictionary,
  defaultDictionary,

  // ─── i18n ───────────────────────────────────────────────────────────────────
  setLocale,
  getLocale,
  addLocale,
  formatCurrency,
  formatDate,
  formatPercent,

  // ─── Validation ─────────────────────────────────────────────────────────────
  validateComponent,
  validateStream,

  // ─── Extension ──────────────────────────────────────────────────────────────
  registerComponent,
  isRegistered,
  listComponents,

  // ─── Meta ───────────────────────────────────────────────────────────────────
  VERSION,
};
