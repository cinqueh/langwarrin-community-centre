"use client";

import React from "react";
import styles from "./styles.module.css";

interface MainBannerProps {
  title: string;
  subtitle: string;
  subText: string;
  buttonText: string;
  note: string;
}

const MainBanner: React.FC<MainBannerProps> = ({
  title,
  subtitle,
  subText,
  buttonText,
  note,
}) => {
  return (
    <section className={styles.mainBanner}>
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>{title}</h1>
        <h1 className={styles.bannerTitle2}>{subtitle}</h1>
        <p className={styles.bannerSubtitle}>{subText}</p>
        <button className={styles.joinButton}>{buttonText}</button>
        <p className={styles.bannerNote}>{note}</p>
      </div>
    </section>
  );
};

export default MainBanner;
