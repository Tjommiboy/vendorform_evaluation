import { useEffect, useRef, useState } from "react";
import { criteriaData } from "./vendorData";
import EvaluationTable from "./EvaluationTable";
import TotalScore, { getScoreLevel } from "./TotalScore";
import styles from "./VendorForm.module.scss";

export default function VendorEvaluation() {
  const [categories, setCategories] = useState(criteriaData);
  const [ratings, setRatings] = useState(
    new Array(criteriaData.length).fill(0),
  );
  const [formDetails, setFormDetails] = useState({
    vendorCode: "",
    evaluator: "",
    vendorName: "",
    position: "",
    evaluationPeriod: "",
    evaluationDate: "",
  });
  const [scrollTargetRow, setScrollTargetRow] = useState(null);
  const newCategoryRef = useRef(null);

  useEffect(() => {
    if (ratings.length !== categories.length) {
      setRatings(new Array(categories.length).fill(0));
    }
  }, [categories.length]);

  const handleRating = (row, value) => {
    const updated = [...ratings];
    updated[row] = value;
    setRatings(updated);
  };

  const handleFormDetailChange = (field, value) => {
    setFormDetails((current) => ({ ...current, [field]: value }));
  };

  const updateCategory = (row, field, value) => {
    setCategories((current) =>
      current.map((item, index) =>
        index === row ? { ...item, [field]: value } : item,
      ),
    );
  };

  const updateCriteriaItem = (row, itemIndex, value) => {
    setCategories((current) =>
      current.map((item, index) => {
        if (index !== row) return item;
        const updatedItems = [...item.items];
        updatedItems[itemIndex] = value;
        return { ...item, items: updatedItems };
      }),
    );
  };

  const updateWeight = (row, value) => {
    const weight = Number(value);
    setCategories((current) =>
      current.map((item, index) =>
        index === row
          ? { ...item, weight: Number.isNaN(weight) ? item.weight : weight }
          : item,
      ),
    );
  };

  const addCriteriaItem = (row) => {
    setCategories((current) =>
      current.map((item, index) =>
        index === row ? { ...item, items: [...item.items, ""] } : item,
      ),
    );
  };

  const removeCriteriaItem = (row, itemIndex) => {
    setCategories((current) =>
      current.map((item, index) => {
        if (index !== row) return item;
        const updatedItems = item.items.filter((_, i) => i !== itemIndex);
        return { ...item, items: updatedItems };
      }),
    );
  };

  const addCategory = () => {
    setCategories((current) => {
      setScrollTargetRow(current.length);
      return [
        ...current,
        {
          name: "New category",
          sub: "(Category detail)",
          weight: 10,
          items: ["New criterion"],
        },
      ];
    });
  };

  const removeCategory = (row) => {
    setCategories((current) => current.filter((_, index) => index !== row));
  };

  const resetForm = () => {
    if (!window.confirm("Reset all ratings?")) return;
    setRatings(new Array(categories.length).fill(0));
  };

  const total = categories.reduce(
    (acc, criterion, index) => acc + (ratings[index] * criterion.weight) / 5,
    0,
  );

  useEffect(() => {
    if (scrollTargetRow !== null) {
      newCategoryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      setScrollTargetRow(null);
    }
  }, [scrollTargetRow]);
  const complete = ratings.every((rating) => rating > 0);
  const activeLevel = getScoreLevel(total);

  return (
    <div className={styles.page}>
      <header className={styles.formHeader}>
        <div>
          <p className={styles.overline}>Vendor evaluation</p>
          <h1 className={styles.title}>
            Evaluation for Improvement, Collaboration, and Mutual Success
          </h1>
          <div className={styles.headerFields}>
            <label className={styles.headerField}>
              <span>Vendor Code</span>
              <input
                className={styles.headerInput}
                type="text"
                value={formDetails.vendorCode}
                onChange={(event) =>
                  handleFormDetailChange("vendorCode", event.target.value)
                }
                placeholder="Enter vendor code"
              />
            </label>
            <label className={styles.headerField}>
              <span>Evaluator</span>
              <input
                className={styles.headerInput}
                type="text"
                value={formDetails.evaluator}
                onChange={(event) =>
                  handleFormDetailChange("evaluator", event.target.value)
                }
                placeholder="Enter evaluator name"
              />
            </label>
            <label className={styles.headerField}>
              <span>Vendor Name</span>
              <input
                className={styles.headerInput}
                type="text"
                value={formDetails.vendorName}
                onChange={(event) =>
                  handleFormDetailChange("vendorName", event.target.value)
                }
                placeholder="Enter vendor name"
              />
            </label>
            <label className={styles.headerField}>
              <span>Position</span>
              <input
                className={styles.headerInput}
                type="text"
                value={formDetails.position}
                onChange={(event) =>
                  handleFormDetailChange("position", event.target.value)
                }
                placeholder="Enter position"
              />
            </label>
            <label className={styles.headerField}>
              <span>Evaluation Period</span>
              <input
                className={styles.headerInput}
                type="text"
                value={formDetails.evaluationPeriod}
                onChange={(event) =>
                  handleFormDetailChange("evaluationPeriod", event.target.value)
                }
                placeholder="Enter evaluation period"
              />
            </label>
            <label className={styles.headerField}>
              <span>Evaluation Date</span>
              <input
                className={styles.headerInput}
                type="text"
                value={formDetails.evaluationDate}
                onChange={(event) =>
                  handleFormDetailChange("evaluationDate", event.target.value)
                }
                placeholder="Enter evaluation date"
              />
            </label>
          </div>
        </div>

        <div className={styles.summaryPanel}>
          <p className={styles.summaryLabel}>How it works</p>
          <p className={styles.summaryText}>
            Select a score from 1 to 5 in each category. The form calculates the
            weighted score automatically and highlights your vendor level.
          </p>
        </div>
      </header>

      <div className={styles.formActions}>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          type="button"
          onClick={addCategory}
        >
          Add category
        </button>
        <div className={styles.weightSummary}>
          Total weight:{" "}
          {categories.reduce((sum, item) => sum + Number(item.weight), 0)}%
        </div>
      </div>

      <EvaluationTable
        criteria={categories}
        ratings={ratings}
        scrollTargetRow={scrollTargetRow}
        rowRef={newCategoryRef}
        onRate={handleRating}
        onCategoryChange={updateCategory}
        onWeightChange={updateWeight}
        onItemChange={updateCriteriaItem}
        onAddItem={addCriteriaItem}
        onRemoveItem={removeCriteriaItem}
        onRemoveCategory={removeCategory}
      />

      <div className={styles.detailsRow}>
        <div className={styles.scoreCard}>
          <div className={styles.scoreSummaryRow}>
            <div className={styles.scoreSummaryMain}>
              <span className={styles.scoreLabel}>Total weighted score</span>
              <TotalScore criteria={categories} ratings={ratings} />
            </div>

            <div className={styles.levelChartInline}>
              <p className={styles.chartTitle}>Score levels</p>
              <ul className={styles.levelListInline}>
                {[
                  { name: "Level A", range: "90–100" },
                  { name: "Level B", range: "75–89" },
                  { name: "Level C", range: "60–74" },
                  { name: "Level D", range: "0–59" },
                ].map((item) => {
                  const activeClass =
                    activeLevel === item.name
                      ? styles[`active${item.name.replace(/\s+/g, "")}`]
                      : "";
                  return (
                    <li
                      key={item.name}
                      className={`${styles.levelItemInline} ${activeClass}`}
                    >
                      <span className={styles.levelName}>{item.name}</span>
                      <span className={styles.levelRange}>{item.range}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.instructions}>
          <p className={styles.instructionsTitle}>Scoring guidance</p>
          <p>
            Use the weighted totals to identify risk and opportunity. A higher
            score indicates stronger overall performance and consistency.
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${styles.btnReset}`}
          onClick={resetForm}
        >
          Reset
        </button>
        <button
          className={`${styles.btn} ${styles.btnOutline}`}
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>
    </div>
  );
}
