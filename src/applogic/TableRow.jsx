import StarRating from "./StarRating";
import styles from "./VendorForm.module.scss";

export default function TableRow({
  data,
  rating,
  rowRef,
  onRate,
  onCategoryChange,
  onWeightChange,
  onItemChange,
  onAddItem,
  onRemoveItem,
  onRemoveCategory,
}) {
  const weighted = rating === 0 ? "—" : ((rating * data.weight) / 5).toFixed(1);

  return (
    <tr ref={rowRef} className={styles.tableRow}>
      <td>
        <div className={styles.inputGroup}>
          <label className={styles.fieldLabel}>Category</label>
          <input
            className={styles.tableInput}
            value={data.name}
            onChange={(event) => onCategoryChange("name", event.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.fieldLabel}>Subheader</label>
          <input
            className={styles.tableInput}
            value={data.sub}
            onChange={(event) => onCategoryChange("sub", event.target.value)}
          />
        </div>

        <div className={styles.categoryControls}>
          <button
            type="button"
            className={styles.smallButton}
            onClick={onRemoveCategory}
          >
            Remove category
          </button>
        </div>
      </td>

      <td className={styles.weightCell}>
        <label className={styles.fieldLabel}>Weight</label>
        <input
          type="number"
          min="0"
          className={styles.weightInput}
          value={data.weight}
          onChange={(event) => onWeightChange(event.target.value)}
        />
      </td>

      <td>
        <div className={styles.criteriaList}>
          {data.items.map((item, i) => (
            <div key={i} className={styles.criteriaItem}>
              <input
                className={styles.criteriaInput}
                value={item}
                onChange={(event) => onItemChange(i, event.target.value)}
              />
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => onRemoveItem(i)}
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            className={styles.addButton}
            onClick={onAddItem}
          >
            Add item
          </button>
        </div>
      </td>

      <td className={styles.ratingCell}>
        <StarRating rating={rating} onRate={onRate} />
      </td>

      <td className={styles.weightedCell}>{weighted}</td>
    </tr>
  );
}
