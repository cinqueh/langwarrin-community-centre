"use client"; // Since you might need client-side interactivity

import React from "react";
import styles from "./programs-card.module.css"; // Importing the CSS Module


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


export {
  FormDownloadCard,
  MediumGreenProgramCard,
  LightGreenProgramCard,
  DarkGreenProgramCard,
  divider,
};
