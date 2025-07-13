import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "../styles/MovieReviews.module.css";

export interface AuthorDetails {
  avatar_path: string | null;
  name: string;
  rating: number;
  username: string;
}

export interface MovieReview {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState<MovieReview[]>([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTM5NzU3ZTdlMDRkMTlhNzM4ZGY3YTM0NzQxZjMyMiIsIm5iZiI6MTcxNjM3MTU0Ni40NzcsInN1YiI6IjY2NGRjMDVhODYwYzYzYzM3MDM1YWQzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xqnWrHQ71IVjWIudK5sVyPpRqFDdqG4s04GZ5PHX_gQ",
        },
      };

      try {
        const {
          data: { results },
        } = await axios.get(url, options);
        setMovieReviews(results);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Movie Reviews</h1>
      <ul className={styles.reviewsList}>
        {movieReviews && movieReviews.length > 0 ? (
          movieReviews.map((movieReview: MovieReview) => (
            <li key={movieReview.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                {movieReview.author_details.avatar_path ? (
                  <img
                    src={
                      movieReview.author_details.avatar_path.startsWith(
                        "/https"
                      )
                        ? movieReview.author_details.avatar_path.slice(1)
                        : `https://image.tmdb.org/t/p/w200${movieReview.author_details.avatar_path}`
                    }
                    alt={movieReview.author_details.name}
                    className={styles.authorAvatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {getInitials(movieReview.author)}
                  </div>
                )}
                <div className={styles.authorInfo}>
                  <h3 className={styles.authorName}>{movieReview.author}</h3>
                  <p className={styles.authorUsername}>
                    @{movieReview.author_details.username}
                  </p>
                </div>
                {movieReview.author_details.rating && (
                  <div className={styles.ratingBadge}>
                    ⭐ {movieReview.author_details.rating}/10
                  </div>
                )}
              </div>
              <div className={styles.reviewContent}>
                <p className={styles.reviewText}>{movieReview.content}</p>
                <div className={styles.reviewMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Created</span>
                    <span className={styles.metaValue}>
                      {formatDate(movieReview.created_at)}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Updated</span>
                    <span className={styles.metaValue}>
                      {formatDate(movieReview.updated_at)}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className={styles.noReviews}>
            No reviews available for this movie
          </div>
        )}
      </ul>
    </div>
  );
}
