import {
    clusterApiUrl,
    Connection,
    SystemProgram,
    Transaction,
    PublicKey,
    Keypair,
    LAMPORTS_PER_SOL, sendAndConfirmTransaction
} from "@solana/web3.js";
import {getKeypairFromEnvironment} from "@solana-developers/helpers";

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

const keyPair = getKeypairFromEnvironment("SECRET_KEY");

(async () => {
    await sendSolana(keyPair, new PublicKey("FdvRKFEgdqJeKXS8SdffMkbYKg2oKwDXfamciiinWXjN"), 1);
})()