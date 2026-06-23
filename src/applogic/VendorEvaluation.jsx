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
  const activeAssessmentLevel =
    activeLevel === "Level D" && total < 20 ? "" : activeLevel;
  const activeCriteriaLevel =
    total >= 90
      ? 5
      : total >= 75
      ? 4
      : total >= 60
      ? 3
      : total >= 20
      ? 2
      : 1;

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

          </div>

          <div className={styles.instructions}>
            <p className={styles.instructionsTitle}>Scoring guidance</p>
            <div className={`${styles.instructionsSection} ${styles.assessmentContainer}`}>
              <p className={styles.instructionsSectionTitle}>Assessment result level (Overall Rating)</p>

              <div className={styles.subSection}>
                <p className={styles.subSectionTitle}>Scoring Criteria</p>
                <div className={styles.assessmentLevelList}>
                  {[
                    {
                      level: 5,
                      label: "Excellent",
                      description:
                        "Exceeds expectations, Outstanding performance, Creates added value",
                      className: styles.highlightLevelA,
                    },
                    {
                      level: 4,
                      label: "Good",
                      description: "Meets expectations, Consistent performance",
                      className: styles.highlightLevelB,
                    },
                    {
                      level: 3,
                      label: "Average",
                      description: "Fair, Some issues need monitoring",
                      className: styles.highlightLevelC,
                    },
                    {
                      level: 2,
                      label: "Needs improvement",
                      description: "Below expectations, Requires improvement",
                      className: styles.highlightLevelD,
                    },
                    {
                      level: 1,
                      label: "Fails",
                      description: "Does not meet requirements, High risk",
                      className: styles.highlightLevelE,
                    },
                  ].map((item) => {
                    const isActive = activeCriteriaLevel === item.level;
                    return (
                      <div
                        key={item.level}
                        className={`${styles.assessmentLevelItem} ${
                          isActive ? item.className : ""
                        } ${styles.compactCriteriaCard}`}
                      >
                        <div className={styles.assessmentLevelHeading}>
                          <span className={styles.assessmentLevelName}>{item.label}</span>
                        </div>
                        <p className={styles.instructionsText}>{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.assessmentLevelList}>
                {[
                  {
                    name: "Level A",
                    range: "90 - 100",
                    label: "Partner",
                    description: "Strategic business alliance",
                  },
                  {
                    name: "Level B",
                    range: "75 - 89",
                    label: "Preferred",
                    description: "Reliable main seller",
                  },
                  {
                    name: "Level C",
                    range: "60 - 74",
                    label: "Developing",
                    description: "Must develop and follow up.",
                  },
                  {
                    name: "Level D",
                    range: "20 - 59",
                    label: "At Risk",
                    description: "Does not pass the criteria / consider adjusting the plan.",
                  },
                ].map((level) => {
                  const levelClass =
                    activeAssessmentLevel === level.name
                      ? styles[`highlight${level.name.replace(/\s+/g, "")}`]
                      : styles.assessmentLevelItem;
                  return (
                    <div
                      key={level.name}
                      className={`${styles.assessmentLevelItem} ${levelClass}`}
                    >
                      <div className={styles.assessmentLevelHeading}>
                        <span className={styles.assessmentLevelName}>{level.name}</span>
                        <span className={styles.assessmentLevelBadge}>{level.label}</span>
                      </div>
                      <div>
                        <p className={styles.assessmentLevelRange}>{level.range}</p>
                        <p className={styles.instructionsText}>{level.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.subSection}>
                <p className={styles.subSectionTitle}>Action Plan</p>
                <div className={styles.assessmentLevelList}>
                  {[
                    {
                      name: "Level A",
                      label: "Partner",
                      description:
                        "Maintain ongoing collaboration and develop a long-term joint project.",
                    },
                    {
                      name: "Level B",
                      label: "Preferred",
                      description:
                        "Promote development in areas where there are shortcomings and follow up periodically.",
                    },
                    {
                      name: "Level C",
                      label: "Developing",
                      description:
                        "Develop a Corrective Action Plan, setting goals and timelines.",
                    },
                    {
                      name: "Level D",
                      label: "At Risk",
                      description:
                        "Issue a formal warning / Consider measures to reduce risk or terminate the vendor relationship.",
                    },
                  ].map((plan) => {
                    const planClass =
                      activeLevel === plan.name &&
                      (plan.name !== "Level D" || total >= 20)
                        ? styles[`highlight${plan.name.replace(/\s+/g, "")}`]
                        : styles.assessmentLevelItem;
                    return (
                      <div
                        key={plan.name}
                        className={`${styles.assessmentLevelItem} ${planClass}`}
                      >
                        <div className={styles.assessmentLevelHeading}>
                          <span className={styles.assessmentLevelName}>{plan.name}</span>
                          <span className={styles.assessmentLevelBadge}>{plan.label}</span>
                        </div>
                        <p className={styles.instructionsText}>{plan.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
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
