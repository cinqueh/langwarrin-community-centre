"use client";

import React from "react";
import Image from "next/image"; // Import Next.js Image component for optimized rendering
import styles from "./styles.module.css"; // Import your CSS Module for styling

interface BackgroundSectionProps {
  imageUrl: string;
  altText: string;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({
  imageUrl,
  altText,
}) => {
  return (
    <div className={styles.backgroundSection}>
      <Image
        src={imageUrl} // Use the URL passed from the props
        alt={altText} // Use the alt text passed from the props
        layout="responsive"
        width={1920} // Set appropriate width based on your design
        height={600} // Set appropriate height based on your design
        priority // Loads the image with high priority
      />
    </div>
  );
};

export default BackgroundSection;