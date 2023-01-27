
import { ABI as ERC20ABI } from '@/abi/ERC20Plus'
import useCeloRegistry from '@/react-helpers/use-celo-registry'
import { formatEther, parseUnits } from 'ethers/lib/utils.js'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'


// In a real account the amount and recipient might be obtained with input fields.
const recipientAddress = "0x22579CA45eE22E2E16dDF72D955D6cf4c767B0eF" // Faucet Address

// parseUnits is a helper from ethers that converts the numbers we understand to the format the blockchain uses.
const amount = parseUnits("0.1")


export default function Transfer() {
  const {isDisconnected} = useAccount()

  const celoContractAddress = useCeloRegistry('GoldToken')

  // prepare the transaction to call the transfer function with recipientAddress and amount
  // on the Contract at the celoContractAddress using the ERC20ABI
  const { config } = usePrepareContractWrite({
    address: celoContractAddress.data, // data is the actual address string
    abi: ERC20ABI,
    functionName: 'transfer',
    enabled: celoContractAddress.isSuccess, // only runs once the address has been received
    args: [recipientAddress, amount]
  })

  // transfer method, once write is called on click this will be signed by the wallet and forwarded to the full node
  const transfer = useContractWrite(config)

  // after sending our transfer transaction to a node we receive a tx hash
  // we then wait for that transaction to be confirmed as part of a block.
  const blockchain = useWaitForTransaction({
    hash: transfer.data?.hash,
  })

  // In this step the transaction needs to be signed on the user's wallet
  if (transfer.isLoading) {
    return <p  className='m-1 italic'>Awaiting User Confirmation</p>
  }

  // Transaction has been signed and sent to the full node
  if (transfer.isSuccess) {
    return <p className='m-1 py-2 semi-bold'> {blockchain.isSuccess? "Confirmed": "Pending" }
      <a  target={"_blank"} rel="noreferrer" href={`https://explorer.celo.org/alfajores/tx/${transfer.data?.hash}`} className='m-1 underline underline-offset-8 text-forest'>
        Transfer of {formatEther(amount)}</a> to {recipientAddress}
      </p>
  }

  return <button  disabled={isDisconnected || !transfer.write} onClick={() => transfer.write?.()} className='m-1 py-1 px-4 b-1 bg-prosperity border border-sand rounded-3xl hover:bg-transparent'>
    Send {formatEther(amount)} CELO
  </button>
}