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
exports.showBalance = void 0;
const web3_js_1 = require("@solana/web3.js");
const showBalance = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'));
    const balance = yield connection.getBalance(new web3_js_1.PublicKey(address));
    return balance;
});
exports.showBalance = showBalance;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const balance = yield (0, exports.showBalance)("CeYv5PsCftUeXgTEq1A6HGYUENfzboB5uPCeRanfFH8u");
    console.log(balance / web3_js_1.LAMPORTS_PER_SOL);
}))();
