import { Link } from "react-router";
import styles from "../styles/NoteFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.notFoundCard}>
        <div className={styles.notFoundIcon}>🔍</div>
        <h1 className={styles.notFoundTitle}>404 - Page Not Found</h1>
        <p className={styles.notFoundMessage}>
          The page you're looking for doesn't exist. It might have been moved,
          deleted, or you entered the wrong URL.
        </p>
        <Link to="/" className={styles.homeButton}>
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
