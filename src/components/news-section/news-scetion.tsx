import React from "react";
import styles from "./styles.module.css";

// Define the props interface
interface NewsCardProps {
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
  linkUrl: string;
}

const WhiteNewsCard = (props: NewsCardProps) => {
  const handleButtonClick = () => {
    window.location.href = props.linkUrl;
  };
  return (
    <div className={styles.newsCardOuterContainer}>
      <div className={styles.whiteNewsCardContainer}>
        <img
          src={props.imageUrl}
          alt={props.altText}
          className={styles.newsCardImage}
        />
        <h4 className={styles.whiteNewsCardTitle}>{props.title}</h4>
        <p className={styles.whiteNewsCardDescription}>{props.description}</p>
      </div>
      <button className="button-white" onClick={handleButtonClick}>
        Learn More
      </button>
    </div>
  );
};

const GreenNewsCard = (props: NewsCardProps) => {
  const handleButtonClick = () => {
    window.location.href = props.linkUrl;
  };
  return (
    <div className={styles.newsCardOuterContainer}>
      <div className={styles.greenNewsCardContainer}>
        <img
          src={props.imageUrl}
          alt={props.altText}
          className={styles.newsCardImage}
        />
        <h4 className={styles.greenNewsCardTitle}>{props.title}</h4>
        <p className={styles.greenNewsCardDescription}>{props.description}</p>
      </div>
      <button className="button-white" onClick={handleButtonClick}>
        Learn More
      </button>
    </div>
  );
};

export { WhiteNewsCard, GreenNewsCard };
