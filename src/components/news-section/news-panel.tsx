"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { GreenTitleCard } from "../title-card/title-card";

// Import the card components
import { GreenNewsCard, WhiteNewsCard } from "./news-scetion";

// Define the NewsInformation type
type NewsInformation = {
  name: string;
  imageUrl: string;
  url: string;
  altText: string;
};

type NewsPanelProps = {
  title: string;
};

const NewsGrid: React.FC<NewsPanelProps> = ({ title }) => {
  const [news, setNews] = useState<NewsInformation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the news data from the API using fetch
    fetch("/api/news")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <GreenTitleCard title={title}></GreenTitleCard>
      <div className={styles.newsGrid}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          news.map((item, index) => {
            const isGreenCard = index % 3 === 1;
            return isGreenCard ? (
              <GreenNewsCard
                key={`${item.name}-${index}`}
                title={item.name}
                imageUrl={item.imageUrl}
                altText={item.name}
                linkUrl={item.url}
              />
            ) : (
              <WhiteNewsCard
                key={`${item.name}-${index}`}
                title={item.name}
                imageUrl={item.imageUrl}
                altText={item.name}
                linkUrl={item.url}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default NewsGrid;
