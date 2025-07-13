import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Movie } from "./HomePage";
import { Link } from "react-router";
import styles from "../styles/MoviesPage.module.css";

export default function MoviesPage() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchSearchedMovie = async () => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchInput}`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTM5NzU3ZTdlMDRkMTlhNzM4ZGY3YTM0NzQxZjMyMiIsIm5iZiI6MTcxNjM3MTU0Ni40NzcsInN1YiI6IjY2NGRjMDVhODYwYzYzYzM3MDM1YWQzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xqnWrHQ71IVjWIudK5sVyPpRqFDdqG4s04GZ5PHX_gQ",
        },
      };

      try {
        const { data } = await axios.get(url, options);
        setSearchedMovies(data.results);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      }
    };
    if (searchInput.length > 2) fetchSearchedMovie();
  }, [searchInput]);

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <h1 className={styles.title}>Search Movies</h1>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          className={styles.searchInput}
        />
      </div>
      <ul className={styles.movieGrid}>
        {searchedMovies &&
          searchedMovies.map((movie: Movie) => (
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
              className={styles.movieCard}
            >
              <li>
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
                    <div className={styles.voteCount}>
                      {movie.vote_count} votes
                    </div>
                  </div>
                  <div className={styles.movieDetails}>
                    <span>{movie.original_language.toUpperCase()}</span>
                    <span>{movie.release_date}</span>
                  </div>
                </div>
              </li>
            </Link>
          ))}
      </ul>
      {searchInput.length > 2 && searchedMovies.length === 0 && (
        <div className={styles.noResults}>
          No movies found for "{searchInput}"
        </div>
      )}
    </div>
  );
}
