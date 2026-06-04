'use client'

import { LoaderCircle, Shuffle } from 'lucide-react'
import type { DrawStatus } from '@/hooks/useNumberDrawVault'

export function DrawButton({
  disabled,
  needsWallet,
  status,
  onRun
}: {
  disabled?: boolean
  needsWallet?: boolean
  status: DrawStatus
  onRun: () => void
}) {
  const pending = status === 'pending'

  return (
    <button className="run-draw-button" disabled={disabled || pending} onClick={onRun} type="button">
      {pending ? <LoaderCircle className="spin" size={22} /> : <Shuffle size={22} />}
      <span>{pending ? 'Submitting Draw' : needsWallet ? 'Connect Wallet First' : 'Run Onchain Draw'}</span>
    </button>
  )
}
