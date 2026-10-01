import { useEffect, useRef, useState } from 'react'
import Smiley from './Smiley'
import { getStatus, remainingOverride, startOfToday } from './workdays'

const START_COLOR = [255, 255, 0] // gul
const END_COLOR = [0, 225, 0] // grøn

function barColor(progress: number): string {
  const [r, g, b] = START_COLOR.map((c, i) => Math.round(c + (END_COLOR[i] - c) * progress))
  return `rgb(${r}, ${g}, ${b})`
}

/** Returns today's date and re-renders when the date changes at midnight. */
function useToday(): Date {
  const [today, setToday] = useState(startOfToday)

  useEffect(() => {
    const now = new Date()
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const timer = setTimeout(() => setToday(startOfToday()), nextMidnight.getTime() - now.getTime() + 1000)
    return () => clearTimeout(timer)
  }, [today])

  return today
}

/** Tracks the rendered width (px) of an element; 0 until it has been measured. */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(() => setWidth(el.offsetWidth))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, width] as const
}

export default function App() {
  const [textRef, textWidth] = useWidth<HTMLElement>()
  const { remaining, progress, finished } = getStatus(useToday(), remainingOverride())
  const fill = 50 + 50 * progress // bar starts half filled

  return (
    <main className="app">
      <section className="text" ref={textRef}>
        {finished ? (
          <>
            <div className="big">Sidste dag!</div>
            <div className="label">Du klarede det!</div>
          </>
        ) : (
          <>
            <div className="intro">Der er</div>
            <div className="big">{remaining}</div>
            <div className="label">{remaining === 1 ? 'arbejdsdag' : 'arbejdsdage'} tilbage</div>
          </>
        )}
      </section>

      <div
        className="bar"
        style={textWidth ? { width: `min(${textWidth * 0.8}px, 95vw)` } : undefined}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="bar-fill" style={{ width: `${fill}%`, backgroundColor: barColor(progress) }} />
      </div>

      <div className="smiley-wrap">
        <Smiley happiness={progress} />
      </div>
    </main>
  )
}
