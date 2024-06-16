import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {Movie} from "../../lib/Movie.ts";
import {PublicKey, SystemProgram, Transaction, TransactionInstruction} from "@solana/web3.js";
import {useState} from "react";

const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

export const Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);

    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();

    const handleSubmit = () => {
        const movie = new Movie(title, rating, description);
        handleTransactionSubmit(movie);
    }
    const handleTransactionSubmit = async(movie: Movie) => {
        if (!publicKey || !connection) {
            alert("please connect your wallet");
            return
        }

        const buffer = movie.serialize();
        const transaction = new Transaction();

        const [pda] = await PublicKey.findProgramAddressSync(
            [publicKey.toBuffer(), new TextEncoder().encode(movie.title)],
            new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        )

        const instruction = new TransactionInstruction({
            keys: [
                {
                    pubkey: publicKey,
                    isSigner: true,
                    isWritable: false
                },
                {
                    pubkey: pda,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: SystemProgram.programId,
                    isSigner: false,
                    isWritable: false
                }
            ],
            data: buffer,
            programId: new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        })

        transaction.add(instruction);

        try {
            let txId = await sendTransaction(transaction, connection);
            console.log(`TransactionID: https://explorer.solana.com/tx/${txId}?cluster=devnet`)
        } catch (e) {
            alert(JSON.stringify(e))
        }
    }
    return (
        <>
            <input type={'text'} placeholder={'title'} onChange={(e) => {
                setTitle(e.target.value)
            }}/>
            <input type={'text'} placeholder={'description'} onChange={(e) => {
                setDescription(e.target.value)
            }} />
            <input type={'number'} placeholder={'rating'} onChange={(e) => {
                setRating(parseInt(e.target.value))
            }} />
            <button onClick={handleSubmit}>submit rating!</button>
        </>
    )
}