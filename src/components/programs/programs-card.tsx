"use client"; // Since you might need client-side interactivity

import React from "react";
import "../../styles/global.css"; // Importing the global CSS file
import styles from "./programs-card.module.css"; // Importing the CSS Module

interface TitleCardProps {
  title: string;
}

const TitleCard = (props: TitleCardProps) => {
  return (
    <div className="titleContainer">
      <h2>{props.title}</h2>
    </div>
  );
};

interface InformationCardTitleProps {
  title: string;
}

// Information Card Title Component
const InformationCardTitle = (props: InformationCardTitleProps) => {
  return (
    <div className="lightGreenInformationContainer ">
      <h3>{props.title}</h3>
    </div>
  );
};

interface InformationCardProps {
  title: string;
  description: string;
}

const LightGreenInformationCard = (props: InformationCardProps) => {
  return (
    <div className="lightGreenInformationContainer">
      <h4>{props.title}</h4>
      <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
    </div>
  );
};

const DarkGreenInformationCard = (props: InformationCardProps) => {
  return (
    <div className="darkGreenInformationContainer">
      <h4>{props.title}</h4>
      <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
    </div>
  );
};

const InformationCardWithButton = (props: InformationCardProps) => {
  return (
    <div className="lightGreenInformationContainer">
      <div className="contentWrapper">
        <div className="textContent">
          <h4>{props.title}</h4>
          <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
        </div>
        <div className="buttonContainer">
          <button className="button-white">Book Online Now</button>
        </div>
      </div>
    </div>
  );
};

interface FormDownloadCardProps {
  title: string;
  description: string;
  buttonText: string;
}

const FormDownloadCard = (props: FormDownloadCardProps) => {
  return (
    <div className="darkGreenContainer">
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <button className="button-white">{props.buttonText}</button>
    </div>
  );
};

interface ProgramCardProps {
  imageUrl: string;
  altText: string;
  title: string;
  linkUrl: string;
}

const DarkGreenProgramCard = (props: ProgramCardProps) => {
  return (
    <div className="darkGreenContainer">
      <img src={props.imageUrl} alt={props.altText} />
      <div className="cardTitleWrapper">
        <h4>{props.title}</h4>
      </div>
      <button className="button-white">More Info</button>
    </div>
  );
};

const MediumGreenProgramCard = (props: ProgramCardProps) => {
  return (
    <div className="mediumGreenContainer">
      <img src={props.imageUrl} alt={props.altText} />
      <div className="cardTitleWrapper">
        <h4>{props.title}</h4>
      </div>
      <button className="button-white">More Info</button>
    </div>
  );
};

const LightGreenProgramCard = (props: ProgramCardProps) => {
  return (
    <div className="lightGreenContainer">
      <img src={props.imageUrl} alt={props.altText} />
      <div className="cardTitleWrapper">
        <h4>{props.title}</h4>
      </div>
      <button className="button-white">More Info</button>
    </div>
  );
};

const divider = () => {
  return <div className="divider"></div>;
};

interface ProgramImageCardProps {
  imageUrl: string;
  altText: string;
}

const ProgramImageCard = (props: ProgramImageCardProps) => {
  return (
    <div className={styles.imageCardContainer}>
      <img src={props.imageUrl} alt={props.altText} />
    </div>
  );
};

export {
  TitleCard,
  InformationCardTitle,
  LightGreenInformationCard,
  DarkGreenInformationCard,
  InformationCardWithButton,
  FormDownloadCard,
  MediumGreenProgramCard,
  LightGreenProgramCard,
  DarkGreenProgramCard,
  divider,
  ProgramImageCard,
};
