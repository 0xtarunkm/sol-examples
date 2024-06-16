"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.callCounter = void 0;
const web3_js_1 = require("@solana/web3.js");
const airdrop_1 = require("../airdrop");
const borsh = __importStar(require("borsh"));
const CONTRACT_PROGRAM_ID = "GrU5PU8mUi2sepGLwpRd6CBm6mb8riaVeC4Key6o7LTG";
class CounterAccount {
    constructor(fields = undefined) {
        this.counter = 0;
        if (fields) {
            this.counter = fields.counter;
        }
    }
}
const CounterSchema = new Map([
    [CounterAccount, { kind: 'struct', fields: [['counter', 'u32']] }],
]);
const createDataAccount = (connection, parentAccount) => __awaiter(void 0, void 0, void 0, function* () {
    const dataAccount = web3_js_1.Keypair.generate();
    const createAccountInstruction = yield web3_js_1.SystemProgram.createAccount({
        fromPubkey: parentAccount.publicKey,
        newAccountPubkey: dataAccount.publicKey,
        lamports: web3_js_1.LAMPORTS_PER_SOL * 1,
        space: 4,
        programId: new web3_js_1.PublicKey(CONTRACT_PROGRAM_ID)
    });
    const transaction = new web3_js_1.Transaction();
    transaction.add(createAccountInstruction);
    yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [parentAccount, dataAccount]);
    return dataAccount;
});
const callCounter = (parentAccount) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'));
    yield (0, airdrop_1.airdrop)(parentAccount.publicKey, 2);
    const dataAccount = yield createDataAccount(connection, parentAccount);
    console.log(dataAccount.publicKey.toString());
    console.log(parentAccount.publicKey.toString());
    const instruction = new web3_js_1.TransactionInstruction({
        keys: [{ pubkey: dataAccount.publicKey, isSigner: true, isWritable: true }],
        programId: new web3_js_1.PublicKey(CONTRACT_PROGRAM_ID),
        data: Buffer.alloc(0)
    });
    yield (0, web3_js_1.sendAndConfirmTransaction)(connection, new web3_js_1.Transaction().add(instruction), [parentAccount]);
    //     Read info
    const accountInfo = yield connection.getAccountInfo(dataAccount.publicKey);
    const counter = borsh.deserialize(
    // @ts-ignore
    CounterSchema, CounterAccount, accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.data);
    console.log(dataAccount.publicKey.toBase58(), "has been greeted", 
    // @ts-ignore
    counter.counter, 'time(s)');
});
exports.callCounter = callCounter;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.callCounter)(web3_js_1.Keypair.generate());
}))();
