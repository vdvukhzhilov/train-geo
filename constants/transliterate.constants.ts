import { TransliterateSettings } from '../types/transliterate.types';

export const DEFAULT_SETTINGS: TransliterateSettings = {
  minLetters: 1,
  maxLetters: 1,
  allowDoubles: true,
  divider: '_',
};

export const MAX_LETTERS = 20;
