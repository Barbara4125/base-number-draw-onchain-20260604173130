'use client'

import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { coinbaseWallet } from '@wagmi/connectors'

// TODO: Replace this value after Base.dev verification.
export const BUILDER_CODE_SUFFIX = '0x' as `0x${string}`

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'base-split-vault-number-draw',
      preference: 'all',
      version: '4'
    })
  ],
  dataSuffix: BUILDER_CODE_SUFFIX,
  multiInjectedProviderDiscovery: true,
  transports: {
    [base.id]: http()
  }
})
