import React from "react";
import styles from "./styles.module.css";

type NewsSectionProps = {
  newsItems: {
    title: string;
    content: string;
    imageUrl: string; // Add image URL field
    altText: string;  // Add alternative text for accessibility
  }[];
};

const NewsSection: React.FC<NewsSectionProps> = ({ newsItems }) => {
  return (
    <section className={styles.newsSection}>
      <h2 className={styles.newsTitle}>News</h2>
      <div className={styles.newsCards}>
        {newsItems.map((item, index) => (
          <div className={styles.newsCard} key={index}>
            <img
              src={item.imageUrl}
              alt={item.altText}
              className={styles.newsImage}
            />
            <h3 className={styles.newsCardTitle}>{item.title}</h3>
            <p className={styles.newsCardText}>{item.content}</p>
            <button className={styles.newsButton}>Learn More</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;