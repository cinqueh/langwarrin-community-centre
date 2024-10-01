"use client";

import React from "react";
import styles from "./styles.module.css";

interface RoomBookingCardProps {
  imageUrl: string;
  altText: string;
  roomName: string;
  capacity: number;
  description: string; // New prop for editable description
  communityGroupHourlyRate: string; // Changed to string to allow text editing
  permanentHiresHourlyRate: string;
  casualHiresHourlyRate: string;
  buttonText: string; // New prop for editable button text
}

const RoomBookingCardLeft: React.FC<RoomBookingCardProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt={props.altText} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.header}>
          {props.roomName} <span className={styles.capacity}>🪑 Capacity: {props.capacity}</span>
        </h2>
        <p className={styles.description}>{props.description}</p>
        <p>
          <strong>Community Groups: </strong> {props.communityGroupHourlyRate} per hour
        </p>
        <p>
          <strong>Permanent Hirers (non-community groups): </strong> {props.permanentHiresHourlyRate} per hour
        </p>
        <p>
          <strong>Casual Hirers: </strong> {props.casualHiresHourlyRate} per hour
        </p>
        <button className="button-white">{props.buttonText}</button>
      </div>
    </div>
  );
};

const RoomBookingCardRight: React.FC<RoomBookingCardProps> = (props) => {
  return (
    <div className={styles.containerRight}>
      <div className={styles.content}>
        <h2 className={styles.header}>
          {props.roomName} <span className={styles.capacity}>🪑 Capacity: {props.capacity}</span>
        </h2>
        <p className={styles.description}>{props.description}</p>
        <p>
          <strong>Community Groups: </strong> {props.communityGroupHourlyRate} per hour
        </p>
        <p>
<strong>Permanent Hirers (non-community groups): </strong> {props.permanentHiresHourlyRate} per hour
        </p>
        <p>
          <strong>Casual Hirers: </strong> {props.casualHiresHourlyRate} per hour
        </p>
        <button className="button-green">{props.buttonText}</button>
      </div>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt={props.altText} className={styles.image} />
      </div>
    </div>
  );
};

export { RoomBookingCardLeft, RoomBookingCardRight };