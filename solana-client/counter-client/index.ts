import {
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    SystemProgram,
    PublicKey,
    Transaction, sendAndConfirmTransaction, TransactionInstruction
} from "@solana/web3.js";
import {airdrop} from "../airdrop";
import * as borsh from "borsh";

const CONTRACT_PROGRAM_ID = "GrU5PU8mUi2sepGLwpRd6CBm6mb8riaVeC4Key6o7LTG"

class CounterAccount {
    counter = 0;
    constructor(fields: {counter: number} | undefined = undefined) {
        if (fields) {
            this.counter = fields.counter;
        }
    }
}

const CounterSchema = new Map([
    [CounterAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
])

const createDataAccount = async (connection: Connection, parentAccount: Keypair): Promise<Keypair> => {
    const dataAccount = Keypair.generate();
    const createAccountInstruction = await SystemProgram.createAccount({
        fromPubkey: parentAccount.publicKey,
        newAccountPubkey: dataAccount.publicKey,
        lamports: LAMPORTS_PER_SOL * 1,
        space: 4,
        programId: new PublicKey(CONTRACT_PROGRAM_ID)
    });

    const transaction = new Transaction();
    transaction.add(createAccountInstruction);
    await sendAndConfirmTransaction(connection, transaction, [parentAccount, dataAccount]);
    return dataAccount;
}

export const callCounter = async (parentAccount: Keypair) => {
    const connection = new Connection(clusterApiUrl('devnet'));
    await airdrop(parentAccount.publicKey, 2);
    const dataAccount = await createDataAccount(connection, parentAccount);

    console.log(dataAccount.publicKey.toString());
    console.log(parentAccount.publicKey.toString());

    const instruction = new TransactionInstruction({
        keys: [{pubkey: dataAccount.publicKey, isSigner: true, isWritable: true}],
        programId: new PublicKey(CONTRACT_PROGRAM_ID),
        data: Buffer.alloc(0)
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [parentAccount]
    )

//     Read info
    const accountInfo = await connection.getAccountInfo(dataAccount.publicKey);

    const counter = borsh.deserialize(
        // @ts-ignore
        CounterSchema,
        CounterAccount,
        accountInfo?.data
    )

    console.log(
        dataAccount.publicKey.toBase58(),
        "has been greeted",
        // @ts-ignore
        counter.counter,
        'time(s)'
    )
}

(async () => {
    await callCounter(Keypair.generate());
})()