import { useAccount } from "wagmi"



export default function Account() {
  const { address, status} = useAccount()

  if (status === "connected") {
    return <span>{address}</span>
  } else {
    return <span>{status}</span>
  }
}