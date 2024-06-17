
import './App.css'
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {useMemo} from "react";
import {clusterApiUrl} from "@solana/web3.js";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {SayHello} from "./components/SayHello.tsx";
import "@solana/wallet-adapter-react-ui/styles.css"

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoints = useMemo(() => clusterApiUrl('devnet'), [network]);

  const wallets = useMemo(() => [], [network]);

  return (
    <>
      <ConnectionProvider endpoint={endpoints}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <WalletMultiButton />
            <SayHello />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
