// PASH SDK — TypeScript Definitions
// Protocol for Agentic Semantic Hypermedia

// ─── Field Definition ─────────────────────────────────────────────────────────

export type FieldType   = 'string' | 'number' | 'list' | 'enum' | 'richtext' | 'component';
export type FieldFormat = 'currency' | 'date' | 'percent';

export interface FieldDef {
  id:       number;
  type:     FieldType;
  label:    string;
  required?: boolean;
  format?:  FieldFormat;
  values?:  string[];
  ref?:     number;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

export interface ComponentSchema {
  v:       number;
  name:    string;
  fields:  FieldDef[];
}

export type SchemaRegistry = Record<number, ComponentSchema>;

// ─── Parsed Component ─────────────────────────────────────────────────────────

export type FieldValue = string | number | string[] | PASHComponent | UnknownComponent;

export interface PASHComponent {
  type:   string;
  id:     number;
  fields: Record<string, FieldValue>;
}

export interface UnknownComponent {
  type: 'unknown';
  id:   number;
  raw:  string;
}

export type AnyComponent = PASHComponent | UnknownComponent;

// ─── Decode ───────────────────────────────────────────────────────────────────

export interface DecodeResult {
  version:    string | null;
  components: AnyComponent[];
}

export function parseLine(line: string, schemas?: SchemaRegistry): AnyComponent;
export function decodeStream(stream: string, schemas?: SchemaRegistry): DecodeResult;

// ─── Encode ───────────────────────────────────────────────────────────────────

export interface EncodeOptions {
  useIds?:  boolean;
  dict?:    Dictionary;
}

export interface EncodeStreamOptions extends EncodeOptions {
  version?: string;
}

export function encode(component: PASHComponent, options?: EncodeOptions): string;
export function encodeStream(components: PASHComponent[], options?: EncodeStreamOptions): string;

// ─── Tokenizer / Formatter ────────────────────────────────────────────────────

export function tokenize(line: string): string[];
export function formatField(value: string, fieldDef: FieldDef): FieldValue;

// ─── Render ───────────────────────────────────────────────────────────────────

export type RendererFn  = (fields: Record<string, FieldValue>) => string;
export type RendererMap = Record<string, RendererFn>;

export function renderComponent(node: AnyComponent): string;
export function renderStream(decoded: DecodeResult): string;
export const RENDERERS: RendererMap;

// ─── Richtext ─────────────────────────────────────────────────────────────────

export function renderRichtext(text: string): string;
export function renderRichtextWrapped(text: string, tag?: string, cls?: string): string;
export function setRichtextRenderer(fn: (text: string) => string): void;
export function resetRichtextRenderer(): void;

// ─── Streaming ────────────────────────────────────────────────────────────────

export type ComponentCallback = (component: AnyComponent, version?: string | null) => void;
export type FieldCallback     = (field: { label: string; value: FieldValue }) => void;

export interface StreamingDecoderOptions {
  registry?: SchemaRegistry;
}

export class StreamingDecoder {
  readonly version: string | null;
  constructor(onComponent: ComponentCallback, options?: StreamingDecoderOptions);
  push(chunk: string): void;
  flush(): void;
}

export interface EventStreamDecoderOptions {
  onComponent?: ComponentCallback;
  onField?:     FieldCallback;
  registry?:    SchemaRegistry;
  dictionary?:  Dictionary;
}

export class EventStreamDecoder {
  version: string | null;
  constructor(options?: EventStreamDecoderOptions);
  push(chunk: string): void;
  flush(): void;
}

export interface PASHEvent {
  type:  string;
  value: string;
}

export function parseEvent(line: string): PASHEvent;
export function pashToEvents(stream: string): string;

// ─── Dictionary ───────────────────────────────────────────────────────────────

export class Dictionary {
  constructor(entries?: Record<string | number, string>);
  resolve(id: string | number): string;
  reverseResolve(text: string): string | null;
  set(id: string | number, value: string): void;
  load(batch: Record<string | number, string>): void;
  delete(id: string | number): void;
  readonly size: number;
  static isId(value: unknown): boolean;
}

export const defaultDictionary: Dictionary;

// ─── Locale ───────────────────────────────────────────────────────────────────

export type LocaleCode = 'ru-RU' | 'en-US' | 'de-DE' | (string & {});

export interface LocaleConfig {
  currency:     string;
  currencyPos:  'before' | 'after';
  thousandsSep: string;
  decimalSep:   string;
  dateFormat:   string;
  percentSym:   string;
  code:         string;
}

export function setLocale(code: LocaleCode): void;
export function getLocale(): LocaleConfig;
export function addLocale(code: string, config: Omit<LocaleConfig, 'code'>): void;
export function formatCurrency(value: string | number): string;
export function formatDate(value: string | number | Date): string;
export function formatPercent(value: string | number): string;

// ─── Validation ───────────────────────────────────────────────────────────────

export interface ValidationResult {
  valid:  boolean;
  errors: string[];
}

export interface StreamValidationResult extends ValidationResult {
  index: number;
  type:  string;
}

export function validateComponent(
  node: AnyComponent,
  schemas?: SchemaRegistry
): ValidationResult;

export function validateStream(
  decoded: DecodeResult,
  schemas?: SchemaRegistry
): StreamValidationResult[];

// ─── Extension ────────────────────────────────────────────────────────────────

export interface ComponentDefinition {
  name:   string;
  fields: FieldDef[];
  render: RendererFn;
}

export interface ComponentListItem {
  id:          number;
  name:        string;
  fieldsCount: number;
}

export function registerComponent(id: number, definition: ComponentDefinition): void;
export function isRegistered(id: number): boolean;
export function listComponents(): ComponentListItem[];

// ─── Schemas ─────────────────────────────────────────────────────────────────

export const SCHEMAS:     SchemaRegistry;
export const SCHEMAS_UI:  SchemaRegistry;
export const SCHEMAS_DOC: SchemaRegistry;

// ─── Meta ────────────────────────────────────────────────────────────────────

export const VERSION: string;
