import { REGISTRY_ABI } from "@/abi/Registry"
import { useContractEvent, useContractRead } from "wagmi"


type CeloContract =
  | 'Accounts'
  | 'Attestations'
  | 'BlockchainParameters'
  | 'DoubleSigningSlasher'
  | 'DowntimeSlasher'
  | 'Election'
  | 'EpochRewards'
  | 'Escrow'
  | 'Exchange'
  | 'ExchangeEUR'
  | 'ExchangeBRL'
  | 'FederatedAttestations'
  | 'FeeCurrencyWhitelist'
  | 'Freezer'
  | 'GasPriceMinimum'
  | 'GoldToken'
  | 'Governance'
  | 'GrandaMento'
  | 'LockedGold'
  | 'MetaTransactionWallet'
  | 'MetaTransactionWalletDeployer'
  | 'MultiSig'
  | 'OdisPayments'
  | 'Random'
  | 'Registry'
  | 'Reserve'
  | 'SortedOracles'
  | 'StableToken'
  | 'StableTokenEUR'
  | 'StableTokenBRL'
  | 'TransferWhitelist'
  | 'Validators'



const REGISTRY_PROXY_ADDRESS = "0x000000000000000000000000000000000000ce10"


export default function useCeloRegistry(contractName: CeloContract) {

  const data = useContractRead<typeof REGISTRY_ABI, "getAddressForString",`0x${string}`>({
    address: REGISTRY_PROXY_ADDRESS,
    abi: REGISTRY_ABI,
    functionName: 'getAddressForString',
    args: [contractName],
    scopeKey: `registry-getAddressForString-${contractName}`,
    // Registry rarely is changed so just cache for the entire session
    cacheTime: Infinity,
    staleTime: Infinity,
  })

  // break cache if the registry is updated
  useContractEvent({
    eventName: 'RegistryUpdated',
    address: REGISTRY_PROXY_ADDRESS,
    abi: REGISTRY_ABI,
    listener: (node, label, owner) => {
      console.log("node", node, "label", label, "owner", owner)
      data.refetch()
    }
  })

  return data
}