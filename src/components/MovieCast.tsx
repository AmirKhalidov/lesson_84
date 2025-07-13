import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "../styles/MovieCast.module.css";

export interface CastMember {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState<CastMember[]>([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTM5NzU3ZTdlMDRkMTlhNzM4ZGY3YTM0NzQxZjMyMiIsIm5iZiI6MTcxNjM3MTU0Ni40NzcsInN1YiI6IjY2NGRjMDVhODYwYzYzYzM3MDM1YWQzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xqnWrHQ71IVjWIudK5sVyPpRqFDdqG4s04GZ5PHX_gQ",
        },
      };

      try {
        const {
          data: { cast },
        } = await axios.get(url, options);
        setMovieCast(cast);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      }
    };
    fetchMovieCast();
  }, [movieId]);

  const getGenderIcon = (gender: number) => {
    switch (gender) {
      case 1:
        return "♀";
      case 2:
        return "♂";
      default:
        return "⚧";
    }
  };

  const getGenderClass = (gender: number) => {
    switch (gender) {
      case 2:
        return `${styles.genderIcon} ${styles.male}`;
      default:
        return styles.genderIcon;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Movie Cast</h1>
      <ul className={styles.castGrid}>
        {movieCast && movieCast.length > 0 ? (
          movieCast.map((castMember: CastMember) => (
            <li key={castMember.id} className={styles.castCard}>
              {castMember.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${castMember.profile_path}`}
                  alt={castMember.name}
                  className={styles.castPhoto}
                />
              ) : (
                <div className={styles.noPhoto}>No Photo</div>
              )}
              <div className={styles.castInfo}>
                <h3 className={styles.actorName}>{castMember.name}</h3>
                <p className={styles.characterName}>
                  as {castMember.character}
                </p>
                <div className={styles.castMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Department</span>
                    <span className={styles.department}>
                      {castMember.known_for_department}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Order</span>
                    <span className={styles.orderBadge}>
                      #{castMember.order + 1}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Gender</span>
                    <span className={getGenderClass(castMember.gender)}>
                      {getGenderIcon(castMember.gender)}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Original Name</span>
                    <span className={styles.metaValue}>
                      {castMember.original_name}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className={styles.noCast}>No cast information available</div>
        )}
      </ul>
    </div>
  );
}
