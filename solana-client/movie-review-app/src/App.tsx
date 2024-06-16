import './App.css'
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {useMemo} from "react";
import {clusterApiUrl} from "@solana/web3.js";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {PhantomWalletAdapter} from "@solana/wallet-adapter-phantom";
import {WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import * as buffer from "buffer";
import {Form} from "./components/Form.tsx";
import {MovieList} from "./components/MovieList.tsx";
window.Buffer = buffer.Buffer;

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [
      new PhantomWalletAdapter()
  ], [network]);

  return (
    <>
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <Form />
                    <MovieList />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    </>
  )
}

export default App
