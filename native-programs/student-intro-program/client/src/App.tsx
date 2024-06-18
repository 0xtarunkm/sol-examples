import './App.css'
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {useMemo} from "react";
import {clusterApiUrl} from "@solana/web3.js";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {AddStudentIntro} from "./components/AddStudentIntro.tsx";
import "@solana/wallet-adapter-react-ui/styles.css"

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [], [network])

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
              <WalletModalProvider>
                  <WalletMultiButton />
                  <AddStudentIntro />
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
