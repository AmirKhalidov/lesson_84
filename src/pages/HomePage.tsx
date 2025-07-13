import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const url =
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTM5NzU3ZTdlMDRkMTlhNzM4ZGY3YTM0NzQxZjMyMiIsIm5iZiI6MTcxNjM3MTU0Ni40NzcsInN1YiI6IjY2NGRjMDVhODYwYzYzYzM3MDM1YWQzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xqnWrHQ71IVjWIudK5sVyPpRqFDdqG4s04GZ5PHX_gQ",
        },
      };

      try {
        const { data } = await axios.get(url, options);
        setMovies(data.results);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      <ul className={styles.movieGrid}>
        {movies.map((movie: Movie) => (
          <li key={movie.id} className={styles.movieCard}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles.moviePoster}
              />
            ) : (
              <div className={styles.noPhoto}>No Photo</div>
            )}
            <div className={styles.movieInfo}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <p className={styles.movieOverview}>{movie.overview}</p>
              <div className={styles.movieMeta}>
                <div className={styles.rating}>
                  ⭐ {movie.vote_average.toFixed(1)}
                </div>
                <div className={styles.voteCount}>{movie.vote_count} votes</div>
              </div>
              <div className={styles.movieDetails}>
                <span>{movie.original_language.toUpperCase()}</span>
                <span>{movie.release_date}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
