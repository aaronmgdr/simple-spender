import Account from "@/components/Account"
import Balance from "@/components/Balance"
import Transfer from "@/components/TransferButton"

export default function Home() {

  return (
    <div>
      <Account />
      <Balance />
      <Transfer />
    </div>
  )
}
