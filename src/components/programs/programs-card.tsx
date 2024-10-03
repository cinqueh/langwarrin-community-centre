"use client"; // Since you might need client-side interactivity

import React from "react";
import styles from "./programs-card.module.css"; // Importing the CSS Module

interface FormDownloadCardProps {
  title: string;
  description: string;
  buttonText: string;
  linkUrl: string;
}

const FormDownloadCard = (props: FormDownloadCardProps) => {
  const handleButtonClick = () => {
    window.location.href = props.linkUrl;
  };
  return (
    <div className="darkGreenContainer">
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <button className="button-white" onClick={handleButtonClick}>
        {props.buttonText}
      </button>
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
  const handleButtonClick = () => {
    window.location.href = props.linkUrl;
  };
  return (
    <div className="darkGreenContainer">
      <img src={props.imageUrl} alt={props.altText} />
      <div className="cardTitleWrapper">
        <h4>{props.title}</h4>
      </div>
      <button className="button-white" onClick={handleButtonClick}>
        More Info
      </button>
    </div>
  );
};

const MediumGreenProgramCard = (props: ProgramCardProps) => {
  const handleButtonClick = () => {
    window.location.href = props.linkUrl;
  };
  return (
    <div className="mediumGreenContainer">
      <img src={props.imageUrl} alt={props.altText} />
      <div className="cardTitleWrapper">
        <h4>{props.title}</h4>
      </div>
      <button className="button-white" onClick={handleButtonClick}>
        More Info
      </button>
    </div>
  );
};

const LightGreenProgramCard = (props: ProgramCardProps) => {
  const handleButtonClick = () => {
    window.location.href = props.linkUrl;
  };
  return (
    <div className="lightGreenContainer">
      <img src={props.imageUrl} alt={props.altText} />
      <div className="cardTitleWrapper">
        <h4>{props.title}</h4>
      </div>
      <button className="button-white" onClick={handleButtonClick}>
        More Info
      </button>
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
