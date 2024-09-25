"use client";

import React from "react";
import styles from "./styles.module.css"; // Import your CSS Module for styling

interface BackgroundSectionProps {
  imageUrl: string;
  altText: string;
}

const BackgroundSection = (props: BackgroundSectionProps) => {
  return (
    <div className={styles.backgroundSection}>
      <img
        src={props.imageUrl}
        alt={props.altText}
        style={{ width: "100%", height: "auto" }} 
      />
    </div>
  );
};

export default BackgroundSection;