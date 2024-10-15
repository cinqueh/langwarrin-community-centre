"use client"; // Since you might need client-side interactivity

import Link from "next/link";
import React from "react";
import styles from "./styles.module.css"; // Importing the CSS Module

interface TitleCardProps {
  title: string;
}

// green text no background 
const GreenTitleCard = (props: TitleCardProps) => {
  return (
    <div className={styles.greenTitleContainer}>
      <h3>{props.title}</h3>
    </div>
  );
};

const TitleCard = (props: TitleCardProps) => {
  return (
    <div className={styles.titleCardContainer}>
      <h2>{props.title}</h2>
    </div>
  );
};

interface TitleCardWithBackButtonProps {
  title: string;
  backLink: string; 
}

const TitleCardWithBackButton = (props: TitleCardWithBackButtonProps) => {
  return (
    <div className={styles.titleCardWithButtonContainer}>
      <div className={styles.leftColumn}>
          <a href={props.backLink}>
            <button className={styles.backButton}>
              <span className={styles.backIcon}>&lt;</span> Back
            </button>
          </a>
      </div>
      <div className={styles.rightColumn}>
        <h2 className={styles.title}>{props.title}</h2>
      </div>
    </div>
  );
};

const ProgramTitleCard = TitleCardWithBackButton

export { GreenTitleCard, TitleCardWithBackButton, TitleCard, ProgramTitleCard };
