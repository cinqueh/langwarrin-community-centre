"use client";

import React, { useEffect, useState } from "react";

import styles from "./programs-card.module.css";

// Import the card components
import { MediumGreenProgramCard, LightGreenProgramCard } from "./programs-card";

// Define the ProgramInformation type
type ProgramInformation = {
  name: string;
  imageUrl: string;
  category: string;
  bookable: boolean;
};

type ProgramGridProps = {
  title: string;
  category: string;
};

const ProgramGrid: React.FC<ProgramGridProps> = ({ title, category }) => {
  const [programs, setPrograms] = useState<ProgramInformation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the programs data from the API using fetch
    fetch("/api/program")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPrograms(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching programs:", error);
        setLoading(false);
      });
  }, []);

  // Filter programs based on the category
  const filteredPrograms = programs.filter(
    (program) => program.category === category
  );

  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.programGrid}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredPrograms.map((program, index) =>
            index % 2 === 0 ? (
              <MediumGreenProgramCard
                key={program.name}
                title={program.name}
                imageUrl={program.imageUrl}
                altText={program.name}
                linkUrl={`/programs/${program.name}`}
              />
            ) : (
              <LightGreenProgramCard
                key={program.name}
                title={program.name}
                imageUrl={program.imageUrl}
                altText={program.name}
                linkUrl={`/programs/${program.name}`}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default ProgramGrid;
