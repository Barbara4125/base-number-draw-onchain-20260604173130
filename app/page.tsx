'use client'

import { AlertCircle, BadgeCheck, ExternalLink, Hash, ShieldCheck } from 'lucide-react'
import { DrawButton } from '@/components/DrawButton'
import { DrawStatusChip } from '@/components/DrawStatusChip'
import { NumberPoolPanel } from '@/components/NumberPoolPanel'
import { RoundMeter } from '@/components/RoundMeter'
import { useNumberDrawVault } from '@/hooks/useNumberDrawVault'

function formatAddress(value: string) {
  return `${value.slice(0, 6)}...${value.slice(-4)}`
}

export default function HomePage() {
  const vault = useNumberDrawVault()
  const poolStart = vault.poolStart === undefined ? undefined : Number(vault.poolStart)
  const poolSize = vault.poolSize === undefined ? undefined : Number(vault.poolSize)
  const explorerHref = `https://basescan.org/address/${vault.contractAddress}`
  const txHref = vault.lastTxHash ? `https://basescan.org/tx/${vault.lastTxHash}` : null
  const needsBase = vault.isConnected && vault.chainId !== 8453

  return (
    <main className="page-frame">
      <section className="draw-console panel terminal-lines">
        <div className="draw-console-head">
          <div>
            <p className="section-label">Base Contract Console</p>
            <h1 className="terminal-title">Number Draw Vault</h1>
          </div>
          <RoundMeter drawCount={vault.drawCount} status={vault.status} />
        </div>

        <div className="contract-grid">
          <div className="contract-card">
            <Hash size={18} />
            <span>Contract</span>
            <a className="hash" href={explorerHref} rel="noreferrer" target="_blank">
              {formatAddress(vault.contractAddress)}
              <ExternalLink size={14} />
            </a>
          </div>
          <div className="contract-card">
            <BadgeCheck size={18} />
            <span>Wallet Draw State</span>
            <strong>
              {!vault.isConnected
                ? 'Wallet Required'
                : needsBase
                  ? 'Switching To Base'
                  : vault.hasDrawn
                    ? 'Drawn Before'
                    : 'Open'}
            </strong>
          </div>
        </div>

        <NumberPoolPanel poolStart={poolStart} poolSize={poolSize} />

        <div className="draw-action-slab">
          <div className="draw-rule">
            <ShieldCheck size={22} />
            <div>
              <strong>One Wallet, One Contract Draw</strong>
              <span>The button submits a live runDraw transaction on Base.</span>
            </div>
          </div>
          <DrawButton
            disabled={false}
            needsWallet={!vault.isConnected}
            status={vault.status}
            onRun={vault.runDraw}
          />
        </div>

        <div className="draw-feedback">
          <AlertCircle size={18} />
          <span>
            {vault.lastError ??
              (txHref ? (
                <a className="inline-link" href={txHref} rel="noreferrer" target="_blank">
                  View submitted transaction
                  <ExternalLink size={14} />
                </a>
              ) : (
                'Connect a wallet, then run the live Base contract transaction.'
              ))}
          </span>
          <DrawStatusChip status={vault.status} />
        </div>
      </section>
    </main>
  )
}
