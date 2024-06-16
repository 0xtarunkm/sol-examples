import { useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { CounterData, program, counterPDA } from '../anchor/setup';
import * as buffer from 'buffer';

window.Buffer = buffer.Buffer;

export default function Init() {
  const { connection } = useConnection();
  const [counterData, setCounterData] = useState<CounterData | null>(null);

  useEffect(() => {
    program.account.counterStruct.fetch(counterPDA).then((data) => {
      setCounterData(data);
    });

    const subscriptionId = connection.onAccountChange(
      counterPDA,
      (accountInfo) => {
        setCounterData(
          program.coder.accounts.decode('counterStruct', accountInfo.data)
        );
      }
    );

    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [program]);
  return (
    <div>
      <p>Count: {counterData?.count.toString()}</p>
    </div>
  );
}
