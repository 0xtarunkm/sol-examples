import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import {useEffect, useState} from "react";
import {Movie} from "../../lib/Movie.ts";

const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

export const MovieList = () => {
    const connection = new Connection(clusterApiUrl('devnet'));
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        connection.getProgramAccounts(new PublicKey(MOVIE_REVIEW_PROGRAM_ID))
            .then(async (accounts) => {
                const movies: Movie[] = accounts.reduce((accum: Movie[], { pubkey, account }) => {
                    const movie = Movie.deserialize(account.data)
                    if (!movie) {
                        return accum
                    }

                    return [...accum, movie]
                }, [])
                setMovies(movies)
            })
    }, [])

    console.log(movies[11].description);
    return (
        <>
            {movies.map((movie, i) => {
                <div key={i} style={{color: "white"}}>
                    <p>{movie.title}</p>
                    <p>{movie.description}</p>
                </div>
            })}
        </>
    )
}