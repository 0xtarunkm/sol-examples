import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { program } from '../anchor/setup';
import { useState } from 'react';

export default function Increment() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [sig, setSig] = useState<string>('');

  const onClick = async () => {
    if (!publicKey) {
      return;
    }

    try {
      const transaction = await program.methods
        .increment()
        .accounts({
          user: publicKey,
        })
        .transaction();

      console.log(transaction);

      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );

      setSig(
        `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={onClick}>increment</button>
      <div>
        <a href={sig} target="_blank" rel="noreferrer">
          {sig}
        </a>
      </div>
    </div>
  );
}
