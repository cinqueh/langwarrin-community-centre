"use client";

import React from "react";
import styles from "./styles.module.css";

interface RoomBookingCardProps {
  imageUrl: string;
  altText: string;
  roomName: string;
  capacity: number;
  description: string;
  communityGroupHourlyRate: string;
  permanentHiresHourlyRate: string;
  casualHiresHourlyRate: string;
  buttonText: string;
  linkUrl: string;
}

const RoomBookingCardLeft: React.FC<RoomBookingCardProps> = (props) => {
  const handleButtonClick = () => {
    const roomName = props.roomName;
    window.location.href = `${props.linkUrl}?room=${encodeURIComponent(
      roomName
    )}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={props.imageUrl}
          alt={props.altText}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.header}>
          {props.roomName}{" "}
          <span className={styles.capacity}>🪑 Capacity: {props.capacity}</span>
        </h2>
        <p className={styles.description}>{props.description}</p>
        <p>
          <strong>Community Groups: </strong> {props.communityGroupHourlyRate}{" "}
          per hour
        </p>
        <p>
          <strong>Permanent Hirers (non-community groups): </strong>{" "}
          {props.permanentHiresHourlyRate} per hour
        </p>
        <p>
          <strong>Casual Hirers: </strong> {props.casualHiresHourlyRate} per
          hour
        </p>
        <button className="button-white" onClick={handleButtonClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

const RoomBookingCardRight: React.FC<RoomBookingCardProps> = (props) => {
  const handleButtonClick = () => {
    const roomName = props.roomName;
    window.location.href = `${props.linkUrl}?room=${encodeURIComponent(
      roomName
    )}`;
  };
  return (
    <div className={styles.containerRight}>
      <div className={styles.content}>
        <h2 className={styles.header}>
          {props.roomName}{" "}
          <span className={styles.capacity}>🪑 Capacity: {props.capacity}</span>
        </h2>
        <p className={styles.description}>{props.description}</p>
        <p>
          <strong>Community Groups: </strong> {props.communityGroupHourlyRate}{" "}
          per hour
        </p>
        <p>
          <strong>Permanent Hirers (non-community groups): </strong>{" "}
          {props.permanentHiresHourlyRate} per hour
        </p>
        <p>
          <strong>Casual Hirers: </strong> {props.casualHiresHourlyRate} per
          hour
        </p>
        <button className="button-green" onClick={handleButtonClick}>
          {props.buttonText}
        </button>
      </div>
      <div className={styles.imageContainer}>
        <img
          src={props.imageUrl}
          alt={props.altText}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export { RoomBookingCardLeft, RoomBookingCardRight };
