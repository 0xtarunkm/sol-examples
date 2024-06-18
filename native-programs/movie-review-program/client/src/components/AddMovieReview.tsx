import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {Transaction, TransactionInstruction, PublicKey, SystemProgram} from "@solana/web3.js";
import {Movie} from "../lib/Movie.ts";
import {useState} from "react";

const MOVIE_REVIEW_PROGRAM_ID = "5S3zdKYuVAAmpf9R7QkkAiBviWywzz9VHy14YR3CW8Xd";
export const AddMovieReview = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [sig, setSig] = useState('');

    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet()

    const handleClick = async () => {
        const movie = new Movie(title, rating, description);
        await onClick(movie);
    }
    const onClick = async (movie: Movie) => {
        if (!publicKey || !connection) {
            alert("please connect your wallet");
            return
        }

        const buffer = movie.serialize();

        const transaction = new Transaction();

        const [pda] = PublicKey.findProgramAddressSync(
            [publicKey.toBuffer(), new TextEncoder().encode(movie.title)],
            new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        )

        const instruction = new TransactionInstruction({
            keys: [
                {
                    pubkey: publicKey,
                    isWritable: false,
                    isSigner: true
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
            const sig = await sendTransaction(transaction, connection);
            setSig(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
        } catch (e) {
            alert(JSON.stringify(e));
        }
    }

    return (
        <>
            <input type={"text"} placeholder={"Title"} onChange={(e) => setTitle(e.target.value)}/>
            <input type={"text"} placeholder={"Description"} onChange={(e) => setDescription(e.target.value)}/>
            <input type={"number"} placeholder={"Rating"} onChange={(e) => setRating(parseInt(e.target.value))}/>
            <button onClick={handleClick}>Add Review</button>
            <a href={sig}>{sig}</a>
        </>
    )
}