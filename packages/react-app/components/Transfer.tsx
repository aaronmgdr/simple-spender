
import { ABI } from '@/abi/ERC20Plus'
import useCeloRegistry from '@/hooks/use-celo-registry'
import { formatEther, parseUnits } from 'ethers/lib/utils.js'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'


export default function Transfer() {
  const celoContractAddress = useCeloRegistry('GoldToken')

  const recipientAddress = "0x22579CA45eE22E2E16dDF72D955D6cf4c767B0eF" // Faucet Address

  const amount = parseUnits("0.1")

  const { config } = usePrepareContractWrite({
    address: celoContractAddress.data,
    abi: ABI,
    functionName: 'transfer',
    enabled: celoContractAddress.isSuccess,
    args: [recipientAddress, amount]
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const blockchain = useWaitForTransaction({
    hash: data?.hash,
  })


  if (isLoading) {
    return <p>Awaiting User Confirmation</p>
  }

  if (isSuccess) {
    return <p> {blockchain.isSuccess? "Confirmed": "Pending" } Transfer of {formatEther(amount)} to {recipientAddress} <a target={"_blank"} rel="noreferrer" href={`https://explorer.celo.org/alfajores/tx/${data?.hash}`}>View</a></p>
  }

  return <button disabled={!write} onClick={() => write?.()}>Send {formatEther(amount)} CELO</button>
}