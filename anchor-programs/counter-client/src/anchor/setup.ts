import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { IdlAccounts, Program } from '@coral-xyz/anchor';
import type { CounterProgram } from './idlTypes';
import idl from './Idl.json';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export const program = new Program(idl as CounterProgram, {
  connection,
});

export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from('counter')],
  program.programId
);

export type CounterData = IdlAccounts<CounterProgram>['counterStruct'];
