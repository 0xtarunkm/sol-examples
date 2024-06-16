import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { program } from '../anchor/setup';

export default function Increment() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const onClick = async () => {
    if (!publicKey) {
      return;
    }

    try {
      const transaction = await program.methods.increment().transaction();

      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );

      console.log(
        `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={onClick}>increment</button>
    </div>
  );
}
