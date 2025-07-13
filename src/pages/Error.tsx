import { Link } from "react-router";
import styles from "../styles/Error.module.css";

export default function Error() {
  return (
    <div className={styles.container}>
      <div className={styles.errorCard}>
        <div className={styles.errorIcon}>⚠️</div>
        <h1 className={styles.errorTitle}>Oops! Something went wrong</h1>
        <p className={styles.errorMessage}>
          We couldn't find the page you're looking for. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>
        <Link to="/" className={styles.homeButton}>
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
