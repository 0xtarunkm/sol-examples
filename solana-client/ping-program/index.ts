import {
    clusterApiUrl,
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    Transaction,
    TransactionInstruction
} from "@solana/web3.js";

const PROGRAM_ID = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const PROGRAM_DATA_PUBLIC_KEY = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");

const connection = new Connection(clusterApiUrl('devnet'));

const secret = Uint8Array.from([221,238,125,115,182,138,144,194,103,74,93,88,231,243,169,201,228,253,68,20,238,242,180,215,90,59,246,71,10,251,235,87,173,15,33,244,237,82,221,203,48,177,141,148,194,140,28,205,39,120,125,75,229,44,159,155,202,30,231,68,199,72,68,250])
const payer = Keypair.fromSecretKey(secret);

async function pingProgram(connection: Connection, payer: Keypair) {
    const transaction = new Transaction();
    const instruction = new TransactionInstruction({
        keys: [
            {
                pubkey: PROGRAM_DATA_PUBLIC_KEY,
                isSigner: false,
                isWritable: true
            }
        ],
        programId: PROGRAM_ID
    });

    transaction.add(instruction);
    const transactionSignature = await sendAndConfirmTransaction(connection, transaction, [payer]);

    console.log(`Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
}

(async () => {
    await pingProgram(connection, payer);
})()