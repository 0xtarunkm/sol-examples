import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {PublicKey, Transaction, TransactionInstruction} from "@solana/web3.js";

const PROGRAM_ID = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
const PROGRAM_DATA_PUBLIC_KEY = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")

export const PingButton = () => {

    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();

    const onClick = async () => {
        if (!connection || !publicKey) {
            alert("connect your wallet first lol!");
            return
        }

        const transaction = new Transaction();

        const instruction = new TransactionInstruction({
            keys: [
                {
                    pubkey: PROGRAM_DATA_PUBLIC_KEY,
                    isSigner: false,
                    isWritable: true
                },
            ],
            programId: PROGRAM_ID
        })

        transaction.add(instruction);
        const sign = await sendTransaction(transaction, connection);
        console.log(`Transaction https://explorer.solana.com/tx/${sign}?cluster=devnet`);
    }
    return (
        <>
            <button onClick={onClick}>Click me!</button>
        </>
    )
}