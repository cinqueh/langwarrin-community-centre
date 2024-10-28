import React from "react";
import styles from "./styles.module.css";

interface InformationCardProps {
  title?: string;
  description?: string;
  titleAlignment?: "left" | "center";
  descriptionAlignment?: "left" | "center";
  colorScheme?: "darkGreen" | "mediumGreen" | "lightGreen" | "white";
  minHeight?: string; 
}

const InformationCard = (props: InformationCardProps) => {
  const {
    title,
    description,
    titleAlignment = "left",
    descriptionAlignment = "left",
    colorScheme = "mediumGreen",
    minHeight = "auto",
  } = props;

  const containerClass =
    colorScheme === "darkGreen"
      ? styles.darkGreenInformationContainer
      : colorScheme === "lightGreen"
      ? styles.lightGreenInformationContainer
      : colorScheme === "white"
      ? styles.whiteInformationContainer
      : styles.mediumGreenInformationContainer;

  return (
    <div className={containerClass} style={{ minHeight }}>
      <div className={styles.textContent}>
        {title && <h3 style={{ textAlign: titleAlignment }}>{title}</h3>}
        {description && (
          <div className={styles.description}>
            <p
              style={{ textAlign: descriptionAlignment }}
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </div>
        )}
      </div>
    </div>
  );
};

interface InformationCardWithButtonProps extends InformationCardProps {
  buttonText: string;
  linkUrl: string;
}

const InformationCardWithButton = (props: InformationCardWithButtonProps) => {
  const {
    title,
    description,
    titleAlignment = "left",
    descriptionAlignment = "left",
    colorScheme = "mediumGreen",
    buttonText,
    linkUrl,
    minHeight = "auto",
  } = props;

  const containerClass =
    colorScheme === "darkGreen"
      ? styles.darkGreenInformationContainer
      : colorScheme === "lightGreen"
      ? styles.lightGreenInformationContainer
      : colorScheme === "white"
      ? styles.whiteInformationContainer
      : styles.mediumGreenInformationContainer;

  const isExternalLink = (url: string) =>
    url.startsWith("http") || url.startsWith("//");

  const handleButtonClick = () => {
    if (isExternalLink(linkUrl)) {
      window.open(linkUrl, "_blank"); // Opens in a new tab for external links
    } else {
      window.location.href = linkUrl; // Internal links open in the same tab
    }
  };

  return (
    <div className={containerClass} style={{ minHeight }}>
      <div className={styles.contentWrapper}>
        <div className={styles.textContent}>
          {title && <h3 style={{ textAlign: titleAlignment }}>{title}</h3>}
          {description && (
            <div
              className={styles.description}
              style={{ textAlign: descriptionAlignment }}
            >
              <p dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
          )}
        </div>
        <div className={styles.buttonRight}>
          <button className="button-white" onClick={handleButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export { InformationCard, InformationCardWithButton };
