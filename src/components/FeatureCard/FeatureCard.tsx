"use client";

import React from "react";
import Image from "next/image"; // Import Next.js Image component for optimized rendering
import styles from "./styles.module.css";

// Define the props interface
interface FeatureSectionProps {
  features: {
    title: string;
    imageUrl: string;
    altText: string;
    buttonText: string;
  }[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ features }) => {
  return (
    <section className={styles.featureSection}>
      {features.map((feature, index) => (
        <div className={styles.featureCard} key={index}>
          <h3 className={styles.featureTitle}>{feature.title}</h3>
          <img
            src={feature.imageUrl}
            alt={feature.altText}
            className={styles.featureImage}
          />
          <button className={styles.featureButton}>{feature.buttonText}</button>
        </div>
      ))}
    </section>
  );
};

export default FeatureSection;