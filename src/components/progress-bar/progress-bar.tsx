"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface ProgressBarProps {
  steps: { label: string; link: string }[];
  currentStepIndex: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStepIndex,
}) => {
  const [isConfirmationEnabled, setIsConfirmationEnabled] = useState(false);

  useEffect(() => {
    const roomBookingData = localStorage.getItem("roomBookingData");
    const personalDetailsFormData = localStorage.getItem(
      "personalDetailsFormData"
    );
    const additionalInfoFormData = localStorage.getItem(
      "AdditionalInfoFormData"
    );

    if (roomBookingData && personalDetailsFormData && additionalInfoFormData) {
      setIsConfirmationEnabled(true);
    }
  }, []);

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
            <a href={step.link} className={styles.stepLink}>
              <div className={styles.stepCircle}>{index + 1}</div>
            </a>
            <span className={styles.stepLabel}>{step.label}</span>
          </li>
        ))}

        {/* Hardcoded Confirmation Step */}
        <li
          className={`${styles.stepItem} ${
            currentStepIndex === steps.length + 1 ? styles.activeStep : ""
          }`}
        >
          {isConfirmationEnabled ? (
            <a
              href="/request-a-room/confirmation-form"
              className={styles.stepLink}
            >
              <div className={styles.stepCircle}>{steps.length + 1}</div>
            </a>
          ) : (
            <div className={styles.disabledStep}>
              <div className={styles.stepCircle}>{steps.length + 1}</div>
            </div>
          )}
          <span
            className={`${styles.stepLabel} ${
              !isConfirmationEnabled ? styles.disabledLink : ""
            }`}
          >
            Confirmation
          </span>
        </li>
      </ul>
    </div>
  );
};

export { ProgressBar };
