import {useConnection} from "@solana/wallet-adapter-react";
import {PublicKey} from "@solana/web3.js";
import {useEffect, useState} from "react";
import {Movie} from "../lib/Movie.ts";

const MOVIE_REVIEW_PROGRAM_ID = "5S3zdKYuVAAmpf9R7QkkAiBviWywzz9VHy14YR3CW8Xd";
export const MovieList = () => {
    const {connection} = useConnection();
    const [movies, setMovies] = useState<Movie[] | null>([]);

    useEffect(() => {
        connection.getProgramAccounts(new PublicKey(MOVIE_REVIEW_PROGRAM_ID)).then(async(accounts) => {
            const movies:(Movie | null)[] = accounts.map(({account}) => {
                console.log(account.data)
                return Movie.deserialize(account.data);
            })
            if(!movies) return;
            // @ts-ignore
            setMovies(movies);
            console.log(movies)
        })
    }, [])
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