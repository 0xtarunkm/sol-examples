import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {PublicKey, Transaction, TransactionInstruction} from "@solana/web3.js";
import {useState} from "react";

const SAY_HELLO_PROGRAM_ID = new PublicKey("2HK4VW5dYoi6ZjFp34dz2Ur3MZAfMm1yc6mPBCMTriDy");
export const SayHello = () => {
    const [sign, setSign] = useState('');
    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();

    const sayHello = async () => {
        if(!publicKey || !connection) {
            alert("Please connect your wallet");
            return
        }

        const transaction = new Transaction();

        const instruction = new TransactionInstruction({
            keys: [
                {
                    pubkey: publicKey,
                    isSigner: true,
                    isWritable: false
                }
            ],
            programId: SAY_HELLO_PROGRAM_ID,
        })

        transaction.add(instruction);

        const sig = await sendTransaction(transaction, connection);
        setSign(sig);
    }
    return (
        <>
            <button onClick={sayHello}>say hello!</button>
            <div>https://explorer.solana.com/tx/{sign}?cluster=devnet</div>
        </>
    )
}