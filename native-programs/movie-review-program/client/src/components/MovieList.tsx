import {useConnection} from "@solana/wallet-adapter-react";
import {PublicKey} from "@solana/web3.js";
import {useEffect, useState} from "react";
import {Movie} from "../lib/Movie.ts";

const MOVIE_REVIEW_PROGRAM_ID = "2DpDPNZp9Zc9iFrC4CVxN2qYeP57UcBdqDWpNvHgyQiZ";
export const MovieList = () => {
    const {connection} = useConnection();
    const [movies, setMovies] = useState<Movie[]>([]);

    // console.log('heelo')

    useEffect(() => {
        connection.getProgramAccounts(new PublicKey(MOVIE_REVIEW_PROGRAM_ID))
            .then(async (accounts) => {
                console.log(accounts)
                const movies: Movie[] = accounts.reduce((accum: Movie[], { pubkey, account }) => {
                    const movie = Movie.deserialize(account.data)
                    if (!movie) {
                        return accum
                    }

                    console.log(`pubkey: ${pubkey} movie: ${movie}`)

                    return [...accum, movie]
                }, [])
                setMovies(movies)
            })
    }, [connection])
    return (
        <>
            {
                movies.map((movie, i) => {
                    <div key={i}>
                        <p>{movie.title}</p>
                        <p>{movie.description}</p>
                        <p>{movie.rating}</p>
                    </div>
                })
            }
        </>
    )
}