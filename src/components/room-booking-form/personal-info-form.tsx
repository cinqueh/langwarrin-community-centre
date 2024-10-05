"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface PersonalDetailsFormProps {
  contactInfoTitle: string;
  addressInfoTitle: string;
  firstNamePlaceholder: string;
  familyNamePlaceholder: string;
  emailPlaceholder: string;
  mobilePlaceholder: string;
  unitNoPlaceholder: string;
  streetNamePlaceholder: string;
  cityPlaceholder: string;
  postalCodePlaceholder: string;
  statePlaceholder: string;
  linkUrl: string;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    familyName: "",
    email: "",
    mobile: "",
    unitNo: "",
    streetName: "",
    city: "",
    postalCode: "",
    state: "",
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem("personalDetailsFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      formData.firstName &&
      formData.familyName &&
      formData.email &&
      formData.mobile &&
      formData.streetName &&
      formData.city &&
      formData.postalCode &&
      formData.state
    ) {
      localStorage.setItem("personalDetailsFormData", JSON.stringify(formData));
      //   alert("Personal details saved to browser storage.");
      window.location.href = props.linkUrl;
    } else {
      console.log(formData.state);
      alert("Please fill out all required fields.");
    }
  };

  return (
    <div className={styles.personalInfoFormContainer}>
      {/* Contact Info Section */}
      <h4>{props.contactInfoTitle}</h4>
      <div className={styles.inputGroup}>
        <input
          type="text"
          name="firstName"
          placeholder={props.firstNamePlaceholder}
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="familyName"
          placeholder={props.familyNamePlaceholder}
          value={formData.familyName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="email"
          name="email"
          placeholder={props.emailPlaceholder}
          value={formData.email}
          onChange={handleInputChange}
        />
        <div className={styles.mobileInputWrapper}>
          <span className={styles.mobilePrefix}>+61 |</span>
          <input
            type="tel"
            name="mobile"
            placeholder={props.mobilePlaceholder}
            value={formData.mobile}
            pattern="[0-9]*"
            required
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Address Section */}
      <h4>{props.addressInfoTitle}</h4>
      <div className={styles.fullLineInput}>
        <input
          type="text"
          name="unitNo"
          placeholder={props.unitNoPlaceholder}
          value={formData.unitNo}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.fullLineInput}>
        <input
          type="text"
          name="streetName"
          placeholder={props.streetNamePlaceholder}
          value={formData.streetName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="text"
          name="city"
          placeholder={props.cityPlaceholder}
          value={formData.city}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder={props.postalCodePlaceholder}
          value={formData.postalCode}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.fullLineInput}>
        <select
          name="state"
          value={formData.state}
          onChange={handleInputChange}
        >
          <option value="">--</option>
          <option value="VIC">VIC</option>
          <option value="NSW">NSW</option>
          <option value="QLD">QLD</option>
          <option value="WA">WA</option>
          <option value="SA">SA</option>
          <option value="TAS">TAS</option>
          <option value="ACT">ACT</option>
        </select>
      </div>

      <button
        className="button-white"
        style={{ display: "block", margin: "0 auto" }}
        onClick={handleSubmit}
      >
        Next
      </button>
    </div>
  );
};

export { PersonalDetailsForm };
