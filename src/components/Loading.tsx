import styles from "../styles/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loadingSpinner}>
        <div className={styles.spinner}></div>
        <div className={styles.loadingText}>Loading...</div>
        <div className={styles.loadingDots}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
}
