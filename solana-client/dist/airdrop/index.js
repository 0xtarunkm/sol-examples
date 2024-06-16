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
exports.airdrop = void 0;
const web3_js_1 = require("@solana/web3.js");
const airdrop = (address, sol) => __awaiter(void 0, void 0, void 0, function* () {
    const publicKey = address;
    const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'));
    const signature = yield connection.requestAirdrop(publicKey, sol * web3_js_1.LAMPORTS_PER_SOL);
    console.log(signature);
});
exports.airdrop = airdrop;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.airdrop)(new web3_js_1.PublicKey("CeYv5PsCftUeXgTEq1A6HGYUENfzboB5uPCeRanfFH8u"), 1);
}))();
