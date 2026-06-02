import type { SchemaRegistry } from 'pash-sdk';

export type PromptMode = 'pash' | 'pash+id' | 'events';
export type PromptLang = 'ru' | 'en';

export interface PromptEngineOptions {
  schemas: SchemaRegistry;
}

export interface GenerateOptions {
  lang?: PromptLang;
  mode?: PromptMode;
}

export class PromptEngine {
  constructor(options: PromptEngineOptions);
  generate(options?: GenerateOptions): string;
}

export function generateSystemPrompt(options: {
  schemas: SchemaRegistry;
  lang?:   PromptLang;
  mode?:   PromptMode;
}): string;
