import {
    clusterApiUrl,
    Connection,
    SystemProgram,
    Transaction,
    PublicKey,
    Keypair,
    LAMPORTS_PER_SOL, sendAndConfirmTransaction
} from "@solana/web3.js";

export const sendSolana = async(from: Keypair, to: PublicKey, amount: number) => {
    const connection = new Connection(clusterApiUrl('devnet'));

    const transaction = new Transaction();

    const instruction = SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL * amount
    })

    transaction.add(instruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [from], {
        commitment: "confirmed"
    });

    console.log(signature);
}

const secret = Uint8Array.from([221,238,125,115,182,138,144,194,103,74,93,88,231,243,169,201,228,253,68,20,238,242,180,215,90,59,246,71,10,251,235,87,173,15,33,244,237,82,221,203,48,177,141,148,194,140,28,205,39,120,125,75,229,44,159,155,202,30,231,68,199,72,68,250])
const keyPair = Keypair.fromSecretKey(secret);

(async () => {
    await sendSolana(keyPair, new PublicKey("FdvRKFEgdqJeKXS8SdffMkbYKg2oKwDXfamciiinWXjN"), 1);
})()