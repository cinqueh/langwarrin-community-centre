"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface ConfirmationFormProps {
  termsText: string;
  bondText: string;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
  termsText,
  bondText,
}) => {
  const [roomDetails, setRoomDetails] = useState<any>({});
  const [personalDetails, setPersonalDetails] = useState<any>({});
  const [additionalInfo, setAdditionalInfo] = useState<any>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToBond, setAgreedToBond] = useState(false);

  useEffect(() => {
    const savedRoomDetails = localStorage.getItem("roomBookingData");
    const savedPersonalDetails = localStorage.getItem(
      "personalDetailsFormData"
    );
    const savedAdditionalInfo = localStorage.getItem("AdditionalInfoFormData");

    if (savedRoomDetails) {
      setRoomDetails(JSON.parse(savedRoomDetails));
      setTotalAmount(JSON.parse(savedRoomDetails).total);
    }
    if (savedPersonalDetails)
      setPersonalDetails(JSON.parse(savedPersonalDetails));
    if (savedAdditionalInfo) setAdditionalInfo(JSON.parse(savedAdditionalInfo));
  }, []);

  const fullName = `${personalDetails.firstName} ${personalDetails.familyName}`;
  const address = `${
    personalDetails.unitNo ? `${personalDetails.unitNo}, ` : ""
  }
  ${personalDetails.streetName}, 
  ${personalDetails.city}, 
  ${personalDetails.postalCode}, 
  ${personalDetails.state}`;

  const handleEditClick = (section: string) => {
    window.location.href = `/request-a-room/${section}-form`;
  };

  const onSubmit = () => {
    // add functionality to submit form data
    console.log("Form Submitted");
    localStorage.clear(); // clear form data from local storage
    window.location.href = "/request-a-room/success";
  };

  const handleSubmit = () => {
    if (agreedToTerms && agreedToBond) {
      onSubmit();
    } else {
      alert("Please agree to the terms and bond agreement.");
    }
  };

  return (
    <div className={styles.confirmationFormContainer}>
      {/* Room Details Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h4>Room Details</h4>
          <button
            className={styles.editButton}
            onClick={() => handleEditClick("room-details")}
          >
            Edit
          </button>
        </div>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>
            Room Name
          </span>
          : <span style={{ color: "#EEEDE4" }}>{roomDetails.room}</span>
        </p>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>
            Booking Type
          </span>
          : <span style={{ color: "#EEEDE4" }}>{roomDetails.hireType}</span>
        </p>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>Date</span>:{" "}
          <span style={{ color: "#EEEDE4" }}>{roomDetails.date}</span>
        </p>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>Time</span>:{" "}
          <span style={{ color: "#EEEDE4" }}>
            {roomDetails.startTime} to {roomDetails.endTime}
          </span>
        </p>
      </div>

      <hr className={styles.divider} />

      {/* Personal Details Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h4>Personal Details</h4>
          <button
            className={styles.editButton}
            onClick={() => handleEditClick("personal-details")}
          >
            Edit
          </button>
        </div>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>
            Full Name
          </span>
          : <span style={{ color: "#EEEDE4" }}>{fullName}</span>
        </p>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>Email</span>:{" "}
          <span style={{ color: "#EEEDE4" }}>{personalDetails.email}</span>
        </p>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>Mobile</span>:{" "}
          <span style={{ color: "#EEEDE4" }}>{personalDetails.mobile}</span>
        </p>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>Address</span>:{" "}
          <span style={{ color: "#EEEDE4" }}>{address}</span>
        </p>
      </div>

      <hr className={styles.divider} />

      {/* Additional Info Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h4>Additional Info</h4>
          <button
            className={styles.editButton}
            onClick={() => handleEditClick("additional-info")}
          >
            Edit
          </button>
        </div>
        {Object.keys(additionalInfo).map((key) => (
          <p key={key}>
            <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>{key}</span>:{" "}
            <span style={{ color: "#EEEDE4" }}>{additionalInfo[key]}</span>
          </p>
        ))}
      </div>

      <hr className={styles.divider} />

      {/* Total Amount */}
      <div className={styles.totalDisplay}>Total: ${totalAmount}</div>

      {/* Terms & Bond Agreement */}
      <div className={styles.checkBoxGroup}>
        <label>
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
          />
          <span dangerouslySetInnerHTML={{ __html: termsText }} />
        </label>
        <label>
          <input
            type="checkbox"
            checked={agreedToBond}
            onChange={(e) => setAgreedToBond(e.target.checked)}
          />
          <span dangerouslySetInnerHTML={{ __html: bondText }} />
        </label>
      </div>

      <button
        className="button-white"
        style={{ display: "block", margin: "20px auto" }}
        onClick={handleSubmit}
      >
        Confirm
      </button>
    </div>
  );
};

export { ConfirmationForm };
