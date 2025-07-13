import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import styles from "../styles/MovieDetailsPage.module.css";

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | object;
  budget: number;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTM5NzU3ZTdlMDRkMTlhNzM4ZGY3YTM0NzQxZjMyMiIsIm5iZiI6MTcxNjM3MTU0Ni40NzcsInN1YiI6IjY2NGRjMDVhODYwYzYzYzM3MDM1YWQzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xqnWrHQ71IVjWIudK5sVyPpRqFDdqG4s04GZ5PHX_gQ",
        },
      };

      try {
        const { data } = await axios.get(url, options);
        setMovieDetails(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className={styles.container}>
      {movieDetails && (
        <div className={styles.movieDetails}>
          <div className={styles.movieHeader}>
            {movieDetails.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className={styles.moviePoster}
              />
            ) : (
              <div className={styles.noPhoto}>No Photo</div>
            )}
            <div className={styles.movieInfo}>
              <h1 className={styles.movieTitle}>{movieDetails.title}</h1>
              {movieDetails.tagline && (
                <p className={styles.movieTagline}>"{movieDetails.tagline}"</p>
              )}
              <p className={styles.movieOverview}>{movieDetails.overview}</p>
              <div className={styles.movieMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Rating</span>
                  <div className={styles.rating}>
                    ⭐ {movieDetails.vote_average.toFixed(1)} (
                    {movieDetails.vote_count} votes)
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Runtime</span>
                  <span
                    className={`${styles.metaValue} ${styles.runtime}`}
                  >{`${Math.floor(movieDetails.runtime / 60)}h ${
                    movieDetails.runtime % 60
                  }m`}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Release Date</span>
                  <span className={styles.metaValue}>
                    {movieDetails.release_date}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Language</span>
                  <span className={styles.metaValue}>
                    {movieDetails.original_language.toUpperCase()}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Budget</span>
                  <span className={`${styles.metaValue} ${styles.budget}`}>
                    {movieDetails.budget
                      ? formatCurrency(movieDetails.budget)
                      : "N/A"}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Revenue</span>
                  <span className={`${styles.metaValue} ${styles.revenue}`}>
                    {movieDetails.revenue
                      ? formatCurrency(movieDetails.revenue)
                      : "N/A"}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Status</span>
                  <span className={styles.status}>{movieDetails.status}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Popularity</span>
                  <span className={styles.metaValue}>
                    {movieDetails.popularity.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>More Information</h3>
            <div className={styles.linkButtons}>
              <Link
                to={`/movies/${movieId}/cast`}
                className={styles.linkButton}
              >
                👥 View Cast
              </Link>
              <Link
                to={`/movies/${movieId}/reviews`}
                className={styles.linkButton}
              >
                💬 Read Reviews
              </Link>
              {movieDetails.homepage && (
                <a
                  href={movieDetails.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  🌐 Official Website
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
