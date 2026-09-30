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
  { from: '2026-10-19', to: '2026-11-01', note: 'Ferie' },
  { date: '2026-12-03', note: 'Fri' },
  { from: '2026-12-22', to: '2027-01-03', note: 'Jul og nytår' },
  { from: '2027-02-19', to: '2027-03-01', note: 'Ferie' },
  { from: '2027-03-23', to: '2027-03-25', note: 'Påskeferie' },
  { date: '2027-05-06', note: 'Kr.Himmelfartsdag' },
  { from: '2027-06-16', to: '2027-06-30', note: 'Ferie' }
]
