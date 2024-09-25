"use client"; // Since you might need client-side interactivity

import React from "react";
import styles from "./styles.module.css";

interface ProgramImageCardProps {
  imageUrl: string;
  altText: string;
}

// image card with padding
const ProgramImageCard = (props: ProgramImageCardProps) => {
  return (
    <div className={styles.programImageCardContainer}>
      <img src={props.imageUrl} alt={props.altText} />
    </div>
  );
};

// image card without padding
const ImageCard = (props: ProgramImageCardProps) => {
  return (
    <div className={styles.imageCardContainer}>
      <img src={props.imageUrl} alt={props.altText} />
    </div>
  );
};

export { ProgramImageCard, ImageCard };
