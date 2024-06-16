import './App.css'
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {useMemo} from "react";
import {clusterApiUrl} from "@solana/web3.js";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {PhantomWalletAdapter} from "@solana/wallet-adapter-phantom";
import "@solana/wallet-adapter-react-ui/styles.css"
import {PingButton} from "./components/PingButton.tsx";
import {SendSol} from "./components/SendSol.tsx";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;
function App() {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ], [network]
    )
  return (
    <>
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <PingButton />
                    <SendSol />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>

    </>
  )
}

export default App
