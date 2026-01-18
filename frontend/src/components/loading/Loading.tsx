import styles from './Loading.module.css';

export default function Loading () {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.dotsLoader}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};