"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { PersonDTO } from "@/backend/dto/person";
import { AddressDTO } from "@/backend/dto/person";
import { MemberDTO } from "@/backend/dto/member";

type MembershipFormProps = {
  title: string;
  subtitle: string;
  subtitle2: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  mobilePlaceholder: string;
  homePhonePlaceholder: string;
  occupationPlaceholder: string;
  addressPlaceholder: string;
  suburbPlaceholder: string;
  statePlaceholder: string;
  postcodePlaceholder: string;
  submitButtonText: string;
};

const MembershipForm: React.FC<MembershipFormProps> = ({
  title,
  subtitle,
  subtitle2,
  firstNamePlaceholder,
  lastNamePlaceholder,
  emailPlaceholder,
  mobilePlaceholder,
  homePhonePlaceholder,
  occupationPlaceholder,
  addressPlaceholder,
  suburbPlaceholder,
  statePlaceholder,
  postcodePlaceholder,
  submitButtonText,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    homePhone: "",
    occupation: "",
    address: "",
    suburb: "",
    state: "",
    postcode: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission

    const addressDTO = new AddressDTO({
      state: formData.state,
      streetAddress: formData.address,
      apartment: "",
      suburb: formData.suburb,
      postcode: formData.postcode,
    });

    const personDTO = new PersonDTO({
      personId: 0,
      firstName: formData.firstName,
      surname: formData.lastName,
      email: formData.email,
      homeNumber: formData.homePhone,
      phoneNumber: formData.mobile,
      occupation: formData.occupation,
      address: addressDTO,
    });

    const memberDTO = new MemberDTO({
      memberId: 0,
      title: formData.title,
      submitDate: new Date(),
      person: personDTO,
    });

    // Send form data to backend API
    try {
      const response = await fetch("/api/member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberDTO),
      });

      if (response.ok) {
        setAlertMessage('Form submitted successfully!');
        setAlertType('success');
      } else {
        setAlertMessage('An error occurred while submitting the form. Please try again.');
        setAlertType('error');
      }
    } catch (error) {
      // console.error("Error submitting form:", error);
      setAlertMessage('An error occurred while submitting the form. Please try again.');
      setAlertType('error');
    }
  };

  return (
    <div className={styles.membershipForm}>
      <h4>{title}</h4>
      <p className={styles.subtitle}>{subtitle}</p>
      <p className={styles.subtitle2}>{subtitle2}</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <select
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={styles.selectInput}
            required
          >
            <option value="">Title</option>
            <option value="Mr">Mr</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
          </select>
          <input
            type="text"
            name="firstName"
            placeholder={firstNamePlaceholder}
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder={lastNamePlaceholder}
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.mobileInputGroup}>
            <span className={styles.mobilePrefix}>+61</span>
            <input
              type="text"
              name="mobile"
              placeholder={mobilePlaceholder}
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="text"
            name="homePhone"
            placeholder={homePhonePlaceholder}
            value={formData.homePhone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder={emailPlaceholder}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="occupation"
            placeholder={occupationPlaceholder}
            value={formData.occupation}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="address"
            placeholder={addressPlaceholder}
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="suburb"
            placeholder={suburbPlaceholder}
            value={formData.suburb}
            onChange={handleInputChange}
            required
          />
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={styles.selectInput}
            required
          >
            <option value="">State</option>
            <option value="VIC">VIC</option>
            <option value="NSW">NSW</option>
            <option value="QLD">QLD</option>
            <option value="WA">WA</option>
            <option value="SA">SA</option>
            <option value="TAS">TAS</option>
            <option value="ACT">ACT</option>
          </select>
          <input
            type="text"
            name="postcode"
            placeholder={postcodePlaceholder}
            value={formData.postcode}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label>
            <input type="checkbox" required />
            Yes, I agree to the collection and use of my personal information
            for communication and event invitations.
          </label>
        </div>

        <button type="submit" className="button-white">
          {submitButtonText}
        </button>
        {alertMessage && (
          <p
            className={
              alertType === "success" ? "alertSuccess" : "alertError"
            }
          >
            {alertMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export { MembershipForm };
