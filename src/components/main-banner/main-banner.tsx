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
  
  const MainBanner = (props: MainBannerProps) => {
    return (
      <section className={styles.mainBanner}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerTitleWrapper}>
            <h1 className={styles.bannerTitle}>{props.title}</h1>
            <div className={styles.bannerBackground}>
              <h2 className={styles.bannerTitle2}>{props.subtitle}</h2>
              <p className={styles.bannerSubtitle}>{props.subText}</p>
              <button className="button-white">{props.buttonText}</button>
              <p className={styles.bannerNote}>{props.note}</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default MainBanner;
