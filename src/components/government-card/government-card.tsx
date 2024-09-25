"use client";

import React from "react";
import styles from "./styles.module.css";

interface GovernmentCardProps {
    title: string;
    subheading: string;
    image1: string;
    altText1: string;
    image2: string;
    altText2: string;
    image3: string;
    altText3: string;
    image4: string;
    altText4: string;
    image5: string;
    altText5: string;
    image6: string;
    altText6: string;
    list?: string; 
  }
  
  const GovernmentCard: React.FC<GovernmentCardProps> = ({
    title,
    subheading,
    image1,
    altText1,
    image2,
    altText2,
    image3,
    altText3,
    image4,
    altText4,
    image5,
    altText5,
    image6,
    altText6,
    list = "", 
  }) => {
    return (
      <div className={styles.governmentCardContainer}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.subheading}>{subheading}</h4>
        <div className={styles.contentContainer}>
          <div className={styles.imageGrid}>
            <img src={image1} alt={altText1} className={styles.gridImage} />
            <img src={image2} alt={altText2} className={styles.gridImage} />
            <img src={image3} alt={altText3} className={styles.gridImage} />
            <img src={image4} alt={altText4} className={styles.gridImage} />
            <img src={image5} alt={altText5} className={styles.gridImage} />
            <img src={image6} alt={altText6} className={styles.gridImage} />
          </div>

          {list && (
            <div className={styles.listParagraph}>
              <p dangerouslySetInnerHTML={{ __html: list }}></p>
            </div>
          )}
        </div>
      </div>
    );
  };
  

export { GovernmentCard };
