import { COUNTED_WEEKDAYS, START_DATE, TARGET_DATE } from './config'
import { EXCLUDED_DAYS } from './excludedDays'

/** Parses 'YYYY-MM-DD' as a local date at midnight. */
export function parseDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function toKey(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
}

export function startOfToday(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

const excluded = new Set<string>()
for (const entry of EXCLUDED_DAYS) {
  if ('date' in entry) {
    excluded.add(entry.date)
  } else {
    for (let d = parseDate(entry.from); d <= parseDate(entry.to); d = addDays(d, 1)) {
      excluded.add(toKey(d))
    }
  }
}

/** Counts workdays after `from` (exclusive) up to and including `to`. */
function countWorkdays(from: Date, to: Date): number {
  let count = 0
  for (let d = addDays(from, 1); d <= to; d = addDays(d, 1)) {
    if (COUNTED_WEEKDAYS.includes(d.getDay()) && !excluded.has(toKey(d))) count++
  }
  return count
}

export interface Status {
  remaining: number
  /** 0 at the start date, 1 when no workdays remain. */
  progress: number
  /** True from the target day onward. */
  finished: boolean
}

/** Reads the optional `?left=X` URL parameter (a non-negative integer) used for testing. */
export function remainingOverride(): number | undefined {
  const left = new URLSearchParams(window.location.search).get('left')
  return left !== null && /^\d+$/.test(left) ? Number(left) : undefined
}

/** `override` replaces the computed number of remaining workdays; 0 counts as finished. */
export function getStatus(today: Date, override?: number): Status {
  const target = parseDate(TARGET_DATE)
  const remaining = override ?? countWorkdays(today, target)
  const total = countWorkdays(parseDate(START_DATE), target)
  const progress = total > 0 ? Math.min(1, Math.max(0, 1 - remaining / total)) : 1
  const finished = override === undefined ? today >= target : override === 0
  return { remaining, progress, finished }
}
