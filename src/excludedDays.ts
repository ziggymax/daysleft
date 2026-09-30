// Dage der ikke tælles med (helligdage, ferie osv.).
// Datoer angives som 'ÅÅÅÅ-MM-DD'. Brug enten en enkelt dato eller et interval
// (fra og med 'from' til og med 'to').
//
// Eksempler:
//   { date: '2026-12-24', note: 'Juleaften' },
//   { from: '2026-10-13', to: '2026-10-15', note: 'Efterårsferie' },

export type ExcludedDay =
  | { date: string; note?: string }
  | { from: string; to: string; note?: string }

export const EXCLUDED_DAYS: ExcludedDay[] = [
]
