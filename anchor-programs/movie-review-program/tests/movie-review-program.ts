import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MovieReviewProgram } from "../target/types/movie_review_program";
import {expect} from "chai";

describe("movie-review-program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.MovieReviewProgram as Program<MovieReviewProgram>;

  const movie = {
    title: "Random Movie",
    description: "Random movie description",
    rating: 5
  }

  const [moviePda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from(movie.title), provider.wallet.publicKey.toBuffer()],
      program.programId
  )

  it("Movie review added", async () => {
    const tx = await program.methods
        .addMovieReview(movie.title, movie.description, movie.rating)
        .rpc();

    const account = await program.account.movieAccountState.fetch(moviePda);
    expect(movie.title === account.title);
    expect(movie.description === account.description);
    expect(movie.rating === account.rating);
    expect(account.reviewer === provider.wallet.publicKey);
  });

  it("Movie review is updated", async () => {
    const newDescription = "Wow this is new";
    const newRating = 4;

    const tx = await program.methods
        .updateMovieReview(movie.title, newDescription, newRating)
        .rpc()

    const account = await program.account.movieAccountState.fetch(moviePda);
    expect(movie.title === account.title)
    expect(newRating === account.rating)
    expect(newDescription === account.description)
    expect(account.reviewer === provider.wallet.publicKey)
  });

  it("Deletes a movie review", async () => {
    const tx = await program.methods
        .deleteMovieReview(movie.title)
        .rpc()
  });
});
