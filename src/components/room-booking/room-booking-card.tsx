"use client"; // Since you might need client-side interactivity

import React from "react";
import styles from "./styles.module.css"; // Importing the CSS Module

interface RoomBookingCardProps {

    imageUrl: string;
    altText: string;

    roomName: string;
    capacity: number;
    communityGroupHourlyRate: number;
    permanentHiresHourlyRate: number;
    casualHiresHourlyRate: number;
  }

const RoomBookingCardLeft = (props: RoomBookingCardProps) => {
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
        <h2 className={styles.header}>{props.roomName}</h2>
        <p>Capacity: {props.capacity}</p>
        <p>
          <strong>Community Groups: </strong> ${props.communityGroupHourlyRate}/h
        </p>
        <p>
          <strong>Permanent Hirers (non-community groups): </strong> ${props.permanentHiresHourlyRate}/h
        </p>
        <p>
          <strong>Casual Hirers: </strong> ${props.casualHiresHourlyRate}/h
        </p>
        <button className={styles.buttonLight}>Book now</button>
      </div>
    </div>
  );
};

const RoomBookingCardRight = (props: RoomBookingCardProps) => {
  return (
    <div className={styles.containerRight}>
      <div className={styles.content}>
        <h2 className={styles.header}>{props.roomName}</h2>
        <p>Capacity: {props.capacity}</p>
        <p>
          <strong>Community Groups: </strong> ${props.communityGroupHourlyRate}/h
        </p>
        <p>
          <strong>Permanent Hirers (non-community groups): </strong> ${props.permanentHiresHourlyRate}/h
        </p>
        <p>
          <strong>Casual Hirers: </strong> ${props.casualHiresHourlyRate}/h
        </p>
        <button className={styles.buttonDark}>Book now</button>
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