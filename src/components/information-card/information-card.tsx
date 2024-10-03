"use client"; // Since you might need client-side interactivity

import React from "react";
import styles from "./styles.module.css";

interface InformationCardTitleProps {
  title: string;
}

// Information Card Title Component
const LightGreenInformationCardTitle = (props: InformationCardTitleProps) => {
  return (
    <div className={styles.lightGreenInformationContainer}>
      <h3>{props.title}</h3>
    </div>
  );
};

const DarkGreenInformationCardTitle = (props: InformationCardTitleProps) => {
  return (
    <div className={styles.darkGreenInformationContainer}>
      <h3>{props.title}</h3>
    </div>
  );
};

interface InformationCardProps {
  title: string;
  description: string;
  titleAlignment?: "left" | "center";
  height?: string;
}
const WhiteInformationCard = (props: InformationCardProps) => {
  const {
    title,
    description,
    titleAlignment = "left",
    height = "auto",
  } = props;

  return (
    <div className={styles.whiteInformationContainer}>
      {/* Conditionally render <h4> only if the title is not empty */}
      {title && (
        <h4 className={styles.title} style={{ textAlign: titleAlignment }}>
          {title}
        </h4>
      )}
      <div className={styles.description} style={{ height }}>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    </div>
  );
};

const LightGreenInformationCard = (props: InformationCardProps) => {
  const {
    title,
    description,
    titleAlignment = "left",
    height = "auto",
  } = props;

  return (
    <div
      className={styles.lightGreenInformationContainer}
      // Set height dynamically from props
    >
      {/* Conditionally render <h4> only if the title is not empty */}
      {title && <h4 style={{ textAlign: titleAlignment }}>{title}</h4>}
      <div className={styles.description} style={{ height }}>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    </div>
  );
};

const MediumGreenInformationCard = (props: InformationCardProps) => {
  const {
    title,
    description,
    titleAlignment = "left",
    height = "auto",
  } = props;

  return (
    <div
      className={styles.mediumGreenInformationContainer}
      // Set height dynamically from props
    >
      {/* Conditionally render <h4> only if the title is not empty */}
      {title && <h4 style={{ textAlign: titleAlignment }}>{title}</h4>}
      <div className={styles.description} style={{ height }}>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    </div>
  );
};

const DarkGreenInformationCard = (props: InformationCardProps) => {
  const {
    title,
    description,
    titleAlignment = "left",
    height = "auto",
  } = props;

  return (
    <div className={styles.darkGreenInformationContainer}>
      {title && <h4 style={{ textAlign: titleAlignment }}>{title}</h4>}
      <div className={styles.description} style={{ height }}>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    </div>
  );
};

interface InformationCardWithButtonProps {
  title: string;
  description?: string;
  buttonText: string;
  linkUrl: string;
}

const InformationCardWithButton = (props: InformationCardWithButtonProps) => {
  const isExternalLink = (url: string) => {
    return url.startsWith("http") || url.startsWith("//"); 
  };
  const handleButtonClick = () => {
    if (isExternalLink(props.linkUrl)) {
      window.open(props.linkUrl, "_blank"); // Opens in a new tab for external links
    } else {
      window.location.href = props.linkUrl; // Internal links open in the same tab
    }
  };
  return (
    <div className={styles.lightGreenInformationContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.textContent}>
          {props.title && <h4>{props.title}</h4>}
          {/* Conditionally render the description only if it exists */}
          {props.description && (
            <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button className="button-white" onClick={handleButtonClick}>
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export {
  LightGreenInformationCardTitle,
  DarkGreenInformationCardTitle,
  WhiteInformationCard,
  LightGreenInformationCard,
  MediumGreenInformationCard,
  DarkGreenInformationCard,
  InformationCardWithButton,
};
