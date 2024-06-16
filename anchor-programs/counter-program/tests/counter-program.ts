import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import {PublicKey} from "@solana/web3.js"
import { expect } from "chai"
import { CounterProgram } from "../target/types/counter_program"

describe("counter-program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.CounterProgram as Program<CounterProgram>

  const [counterPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("counter")],
      program.programId
  );

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
        .initialize()
        .rpc()

    const account = await program.account.counterStruct.fetch(counterPDA)
    expect(account.count.toNumber()).to.equal(0)
  })

  it("Incremented the count", async () => {
    const tx = await program.methods
        .increment()
        .rpc()

    const account = await program.account.counterStruct.fetch(counterPDA)
    expect(account.count.toNumber()).to.equal(1)
  })

  it("Decrement the count", async () => {
    const tx = await program.methods
        .decrement()
        .rpc()

    const account = await program.account.counterStruct.fetch(counterPDA)
    expect(account.count.toNumber()).to.equal(0)
  })
})