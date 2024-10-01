"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";

type ChildcareContactFormProps = {
  title: string;
  subtitle: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  mobilePlaceholder: string;
  homePhonePlaceholder: string;
  occupationPlaceholder: string;
  childFirstNamePlaceholder: string;
  childLastNamePlaceholder: string;
  programPlaceholder: string;
  messagePlaceholder: string;
  submitButtonText: string;
};

const ChildcareContactForm: React.FC<ChildcareContactFormProps> = ({
  title,
  subtitle,
  firstNamePlaceholder,
  lastNamePlaceholder,
  emailPlaceholder,
  mobilePlaceholder,
  homePhonePlaceholder,
  occupationPlaceholder,
  childFirstNamePlaceholder,
  childLastNamePlaceholder,
  programPlaceholder,
  messagePlaceholder,
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
    childFirstName: "",
    childLastName: "",
    childAge: "",
    program: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className={styles.childcareContactForm}>
      <h4>{title}</h4>
      <p className={styles.subtitle}>{subtitle}</p>
      <form onSubmit={handleSubmit}>
        <h5>Parent Contact Information</h5>
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

        <h5>Child's Information</h5>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="childAge"
            placeholder="Child's Age"
            value={formData.childAge}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="childFirstName"
            placeholder={childFirstNamePlaceholder}
            value={formData.childFirstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="childLastName"
            placeholder={childLastNamePlaceholder}
            value={formData.childLastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <select
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            className={styles.selectInput}
            required
          >
            <option value="">{programPlaceholder}</option>
            <option value="Koala Group">Koala Group</option>
            <option value="Possum Group">Possum Group</option>
          </select>
        </div>

        <textarea
          name="message"
          placeholder={messagePlaceholder}
          value={formData.message}
          onChange={handleInputChange}
          className={styles.messageTextarea}
          required
        />

        <button type="submit" className="button-white">
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export {ChildcareContactForm};