interface Props {
  /** 0 = flat, neutral mouth; 1 = big, happy smile. */
  happiness: number
}

/** A circular arc from (left, cornerY) to (right, cornerY) dipping down to bottomY; a straight line when flat. */
function mouthPath(left: number, right: number, cornerY: number, bottomY: number): string {
  const halfChord = (right - left) / 2
  const sag = bottomY - cornerY
  if (sag < 0.01) return `M ${left} ${cornerY} L ${right} ${cornerY}`
  const radius = (halfChord * halfChord + sag * sag) / (2 * sag)
  const largeArc = sag > halfChord ? 1 : 0
  return `M ${left} ${cornerY} A ${radius} ${radius} 0 ${largeArc} 0 ${right} ${cornerY}`
}

export default function Smiley({ happiness }: Props) {
  const halfWidth = 18 + 14 * happiness
  // The mouth corners rise to just below the eyes as happiness nears 1 (squared, so the rise comes late).
  const cornerY = 65 - 17 * happiness * happiness
  const bottomY = 65 + 17 * happiness
  const mouth = mouthPath(50 - halfWidth, 50 + halfWidth, cornerY, bottomY)

  return (
    <svg className="smiley" viewBox="0 0 100 100" role="img" aria-label="Smiley">
      <circle cx="50" cy="50" r="46" fill="rgb(255, 222, 76)" stroke="#222" strokeWidth="3" />
      <ellipse cx="35" cy="38" rx="4.5" ry="6.5" fill="#222" />
      <ellipse cx="65" cy="38" rx="4.5" ry="6.5" fill="#222" />
      <path d={mouth} fill="none" stroke="#222" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
