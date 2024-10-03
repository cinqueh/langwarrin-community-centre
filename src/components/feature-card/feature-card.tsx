"use client";

import React from "react";
import styles from "./styles.module.css";

// Define the props interface
interface ProgramCardProps {
  imageUrl: string;
  altText: string;
  title: string;
  linkUrl: string;
}

const WhiteFeatureCard = (props: ProgramCardProps) => {
  const handleButtonClick = () => {
    window.location.href = props.linkUrl;
  };
  return (
    <div className={styles.featureCardContainer}>
      <h4>{props.title}</h4>
      <img src={props.imageUrl} alt={props.altText} />
      <button className="button-green" onClick={handleButtonClick}>
        Learn More
      </button>
    </div>
  );
};

export default WhiteFeatureCard;
