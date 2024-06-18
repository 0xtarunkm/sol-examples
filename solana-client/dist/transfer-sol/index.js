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
exports.sendSolana = void 0;
const web3_js_1 = require("@solana/web3.js");
const helpers_1 = require("@solana-developers/helpers");
const sendSolana = (from, to, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'));
    const transaction = new web3_js_1.Transaction();
    const instruction = web3_js_1.SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: web3_js_1.LAMPORTS_PER_SOL * amount
    });
    transaction.add(instruction);
    const signature = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [from], {
        commitment: "confirmed"
    });
    console.log(signature);
});
exports.sendSolana = sendSolana;
const keyPair = (0, helpers_1.getKeypairFromEnvironment)("SECRET_KEY");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.sendSolana)(keyPair, new web3_js_1.PublicKey("FdvRKFEgdqJeKXS8SdffMkbYKg2oKwDXfamciiinWXjN"), 1);
}))();
