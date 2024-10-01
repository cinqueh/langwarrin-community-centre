"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
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
            Yes, I agree to the collection and use of my personal information for communication and event invitations.
          </label>
        </div>

        <button type="submit" className="button-white">
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export {MembershipForm};