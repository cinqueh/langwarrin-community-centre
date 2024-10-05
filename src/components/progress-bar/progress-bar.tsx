"use client";

import React from "react";
import styles from "./styles.module.css";

interface ProgressBarProps {
  steps: { label: string; link: string }[];
  currentStepIndex: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStepIndex,
}) => {
  return (
    <div className={styles.progressBarContainer}>
      <ul className={styles.progressBar}>
        {steps.map((step, index) => (
          <li
            key={index}
            className={`${styles.stepItem} ${
              index + 1 === currentStepIndex ? styles.activeStep : ""
            }`}
          >
            <div className={styles.stepCircle}>{index + 1}</div>
            <span className={styles.stepLabel}>{step.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ProgressBar };
