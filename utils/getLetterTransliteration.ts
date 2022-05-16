export function getLetterTransliteration<
  Map extends Record<string, string>,
  Letter extends keyof Map
>(map: Map, letter: Letter) {
  return map[letter];
}
