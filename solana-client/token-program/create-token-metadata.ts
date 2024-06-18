import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import {getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config"

const connection = new Connection(clusterApiUrl('devnet'));

const user = getKeypairFromEnvironment("SECRET_KEY")

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const tokenMintAccount = new PublicKey("7EbjUFLjb6NzUeD8fA5M29nvNZ1Pd627VSE5iPv414rN")

const metadataData = {
    name: "Angry Shinchan",
    symbol: ""
}