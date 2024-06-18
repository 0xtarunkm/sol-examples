import {useState} from "react";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {Student} from "../lib/StudentIntro.ts";
import {PublicKey, SystemProgram, Transaction, TransactionInstruction} from "@solana/web3.js";

const PROGRAM_ID = "HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf";
export const AddStudentIntro = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();

    const handleSubmit = () => {
        const student = new Student(name, message);
        callTransaction(student);
    }

    const callTransaction = async (student: Student) => {
        if (!publicKey || !connection) {
            alert("please connect your wallet");
            return;
        }

        const transaction = new Transaction();

        const buffer = student.serialize();

        const [pda] = PublicKey.findProgramAddressSync(
            [publicKey.toBuffer(), Buffer.from(student.name)],
            new PublicKey(PROGRAM_ID)
        )

        const instruction = new TransactionInstruction({
            keys: [
                {
                    pubkey: publicKey,
                    isSigner: true,
                    isWritable: false,
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
            programId: new PublicKey(PROGRAM_ID)
        })

        transaction.add(instruction);

        const sig = await sendTransaction(transaction, connection);

        console.log(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
    }

    return (
        <>
            <input
                type={"text"}
                placeholder={"What do we call you?"}
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <input
                type={"text"}
                placeholder={"What brings you to solana?"}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button onClick={handleSubmit}>submit</button>
        </>
    )
}