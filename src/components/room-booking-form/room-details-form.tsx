"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface RoomDetailsFormProps {
  roomLabel: string;
  hireTypeLabel: string;
  dateLabel: string;
  timeLabel: string;
  linkUrl: string;
  hireTypeInfo: string;
}

// Room Booking Form Component
const RoomDetailsFormForm = (props: RoomDetailsFormProps) => {
  const [formData, setFormData] = useState({
    room: "",
    hireType: "",
    date: "",
    startTime: "",
    endTime: "",
    total: 100,
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem("roomBookingData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Update form data based on input changes
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [showInfo, setShowInfo] = useState(false);

  // Handle Next button click - Save form data to local storage
  const handleNextClick = () => {
    if (
      formData.room &&
      formData.hireType &&
      formData.date &&
      formData.startTime &&
      formData.endTime
    ) {
      localStorage.setItem("roomBookingData", JSON.stringify(formData));
      //   alert("Booking saved to browser storage.");
      window.location.href = props.linkUrl;
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <div className={styles.bookingFormContainer}>
      {/* Room and Hire Type Row */}
      <div className={styles.inputGroup}>
        <label>{props.roomLabel}</label>
        <label>
          {props.hireTypeLabel}
          {/* Information Icon */}
          <span
            className={styles.infoIcon}
            title="Show hire types"
            onClick={() => setShowInfo(!showInfo)}
          >
            ℹ️
          </span>
        </label>
      </div>

      {/* Display information when icon is clicked */}
      {showInfo && (
        <div
          className={styles.hireTypeInfo}
          dangerouslySetInnerHTML={{ __html: props.hireTypeInfo }}
        />
      )}

      <div className={styles.inputGroup}>
        <select
          name="room"
          value={formData.room}
          onChange={handleInputChange}
          required
        >
          <option value="">--</option>
          <option value="Hall">Hall</option>
          <option value="Craig Room">Craig Room</option>
          <option value="Hempel Room">Hempel Room</option>
          <option value="Hampton Room">Hampton Room</option>
          <option value="Back Space Office">Back Space Office</option>
          <option value="Children’s Room & Playground">
            Children’s Room & Playground
          </option>
        </select>

        <select
          name="hireType"
          value={formData.hireType}
          onChange={handleInputChange}
          required
        >
          <option value="">--</option>
          <option value="Casual Hirers">Casual Hirers</option>
          <option value="Permanent Hirers">Permanent Hirers</option>
          <option value="Community Groups">Community Groups</option>
        </select>
      </div>

      {/* Date and Time Row */}
      <div className={styles.inputGroup}>
        <label>{props.dateLabel}</label>
        <label>{props.timeLabel}</label>
      </div>
      <div className={styles.inputGroup}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <div className={styles.timeInputGroup}>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            required
          />
          <span>to</span>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      {/* Total and Next Button */}
      <div className={styles.totalDisplay}>Total: ${formData.total}</div>
      <button
        className="button-white"
        style={{ display: "block", margin: "0 auto" }}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

export { RoomDetailsFormForm };
