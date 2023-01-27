import { ABI } from "@/abi/ERC20Plus"
import useCeloRegistry from "@/react-helpers/use-celo-registry"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils.js"
// or `import { erc20ABI } from 'wagmi'` for generic erc20 abi
import { useAccount, useContractRead } from "wagmi"


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
    return  balanceOf.data?.isZero() ? (
            <a target={"_blank"} rel="noreferrer" href="https://faucet.celo.org" className="m-1 underline underline-offset-8 text-forest">
              Top Up Account
            </a>)
            :
            <p className="m-1">Balance {formatNumber(balanceOf.data)} CELO</p>
  } else {
    return <p className="m-1">{balanceOf.status}</p>
  }
}

// Because blockchain values have so many digits they cannot be accurately stored using Javascript's floating point numbers
// BigNumber is a library which is used as a way around ths.
// However for our purposes we need to display a less precise number
// step 1 formatEther will give a string representation of the number (with lots of digits)
// step 2 takes string and converts it to a number (Number(full)) and then back to string with 4 digits

function formatNumber(value: BigNumber) {
  const full = formatEther(value)
  return Number(full).toPrecision(4)
}