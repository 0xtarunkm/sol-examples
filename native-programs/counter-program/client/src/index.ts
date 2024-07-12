import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

const COUNTER_CONTRACT_ID = 'GuudedksDVSptVYJpcbrbvb64rapPtqwASxH4cP9WFdN';

class CounterAccount {
  counter = 0;
  constructor(fields: { counter: number } | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

const CounterSchema = new Map([
  [CounterAccount, { kind: 'struct', fields: [['counter', 'u32']] }],
]);

const createDataAccount = async (connection: Connection, payer: Keypair) => {
  const dataAccount = Keypair.generate();
  const createAccountInstruction = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: dataAccount.publicKey,
    lamports: await connection.getMinimumBalanceForRentExemption(0),
    space: 100,
    programId: new PublicKey(COUNTER_CONTRACT_ID),
  });

  const transaction = new Transaction().add(createAccountInstruction);
  await sendAndConfirmTransaction(connection, transaction, [
    payer,
    dataAccount,
  ]);

  return dataAccount;
};

export const callCounter = async (parentAccount: Keypair) => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
};
