export type CounterProgram = {
  address: '7E8ibwHZTGCkobE9DkRVYss9LksviexqomAbBkpBJ1qF';
  metadata: {
    name: 'counterProgram';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'decrement';
      discriminator: [106, 227, 168, 59, 248, 27, 150, 101];
      accounts: [
        {
          name: 'counter';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [99, 111, 117, 110, 116, 101, 114];
              }
            ];
          };
        },
        {
          name: 'user';
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: 'increment';
      discriminator: [11, 18, 104, 9, 104, 174, 59, 33];
      accounts: [
        {
          name: 'counter';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [99, 111, 117, 110, 116, 101, 114];
              }
            ];
          };
        },
        {
          name: 'user';
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: 'initialize';
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: 'counter';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [99, 111, 117, 110, 116, 101, 114];
              }
            ];
          };
        },
        {
          name: 'user';
          writable: true;
          signer: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'counterStruct';
      discriminator: [246, 111, 218, 94, 73, 90, 69, 125];
    }
  ];
  types: [
    {
      name: 'counterStruct';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'count';
            type: 'u64';
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    }
  ];
};
