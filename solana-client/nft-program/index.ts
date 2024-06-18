import {
    Metaplex,
    keypairIdentity,
    bundlrStorage,
    toMetaplexFile,
    PublicKey,
} from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import fs from 'fs';
import {getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config"

const connection = new Connection(clusterApiUrl('devnet'));


const wallet = getKeypairFromEnvironment("SECRET_KEY")

console.log(wallet.publicKey.toBase58());

const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(
        bundlrStorage({
            address: 'https://devnet.bundlr.network',
            providerUrl: 'https://api.devnet.solana.com',
            timeout: 60000,
        })
    );

async function main() {
    const buffer = fs.readFileSync(__dirname + '/uploads/shinchan.jpg');
    const file = toMetaplexFile(buffer, 'image.png');

    const imageUri = await metaplex.storage().upload(file);

    const { uri } = await metaplex.nfts().uploadMetadata({
        name: 'Shinchan NFT -  Tarun',
        description: 'Shinchan NFT created by Tarun Kumar',
        image: imageUri,
    });

    const { nft } = await metaplex.nfts().create(
        {
            uri: uri,
            name: 'Shinchan NFT - Tarun Kumar',
            sellerFeeBasisPoints: 0,
        },
        { commitment: 'finalized' }
    );

    console.log(nft.address);
}

main();
