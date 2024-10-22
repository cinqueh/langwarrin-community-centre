"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { PersonDTO, AddressDTO } from "@/backend/dto/person";
import { RoomBookingEnquiryDTO } from "@/backend/dto/inquiry";

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
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  // load data
  useEffect(() => {
    const savedRoomDetails = localStorage.getItem("roomBookingData");
    const savedPersonalDetails = localStorage.getItem(
      "personalDetailsFormData"
    );
    const savedAdditionalInfo = localStorage.getItem("additionalInfoFormData");

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const personalInfo = {
      personId: 1,
      firstName: personalDetails.firstName,
      surname: personalDetails.familyName,
      email: personalDetails.email,
      phoneNumber: personalDetails.mobile,
      homeNumber: "",
      occupation: "",
      address: new AddressDTO({
        state: personalDetails.state,
        streetAddress: personalDetails.streetName,
        apartment: personalDetails.unitNo,
        suburb: personalDetails.city,
        postcode: personalDetails.postalCode,
      }),
    };

    const roomBookingData = {
      roomName: roomDetails.room,
      hireType: roomDetails.hireType,
      bookingDate: roomDetails.date,
      bookingStartTime: roomDetails.startTime,
      bookingEndTime: roomDetails.endTime,
      purposeOfHire: additionalInfo.hirePurpose,
      isOrganisationBooking: additionalInfo.forOrganisation === "Yes" ? true : false,
      organisationName: additionalInfo.organisationName ? additionalInfo.organisationName : "",
      organisationAddress: additionalInfo.organisationAddress ? additionalInfo.organisationAddress : "",
      otherCompaniesInvolved: false,
      companyDetails: "",
      numberAttending: Number(additionalInfo.estimatedAttendance),
      howDidYouHear: additionalInfo.howHearAboutSpace,
      specialRequirements: additionalInfo.specialRequirements,
      willLiquorBeConsumed: additionalInfo.willLiquorBeConsumed === "Yes" ? true : false,
      inquiryDate: new Date(),
      person: new PersonDTO(personalInfo), 
    };

    // Instantiate the RoomBookingEnquiryDTO with the data
    const roomBookingEnquiry = new RoomBookingEnquiryDTO(roomBookingData);

    setIsLoading(true); 

    try {
      const response = await fetch("/api/enquiry/room-hire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomBookingEnquiry), 
      });
  
      if (response.ok) {
        console.log("Room booking submitted successfully!");
        localStorage.clear(); // Clear local storage on success
        window.location.href = "/request-a-room/success"; // Redirect on success
      } else {
        const errorData = await response.json();
        console.log(roomBookingData);
        console.error("Failed to submit room booking:", errorData);
        setAlertMessage("Failed to submit room booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting room booking:", error);
      setAlertMessage("An error occurred while submitting the booking.");
    } finally {
      setIsLoading(false); // Always stop the loading state, whether success or failure
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (agreedToTerms && agreedToBond) {
      onSubmit(e);
    } else {
      setAlertMessage("Please agree to the terms and bond agreement");
    }
  };

  return (
    <form className={styles.confirmationFormContainer} onSubmit={handleSubmit}>
      {/* Room Details Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h4>Room Details</h4>
          <button
            className={styles.editButton}
            onClick={() => handleEditClick("room-details")}
            type="button" // Prevent the button from submitting the form
          >
            Edit
          </button>
        </div>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>Room Name</span>
          : <span style={{ color: "#EEEDE4" }}>{roomDetails.room}</span>
        </p>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>Booking Type</span>
          : <span style={{ color: "#EEEDE4" }}>{roomDetails.hireType}</span>
        </p>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>Date</span>:{" "}
          <span style={{ color: "#EEEDE4" }}>{roomDetails.date}</span>
        </p>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>Time</span>:{" "}
          <span style={{ color: "#EEEDE4" }}>{roomDetails.startTime} to {roomDetails.endTime}</span>
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
            type="button"
          >
            Edit
          </button>
        </div>
        <p>
          <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>Full Name</span>
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
            type="button"
          >
            Edit
          </button>
        </div>

        {/* Hard-coded questions with corresponding keys */}
        {[
          { label: "Purpose of the hire", key: "hirePurpose" },
          { label: "Are you booking for an organisation?", key: "forOrganisation" },
          { label: "Organisation Name", key: "organisationName" },
          { label: "Organisation Address", key: "organisationAddress" },
          { label: "Number Attending", key: "estimatedAttendance" },
          { label: "Special Requirements", key: "specialRequirements" },
          { label: "Will liquor be consumed at this function?", key: "willLiquorBeConsumed" },
          { label: "How did you hear about the space?", key: "howHearAboutSpace" },
        ].map(({ label, key }) => (
          <p key={key}>
            <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>{label}</span>
            : <span style={{ color: "#EEEDE4" }}>{additionalInfo[key]}</span>
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

      {alertMessage && <p className="alertError">{alertMessage}</p>}

      <button
        type="submit"
        className="button-white"
        style={{ display: "block", margin: "20px auto" }}
        disabled={isLoading} 
      >
        {isLoading ? "Submitting..." : "Confirm"}
      </button>
    </form>
  );
}

export { ConfirmationForm };
