import Account from "@/components/Account"
import Balance from "@/components/Balance"
import Transfer from "@/components/Transfer"
import { useFeeData } from 'wagmi'

export default function Home() {
  const data = useFeeData()

  return (
    <div>
      <Account />
      <Balance />
      <Transfer />
      <div>Fee data: { data.isSuccess ? JSON.stringify(data.data?.formatted) : data.status }</div>
    </div>
  )
}
