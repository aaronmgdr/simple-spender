import { ABI } from "@/abi/ERC20Plus"
import useCeloRegistry from "@/hooks/use-celo-registry"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils.js"
// or `import { erc20ABI } from 'wagmi'` for generic erc20 abi
import { useAccount, useContractRead, useNetwork } from "wagmi"


export default function Balance() {


  const { address, isDisconnected } = useAccount()

  //In the registry Celo ERC20 is referred to as GoldToken
  const celoTokenAddress = useCeloRegistry('GoldToken')

  // for erc20 contracts wagmi also provides the useToken hook
  // we use the useContractRead here as its more generalizable as an example
  const balanceOf = useContractRead({
    address:  celoTokenAddress.data,
    abi: ABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: celoTokenAddress.isFetched,
    select: (bal) => {
      const balance = bal as BigNumber
      return balance
    }
  })

  if (isDisconnected) {
    return null
  } else if (balanceOf.isSuccess && balanceOf.data) {
    return  balanceOf.data?.isZero() ? <a target={"_blank"} rel="noreferrer" href="https://faucet.celo.org">Top Up Account</a>  : <p> {formatEther(balanceOf.data)}</p>
  } else {
    return <p>{balanceOf.status}</p>
  }
}