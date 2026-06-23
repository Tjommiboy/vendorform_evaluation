import styles from "./VendorForm.module.scss";

export function getScoreLevel(total) {
  if (total >= 90) return "Level A";
  if (total >= 75) return "Level B";
  if (total >= 60) return "Level C";
  return "Level D";
}

export default function TotalScore({ criteria, ratings }) {
  const total = criteria.reduce((acc, criterion, index) => {
    return acc + (ratings[index] * criterion.weight) / 5;
  }, 0);

  const cappedTotal = Math.min(100, total);
  const complete = ratings.every((rating) => rating > 0);
  const level = getScoreLevel(cappedTotal);
  const cls = complete
    ? level === "Level A"
      ? styles.levelA
      : level === "Level B"
        ? styles.levelB
        : level === "Level C"
          ? styles.levelC
          : styles.levelD
    : styles.incomplete;

  return (
    <div className={styles.totalScore}>
      <span className={styles.totalValue}>{cappedTotal.toFixed(1)}</span>
      <span className={styles.totalSuffix}>/ 100</span>
      <span className={`${styles.levelBadge} ${cls}`}>{level}</span>
    </div>
  );
}
