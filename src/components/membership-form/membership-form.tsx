"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { PersonDTO } from "@/backend/dto/person";
import { AddressDTO } from "@/backend/dto/person";
import { MemberDTO } from "@/backend/dto/member";

interface MembershipFormProps {
  title: string;
  subtitle: string;
  subtitle2: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  mobilePlaceholder: string;
  homePhonePlaceholder: string;
  occupationPlaceholder: string;
  apartmentPlaceholder: string;
  addressPlaceholder: string;
  suburbPlaceholder: string;
  statePlaceholder: string;
  postcodePlaceholder: string;
  submitButtonText: string;
  checkboxLabel: string;
}

const MembershipForm = (props: MembershipFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    homePhone: "",
    occupation: "",
    apartment: "",
    address: "",
    suburb: "",
    state: "",
    postcode: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreedToTerms) {
      setAlertMessage("Please agree to the terms and conditions.");
      setAlertType("error");
      return;
    }

    const addressDTO = new AddressDTO({
      state: formData.state,
      streetAddress: formData.address,
      apartment: formData.apartment,
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

    setIsLoading(true);

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
        // After successfully submitting the form, trigger the email sending
        const emailResponse = await fetch("/api/email/membership-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: formData.email, // The client's email
            formData, // The form data containing all the details
          }),
        });

        if (emailResponse.ok) {
          setAlertMessage("Form submitted and emails sent successfully!");
          setAlertType("success");
        } else {
          setAlertMessage(
            "Form submitted, but an error occurred while sending emails."
          );
          setAlertType("error");
        }
      } else {
        setAlertMessage(
          "An error occurred while submitting the form. Please try again."
        );
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage(
        "An error occurred while submitting the form. Please try again."
      );
      setAlertType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.membershipForm}>
      <h4>{props.title}</h4>
      <p className={styles.subtitle}>{props.subtitle}</p>
      <p className={styles.sectionTitle}>{props.subtitle2}</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.nameInputGroup}>
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
            placeholder={props.firstNamePlaceholder}
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder={props.lastNamePlaceholder}
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.mobileInputWrapper}>
            <span className={styles.mobilePrefix}>+61 |</span>
            <input
              type="tel"
              name="mobile"
              placeholder={props.mobilePlaceholder}
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.mobileInputWrapper}>
            <span className={styles.mobilePrefix}>03 |</span>
            <input
              type="tel"
              name="homePhone"
              placeholder={props.homePhonePlaceholder}
              value={formData.homePhone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder={props.emailPlaceholder}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="occupation"
            placeholder={props.occupationPlaceholder}
            value={formData.occupation}
            onChange={handleInputChange}
            required
          />
        </div>
        <h2 className={styles.sectionTitle}>Address</h2>
        <div className={styles.fullLineInput}>
          <input
            type="text"
            name="apartment"
            placeholder={props.apartmentPlaceholder}
            value={formData.apartment}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.fullLineInput}>
          <input
            type="text"
            name="address"
            placeholder={props.addressPlaceholder}
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.suburbInputGroup}>
          <input
            type="text"
            name="suburb"
            placeholder={props.suburbPlaceholder}
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
            placeholder={props.postcodePlaceholder}
            value={formData.postcode}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.checkBoxGroup}>
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className={styles.checkboxInput}
            />
            <span dangerouslySetInnerHTML={{ __html: props.checkboxLabel }} />
          </label>
        </div>

        {alertMessage && (
          <p
            className={alertType === "success" ? "alertSuccess" : "alertError"}
          >
            {alertMessage}
          </p>
        )}
        <button
          type="submit"
          className="button-white"
          style={{ display: "block", margin: "0 auto" }}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export { MembershipForm };
