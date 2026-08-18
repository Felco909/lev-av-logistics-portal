import type { Language } from '../context/LanguageContext';

export interface LocalizedText {
  ru: string;
  en: string;
  hy: string;
}

/** Reads the string for the active language out of a `{ru, en, hy}` record. */
export function pickLang(field: LocalizedText, lang: Language): string {
  return field[lang];
}
