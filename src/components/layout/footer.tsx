"use client"; // Since you might need client-side interactivity

import React from "react";
import styles from "./styles.module.css";

interface FooterProps {
  contactTitle: string;
  contactPhone: string;
  contactEmail: string;
  contactButtonText: string;
  contactButtonLink: string;
  logoText: string;
  subText: string;
  memberButtonText: string;
  memberButtonLink: string;
  addressTitle: string;
  addressLine: string;
  openingDays: string;
  openingTimes: string;
  copyrightText: string;
}

const Footer = (props: FooterProps) => {
  const handleContactButtonClick = () => {
    window.location.href = props.contactButtonLink;
  };
  const handleMemberButtonClick = () => {
    window.location.href = props.memberButtonLink;
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.contactSection}>
          <h3 className={styles.contactTitle}>{props.contactTitle}</h3>
          <p className={styles.text}>{props.contactPhone}</p>
          <p className={styles.text}>{props.contactEmail}</p>
          <button
            className="button-white"
            style={{ marginTop: "10px" }}
            onClick={handleContactButtonClick}
          >
            {props.contactButtonText}
          </button>
        </div>

        <div className={styles.logoSection}>
          <h1 className={styles.logoText}>{props.logoText}</h1>
          <h2 className={styles.subText}>{props.subText}</h2>
          <button
            className="button-white"
            style={{ marginTop: "10px" }}
            onClick={handleMemberButtonClick}
          >
            {props.memberButtonText}
          </button>
        </div>

        <div className={styles.addressSection}>
          <h3 className={styles.addressTitle}>{props.addressTitle}</h3>
          <p className={styles.text}>{props.addressLine}</p>
          <p className={styles.text}>{props.openingDays}</p>
          <p className={styles.text}>{props.openingTimes}</p>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>{props.copyrightText}</p>
      </div>
    </footer>
  );
};

export default Footer;
