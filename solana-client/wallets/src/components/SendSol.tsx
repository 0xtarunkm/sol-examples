import {useState} from "react";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {LAMPORTS_PER_SOL, SystemProgram, Transaction, PublicKey} from "@solana/web3.js";

export const SendSol = () => {
    const [amount, setAmount] = useState(0);
    const [address, setAddress] = useState('');
    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();

    const sendSol = async () => {
        if (!connection || !publicKey) {
            alert("please connect your wallet first");
            return
        }

        const transaction = new Transaction();

        const instruction = SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(address),
            lamports: LAMPORTS_PER_SOL * amount,
        });

        transaction.add(instruction);

        const sig = await sendTransaction(transaction, connection);
        console.log(`Transaction: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
    }
    return (
        <div>
            <p>Amount in sol</p>
            <input type={'number'} placeholder={'Amount in sol'} onChange={(e) => {
                setAmount(parseInt(e.target.value));
            }}/>
            <p>Send sol to</p>
            <input type={'text'} placeholder={'paste the address here!'} onChange={(e) => {
                setAddress(e.target.value);
            }}/>
            <button onClick={sendSol}>send it!</button>
        </div>
    )
}