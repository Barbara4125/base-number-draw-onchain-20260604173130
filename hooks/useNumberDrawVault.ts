'use client'

import { useEffect, useState } from 'react'
import { useAccount, useReadContract, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { base } from 'wagmi/chains'
import { BUILDER_CODE_SUFFIX } from '@/lib/wagmi'
import { NUMBER_DRAW_VAULT_CONTRACT_ADDRESS, numberDrawVaultAbi } from '@/lib/contracts'

export type DrawStatus = 'ready' | 'pending' | 'submitted' | 'confirmed'

export function useNumberDrawVault() {
  const { address, chainId, isConnected } = useAccount()
  const { switchChainAsync } = useSwitchChain()
  const { writeContractAsync } = useWriteContract()
  const [status, setStatus] = useState<DrawStatus>('ready')
  const [lastTxHash, setLastTxHash] = useState<`0x${string}` | null>(null)
  const [lastError, setLastError] = useState<string | null>(null)

  const contract = {
    address: NUMBER_DRAW_VAULT_CONTRACT_ADDRESS,
    abi: numberDrawVaultAbi,
    chainId: base.id
  } as const

  const { data: drawCount, refetch: refetchDrawCount } = useReadContract({
    ...contract,
    functionName: 'drawCount'
  })

  const { data: poolStart } = useReadContract({
    ...contract,
    functionName: 'POOL_START'
  })

  const { data: poolSize } = useReadContract({
    ...contract,
    functionName: 'POOL_SIZE'
  })

  const { data: hasDrawn, refetch: refetchHasDrawn } = useReadContract({
    ...contract,
    functionName: 'hasDrawn',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address)
    }
  })

  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({
    chainId: base.id,
    hash: lastTxHash ?? undefined,
    query: {
      enabled: Boolean(lastTxHash)
    }
  })

  useEffect(() => {
    if (!receipt) return

    setStatus('confirmed')
    void refetchDrawCount()
    void refetchHasDrawn()
  }, [receipt, refetchDrawCount, refetchHasDrawn])

  async function runDraw() {
    setLastError(null)

    if (!isConnected) {
      window.dispatchEvent(new Event('number-draw-open-wallet-menu'))
      setLastError('Choose a wallet, then run the live draw transaction.')
      return
    }

    if (chainId !== base.id) {
      await switchChainAsync({ chainId: base.id })
    }

    setStatus('pending')

    try {
      const txHash = await writeContractAsync({
        ...contract,
        functionName: 'runDraw',
        dataSuffix: BUILDER_CODE_SUFFIX
      })

      setLastTxHash(txHash)
      setStatus('submitted')
      void refetchDrawCount()
      void refetchHasDrawn()
    } catch (error) {
      setStatus('ready')
      setLastError(error instanceof Error ? error.message : 'The draw transaction could not be submitted.')
    }
  }

  return {
    address,
    chainId,
    isConnected,
    status: isConfirming ? 'submitted' : status,
    lastError,
    lastTxHash,
    contractAddress: NUMBER_DRAW_VAULT_CONTRACT_ADDRESS,
    drawCount,
    poolStart,
    poolSize,
    hasDrawn: Boolean(hasDrawn),
    runDraw
  }
}
