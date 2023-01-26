import { useAccount } from "wagmi"



export default function Account() {
  const { address, status} = useAccount()

    return <section className="m-1">
      {status === "connected" ?
        <>
          <label>Address</label> <code className="bg-white">{address}</code>
        </>
        : <span>{status}</span>}
    </section>

}