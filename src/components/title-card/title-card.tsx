"use client"; // Since you might need client-side interactivity

import React from "react";
import styles from "./styles.module.css"; // Importing the CSS Module

interface TitleCardProps {
  title: string;
}

const GreenTitleCard = (props: TitleCardProps) => {
  return (
    <div className={styles.greenTitleContainer}>
      <h3>{props.title}</h3>
    </div>
  );
};

export { GreenTitleCard };
