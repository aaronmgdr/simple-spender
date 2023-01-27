import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
    return (
          <nav className="bg-prosperity border-b border-black">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <ConnectButton   />
                </div>
              </div>
            </div>
          </nav>
    )
  }