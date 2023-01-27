export const REGISTRY_ABI = [
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'bool', name: '' }],
    name: 'initialized',
    inputs: [],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'bool', name: '' }],
    name: 'isOneOf',
    inputs: [
      { type: 'bytes32[]', name: 'identifierHashes' },
      { type: 'address', name: 'sender' },
    ],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'renounceOwnership',
    inputs: [],
    constant: false,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '' }],
    name: 'registry',
    inputs: [{ type: 'bytes32', name: '' }],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'initialize',
    inputs: [],
    constant: false,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '' }],
    name: 'getAddressForString',
    inputs: [{ type: 'string', name: 'identifier' }],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '' }],
    name: 'getAddressForStringOrDie',
    inputs: [{ type: 'string', name: 'identifier' }],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '' }],
    name: 'owner',
    inputs: [],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'bool', name: '' }],
    name: 'isOwner',
    inputs: [],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'setAddressFor',
    inputs: [
      { type: 'string', name: 'identifier' },
      { type: 'address', name: 'addr' },
    ],
    constant: false,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '' }],
    name: 'getAddressForOrDie',
    inputs: [{ type: 'bytes32', name: 'identifierHash' }],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '' }],
    name: 'getAddressFor',
    inputs: [{ type: 'bytes32', name: 'identifierHash' }],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'transferOwnership',
    inputs: [{ type: 'address', name: 'newOwner' }],
    constant: false,
  },
  {
    type: 'event',
    name: 'RegistryUpdated',
    inputs: [
      { type: 'string', name: 'identifier', indexed: false },
      { type: 'bytes32', name: 'identifierHash', indexed: true },
      { type: 'address', name: 'addr', indexed: true },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      { type: 'address', name: 'previousOwner', indexed: true },
      { type: 'address', name: 'newOwner', indexed: true },
    ],
    anonymous: false,
  },
]