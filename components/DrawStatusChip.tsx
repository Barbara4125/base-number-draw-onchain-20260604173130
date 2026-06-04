import { CheckCircle2, CircleDot, LoaderCircle } from 'lucide-react'
import type { DrawStatus } from '@/hooks/useNumberDrawVault'

const iconMap = {
  ready: CircleDot,
  pending: LoaderCircle,
  submitted: LoaderCircle,
  confirmed: CheckCircle2
}

export function DrawStatusChip({ status }: { status: DrawStatus }) {
  const Icon = iconMap[status]

  return (
    <span className={`status-chip status-${status}`}>
      <Icon size={14} />
      {status}
    </span>
  )
}
