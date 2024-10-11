"use client";

import React from "react";
import styles from "./styles.module.css";
import { Anton } from 'next/font/google';


const anton = Anton({
  weight: '400',
  subsets: ['latin'],
});

interface MainBannerProps {
  title: string;
  subtitle: string;
  subText: string;
  buttonText: string;
  linkUrl: string;
  note: string;
}

const MainBanner = (props: MainBannerProps) => {
  const handleButtonClick = () => {
    window.location.href = props.linkUrl;
  };
  return (
    <section className={styles.mainBanner}>
      <div className={styles.bannerContent}>
        <div className={styles.bannerTitleWrapper}>
          <h1 className={`${styles.bannerTitle} ${anton.className}`}>{props.title}</h1>
          <div className={styles.bannerBackground}>
            <h2 className={styles.bannerTitle2}>{props.subtitle}</h2>
            <p className={styles.bannerSubtitle}>{props.subText}</p>
            <button className="button-white" onClick={handleButtonClick}>
              {props.buttonText}
            </button>
            <p className={styles.bannerNote}>{props.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
