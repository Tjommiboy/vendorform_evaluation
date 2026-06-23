import TableRow from "./TableRow";
import styles from "./VendorForm.module.scss";

export default function EvaluationTable({
  criteria,
  ratings,
  scrollTargetRow,
  rowRef,
  onRate,
  onCategoryChange,
  onWeightChange,
  onItemChange,
  onAddItem,
  onRemoveItem,
  onRemoveCategory,
}) {
  return (
    <section className={styles.tableSection}>
      <table className={styles.criteriaTable}>
        <thead>
          <tr>
            <th className={styles.categoryHeader}>Category</th>
            <th className={styles.weightHeader}>Weight</th>
            <th className={styles.criteriaHeader}>Criteria</th>
            <th className={styles.ratingHeader}>Rating</th>
            <th className={styles.scoreHeader}>Score</th>
          </tr>
        </thead>

        <tbody>
          {criteria.map((c, i) => (
            <TableRow
              key={i}
              row={i}
              data={c}
              rating={ratings[i]}
              rowRef={i === scrollTargetRow ? rowRef : null}
              onRate={(value) => onRate(i, value)}
              onCategoryChange={(field, value) =>
                onCategoryChange(i, field, value)
              }
              onWeightChange={(value) => onWeightChange(i, value)}
              onItemChange={(itemIndex, value) =>
                onItemChange(i, itemIndex, value)
              }
              onAddItem={() => onAddItem(i)}
              onRemoveItem={(itemIndex) => onRemoveItem(i, itemIndex)}
              onRemoveCategory={() => onRemoveCategory(i)}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
