import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js"

export const airdrop = async (address: PublicKey, sol: number) => {
    const publicKey = address;
    const connection = new Connection(clusterApiUrl('devnet'));

    const signature = await connection.requestAirdrop(publicKey, sol * LAMPORTS_PER_SOL);

    console.log(signature);
}
(async () => {
    await airdrop(new PublicKey("CeYv5PsCftUeXgTEq1A6HGYUENfzboB5uPCeRanfFH8u"), 1)
})()