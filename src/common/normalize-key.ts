// Deterministic dedup key for products / price points: trim, lowercase, strip
// accents, collapse whitespace. Used by both the catalog upsert and price
// recording so the same product always maps to one key.
export function normalizeKey(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ');
}
