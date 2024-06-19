import './App.css'
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {useMemo} from "react";
import {clusterApiUrl, PublicKey} from "@solana/web3.js";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {} from "@coral-xyz/anchor"

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [], [network]);

  const PROGRAM_ID = new PublicKey("5wwi4x7YMaGLfoy1VkKt7mtGoqsokQT5d8jT5YVbfobc");

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <WalletMultiButton />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
