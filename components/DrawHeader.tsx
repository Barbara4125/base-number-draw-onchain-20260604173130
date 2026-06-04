import { ShieldCheck } from 'lucide-react'
import { WalletButton } from '@/components/WalletButton'

export function DrawHeader() {
  return (
    <header className="draw-header">
      <div className="draw-header-inner">
        <div className="brand-mark">
          <ShieldCheck size={21} />
          <div>
            <strong>base-split-vault-number-draw</strong>
            <span>Public draw terminal</span>
          </div>
        </div>
        <WalletButton />
      </div>
    </header>
  )
}
