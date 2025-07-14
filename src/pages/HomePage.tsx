import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTrendingMovies(currentPage);
  }, [currentPage]);

  const fetchTrendingMovies = async (page: number) => {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTM5NzU3ZTdlMDRkMTlhNzM4ZGY3YTM0NzQxZjMyMiIsIm5iZiI6MTcxNjM3MTU0Ni40NzcsInN1YiI6IjY2NGRjMDVhODYwYzYzYzM3MDM1YWQzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xqnWrHQ71IVjWIudK5sVyPpRqFDdqG4s04GZ5PHX_gQ",
      },
    };

    try {
      const { data } = await axios.get(url, options);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1;
    fetchTrendingMovies(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading movies...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      <div className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </div>

      <ul className={styles.movieGrid}>
        {movies.map((movie: Movie) => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className={styles.movieCard}
          >
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
          </Link>
        ))}
      </ul>

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          pageClassName={styles.pageItem}
          pageLinkClassName={styles.pageLink}
          activeClassName={styles.active}
          previousClassName={styles.pageItem}
          nextClassName={styles.pageItem}
          previousLinkClassName={styles.pageLink}
          nextLinkClassName={styles.pageLink}
          disabledClassName={styles.disabled}
          breakClassName={styles.pageItem}
          breakLinkClassName={styles.pageLink}
          previousLabel="← Previous"
          nextLabel="Next →"
          breakLabel="..."
          forcePage={currentPage - 1}
        />
      )}
    </div>
  );
}
