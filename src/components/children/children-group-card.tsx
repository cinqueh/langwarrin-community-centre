"use client"; // Since you might need client-side interactivity

import React from "react";
import styles from "./styles.module.css"; // Importing the CSS Module

interface TitleProps {
  pageTitle: string;
}

interface CommunityChildcareCardProps {
  imageUrl: string;
  altText: string;

  title: string;
  subtitle: string;
  description: string;
}

interface ActivityCardProps {
  activity1Title: string;
  activity1Description: string;
  activity2Title: string;
  activity2Description: string;
}

interface ParentsInfoCardProps {
  information1title: string;
  information1link: string;
  information2title: string;
  information2link: string;
  information3title: string;
  information3link: string;
}

interface ProgramProps {
  pageTitle: string;
  childcareInfoTitle: string;
  childcareInfoDescription: string;
  costTitle: string;
  costDescription: string;
  program1Title: string;
  program1Description: string;
  program2Title: string;
  program2Description: string;
}

interface ImageCardProps {
  imageUrl1: string;
  altText1: string;

  imageUrl2: string;
  altText2: string;
}

interface YouthGroupCardProps {
  imageUrl1: string;
  altText1: string;

  infoTitle: string;
  infoDescription: string;
}

// the title block
const TitleCard = (props: TitleProps) => {
  return (
    <div className={styles.titleCardContainer}>
      <h1 className={styles.title}>{props.pageTitle}</h1>
    </div>
  );
};

// community childcare block
const CommunityChildcareCard = (props: CommunityChildcareCardProps) => {
  return (
    <div className={styles.communityChildcareContainer}>
      <div className={styles.communityChildcareImageContainer}>
        <img
          src={props.imageUrl}
          alt={props.altText}
          className={styles.communityChildcareImage}
        />
      </div>
      <div className={styles.communityChildcareContent}>
        <h2 className={styles.communityChildcareHeader}>{props.title}</h2>
        <h2 className={styles.communityChildcareSubtitle}>{props.subtitle}</h2>
        <p className={styles.communityChildcareDescription}>
          {props.description}
        </p>
      </div>
    </div>
  );
};

const ChildrenGroupCard = (props: ProgramProps) => {
  return (
    <div className={styles.container}>
      {/* Childcare Information Section */}
      <div className={styles.childcareInfo}>
        <h2 className={styles.header}>{props.childcareInfoTitle}</h2>
        <p className={styles.description}>{props.childcareInfoDescription}</p>
        <h2 className={styles.header}>{props.costTitle}</h2>
        <p className={styles.description}>{props.costDescription}</p>
      </div>

      {/* Programs Section */}
      <div className={styles.programs}>
        <div className={styles.programCard}>
          <div className={styles.programText}>
            <h2 className={styles.programHeader}>{props.program1Title}</h2>
            <p className={styles.programDescription}>
              {props.program1Description}
            </p>
          </div>
          <div className={styles.programButtonContainer}>
            <button className={styles.buttonLight}>Register</button>
          </div>
        </div>

        <div className={styles.programCard}>
          <div className={styles.programText}>
            <h2 className={styles.programHeader}>{props.program1Title}</h2>
            <p className={styles.programDescription}>
              {props.program1Description}
            </p>
          </div>
          <div className={styles.programButtonContainer}>
            <button className={styles.buttonLight}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageCard = (props: ImageCardProps) => {
  return (
    <div className={styles.imageCardContainer}>
      <img
        src={props.imageUrl1}
        alt={props.altText1}
        className={styles.twoImage}
      />
      <img
        src={props.imageUrl2}
        alt={props.altText2}
        className={styles.twoImage}
      />
    </div>
  );
};

const ActivitiesCard = (props: ActivityCardProps) => {
  return (
    <div className={styles.activitiesContainer}>
      {/* Activity 1 */}
      <div className={styles.activityCard}>
        <h2 className={styles.activityTitle}>{props.activity1Title}</h2>
        <p className={styles.activityDescription}>
          {props.activity1Description}
        </p>
        <button className={styles.buttonLight}>Register</button>
      </div>

      {/* Activity 2 */}
      <div className={styles.activityCard}>
        <h2 className={styles.activityTitle}>{props.activity2Title}</h2>
        <p className={styles.activityDescription}>
          {props.activity2Description}
        </p>
        <button className={styles.buttonLight}>Register</button>
      </div>
    </div>
  );
};

const YouthGroupCard = (props: YouthGroupCardProps) => {
  return (
    <div className={styles.youthGroupContainer}>
      {/* Image Section */}
      <div className={styles.youthGroupImageContainer}>
        <img
          src={props.imageUrl1}
          alt={props.altText1}
          className={styles.youthGroupImage}
        />
      </div>

      {/* Info Section */}
      <div className={styles.youthGroupInfoContainer}>
        <h2 className={styles.youthGroupInfoTitle}>{props.infoTitle}</h2>
        <p className={styles.youthGroupInfoDescription}>
          {props.infoDescription}
        </p>
        <button className={styles.buttonLight}>More Information</button>
      </div>
    </div>
  );
};

const ParentsInfoCard = (props: ParentsInfoCardProps) => {
  return (
    <div className={styles.infoCardsContainer}>
      {/* Information Card 1 */}
      <a href={props.information1link} className={styles.infoCard}>
        <p className={styles.infoTitle}>{props.information1title}</p>
      </a>

      {/* Information Card 2 */}
      <a href={props.information2link} className={styles.infoCard}>
        <p className={styles.infoTitle}>{props.information2title}</p>
      </a>

      {/* Information Card 3 */}
      <a href={props.information3link} className={styles.infoCard}>
        <p className={styles.infoTitle}>{props.information3title}</p>
      </a>
    </div>
  );
};

export {
  TitleCard,
  CommunityChildcareCard,
  ChildrenGroupCard,
  ImageCard,
  ActivitiesCard,
  YouthGroupCard,
  ParentsInfoCard,
};
