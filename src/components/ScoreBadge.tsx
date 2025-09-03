export default function ScoreBadge({ score }: { score?: number | null }) {
  const s = score ?? 0
  const hue = 120 * (s / 100) // green at 100
  const bg = `hsl(${hue} 60% 20%)`
  return (
    <span className="px-2 py-1 rounded-lg text-xs" style={{ background: bg }}>
      Score {s}
    </span>
  )
}
