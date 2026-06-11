import styles from "./VendorForm.module.scss";

export default function StarRating({ rating, onRate }) {
  return (
    <div className={styles.starGroup}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${styles.star} ${star <= rating ? styles.active : ""}`}
          onClick={() => onRate(star)}
          aria-label={`Rate ${star}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
