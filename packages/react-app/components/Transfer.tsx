
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
    return <p  className='m-1 italic'>Awaiting User Confirmation</p>
  }

  if (isSuccess) {
    return <p className='m-1 py-2 semi-bold'> {blockchain.isSuccess? "Confirmed": "Pending" } <a className='m-1 underline underline-offset-8 text-forest' target={"_blank"} rel="noreferrer" href={`https://explorer.celo.org/alfajores/tx/${data?.hash}`}>Transfer of {formatEther(amount)}</a> to {recipientAddress}</p>
  }

  return <button className='m-1 py-1 px-4 b-1 bg-prosperity border border-sand rounded-3xl hover:bg-transparent' disabled={!write} onClick={() => write?.()}>Send {formatEther(amount)} CELO</button>
}