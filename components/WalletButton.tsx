'use client'

import { Check, ChevronDown, PlugZap, Unplug, Wallet } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { base } from 'wagmi/chains'

function getConnectorLabel(connectorName: string, connectorId: string) {
  const name = connectorName.toLowerCase()
  const id = connectorId.toLowerCase()

  if (id.includes('okx') || id.includes('okex') || name.includes('okx') || name.includes('okex')) return 'OKX Wallet'
  if (id.includes('metamask') || name.includes('metamask')) return 'MetaMask'
  if (id.includes('coinbase') || name.includes('coinbase')) return 'Coinbase Wallet'
  return connectorName
}

function getWalletRank(label: string) {
  if (label === 'OKX Wallet') return 1
  if (label === 'MetaMask') return 2
  if (label === 'Coinbase Wallet') return 3
  return 4
}

export function WalletButton() {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { address, connector: activeConnector, isConnected } = useAccount()
  const { connectors, connectAsync, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  const walletOptions = connectors
    .map((connector) => ({
      connector,
      label: getConnectorLabel(connector.name, connector.id)
    }))
    .filter((option, index, options) => {
      return options.findIndex((item) => item.label === option.label) === index
    })
    .sort((a, b) => getWalletRank(a.label) - getWalletRank(b.label) || a.label.localeCompare(b.label))

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  useEffect(() => {
    function handleOpenWalletMenu() {
      setOpen(true)
    }

    window.addEventListener('number-draw-open-wallet-menu', handleOpenWalletMenu)
    return () => window.removeEventListener('number-draw-open-wallet-menu', handleOpenWalletMenu)
  }, [])

  async function handleConnect(option: (typeof walletOptions)[number]) {
    setError(null)

    try {
      await connectAsync({ connector: option.connector, chainId: base.id })
      setOpen(false)
    } catch (connectError) {
      const message = connectError instanceof Error ? connectError.message : 'Wallet connection failed.'
      setError(message)
    }
  }

  function handleDisconnect() {
    window.localStorage.setItem('number-draw-disable-base-auto-connect', 'true')
    disconnect()
    setOpen(false)
  }

  return (
    <div className="wallet-menu" ref={menuRef}>
      <button
        className={isConnected ? 'secondary-button wallet-button' : 'primary-button wallet-button'}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {isConnected ? <Wallet size={17} /> : <PlugZap size={17} />}
        <span>{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}</span>
        <ChevronDown size={15} />
      </button>

      {open ? (
        <div aria-label="Wallet options" className="wallet-popover" role="menu">
          {walletOptions.map((option) => {
            const active = activeConnector?.uid === option.connector.uid

            return (
              <button
                className="wallet-option"
                disabled={isPending}
                key={option.connector.uid}
                onClick={() => handleConnect(option)}
                role="menuitem"
                type="button"
              >
                <span>
                  <strong>{option.label}</strong>
                  <small>Open this wallet connection flow</small>
                </span>
                {active ? <Check size={17} /> : null}
              </button>
            )
          })}

          {error ? <p className="wallet-error">{error}</p> : null}

          {isConnected ? (
            <button className="wallet-option wallet-disconnect" onClick={handleDisconnect} role="menuitem" type="button">
              <span>
                <strong>Disconnect</strong>
                <small>Stop this wallet session</small>
              </span>
              <Unplug size={17} />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
