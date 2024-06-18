import {clusterApiUrl, Connection} from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config"
import {createMint} from "@solana/spl-token";

const connection = new Connection(clusterApiUrl('devnet'));

const user = getKeypairFromEnvironment("SECRET_KEY");

(async () => {
const tokenMint = await createMint(connection, user, user.publicKey, null, 2);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✅ finished! created token mint ${link}`)
})()
