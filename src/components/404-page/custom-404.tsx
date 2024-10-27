import styles from "./styles.module.css";

const Custom404 = () => {
  return (
    <div className={styles.custom404Container}>
      <h2 className={styles.custom404Title}>404 - Page Not Found</h2>
      <p className={styles.custom404Text}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <button className="button-green">
        <a href="/home" className={styles.custom404Link}>Return Home</a>
      </button>
    </div>
  );
};

export { Custom404 };
