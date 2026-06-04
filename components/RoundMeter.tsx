import { Gauge } from 'lucide-react'
import { DrawStatusChip } from '@/components/DrawStatusChip'
import type { DrawStatus } from '@/hooks/useNumberDrawVault'

export function RoundMeter({ drawCount, status }: { drawCount?: bigint; status: DrawStatus }) {
  return (
    <div className="round-meter" aria-label="Current round">
      <Gauge size={18} />
      <span>Draws</span>
      <strong>{drawCount?.toString() ?? '-'}</strong>
      <DrawStatusChip status={status} />
    </div>
  )
}
