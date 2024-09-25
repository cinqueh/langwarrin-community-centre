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
  backLink?: string; 
}

const TitleCardWithBackButton = (props: TitleCardWithBackButtonProps) => {
    const { title, backLink = "/" } = props;
    return (
      <div className={styles.titleCardContainer}>
        <Link href={backLink}>
          <button className={styles.backButton}>
            <span className={styles.backIcon}>&lt;</span> Back
          </button>
        </Link>
        <h2>{title}</h2>
      </div>
    );
  };
  
export { GreenTitleCard, TitleCardWithBackButton, TitleCard };
