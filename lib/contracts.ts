export const NUMBER_DRAW_VAULT_CONTRACT_ADDRESS = '0x987c6539816518C6A8596D8736446617bF7ECBb1'

export const numberDrawVaultAbi = [
  {
    type: 'function',
    name: 'POOL_START',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint16' }]
  },
  {
    type: 'function',
    name: 'POOL_SIZE',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint16' }]
  },
  {
    type: 'function',
    name: 'runDraw',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [
      { name: 'id', type: 'uint256' },
      { name: 'number', type: 'uint16' },
      { name: 'proofHash', type: 'bytes32' }
    ]
  },
  {
    type: 'function',
    name: 'drawCount',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    type: 'function',
    name: 'hasDrawn',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    type: 'event',
    name: 'DrawExecuted',
    inputs: [
      { name: 'participant', type: 'address', indexed: true },
      { name: 'id', type: 'uint256', indexed: true },
      { name: 'number', type: 'uint16', indexed: false },
      { name: 'proofHash', type: 'bytes32', indexed: false }
    ],
    anonymous: false
  }
] as const
