import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

export const showBalance = async (address: string) => {
    const connection = new Connection(clusterApiUrl('devnet'));
    const balance = await connection.getBalance(new PublicKey(address));

    return balance;
}

(async() => {
    const balance = await showBalance("CeYv5PsCftUeXgTEq1A6HGYUENfzboB5uPCeRanfFH8u");
    console.log(balance/LAMPORTS_PER_SOL);
})()