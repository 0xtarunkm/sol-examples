"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const PROGRAM_ID = new web3_js_1.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const PROGRAM_DATA_PUBLIC_KEY = new web3_js_1.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'));
const secret = Uint8Array.from([221, 238, 125, 115, 182, 138, 144, 194, 103, 74, 93, 88, 231, 243, 169, 201, 228, 253, 68, 20, 238, 242, 180, 215, 90, 59, 246, 71, 10, 251, 235, 87, 173, 15, 33, 244, 237, 82, 221, 203, 48, 177, 141, 148, 194, 140, 28, 205, 39, 120, 125, 75, 229, 44, 159, 155, 202, 30, 231, 68, 199, 72, 68, 250]);
const payer = web3_js_1.Keypair.fromSecretKey(secret);
function pingProgram(connection, payer) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = new web3_js_1.Transaction();
        const instruction = new web3_js_1.TransactionInstruction({
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
        const transactionSignature = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [payer]);
        console.log(`Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield pingProgram(connection, payer);
}))();
