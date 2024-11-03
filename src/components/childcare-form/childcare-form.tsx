"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { ChildDTO } from '../../backend/dto/childcare/child';  
import { PersonDTO } from '../../backend/dto/person';
import { ChildcareInquiryDTO } from '../../backend/dto/inquiry';

interface ChildcareContactFormProps {
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
}

const ChildcareContactForm = (props: ChildcareContactFormProps) => {
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
    selectedDays: [] as string[],
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setFormData((prevData) => {
      const selectedDays = checked
        ? [...prevData.selectedDays, value]
        : prevData.selectedDays.filter((day) => day !== value);
      return { ...prevData, selectedDays };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const childDTO = new ChildDTO({
        childAge: parseInt(formData.childAge),
        childFirstName: formData.childFirstName,
        childSurname: formData.childLastName,
    });

    const personDTO = new PersonDTO({
        personId: 0,
        firstName: formData.firstName,
        surname: formData.lastName,
        email: formData.email,
        phoneNumber: formData.mobile,
        homeNumber: formData.homePhone,
        occupation: formData.occupation,
    });

    const selectedDaysString = formData.selectedDays.join(" ");

    const childcareInquiryDTO = new ChildcareInquiryDTO({
        date: new Date(),
        person: personDTO,
        child: childDTO,
        day: selectedDaysString,
        program: formData.program,
        notes: formData.message,
    });

    setIsLoading(true);

    try {
      const response = await fetch("/api/enquiry/childcare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(childcareInquiryDTO),
      });
  
      if (response.ok) {
        setAlertMessage("Form submitted and emails sent successfully!");
        setAlertType("success");
      } else {
        setAlertMessage("An error occurred while submitting the form. Please try again.");
        setAlertType("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertMessage("An error occurred while submitting the form. Please try again.");
      setAlertType("error");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>{props.title}</h3>
      <p className={styles.subtitle}>{props.subtitle}</p>
      <form onSubmit={handleSubmit}>
        <h5 className={styles.sectionTitle}>Parent Contact Information</h5>
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
          <input
            type="tel"
            name="homePhone"
            placeholder={props.homePhonePlaceholder}
            value={formData.homePhone}
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

        <h5 className={styles.sectionTitle}>Child&apos;s Information</h5>
        <div className={styles.nameInputGroup}>
          <input
            type="text"
            name="childAge"
            placeholder="Age"
            value={formData.childAge}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="childFirstName"
            placeholder={props.childFirstNamePlaceholder}
            value={formData.childFirstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="childLastName"
            placeholder={props.childLastNamePlaceholder}
            value={formData.childLastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.fullLineInput}>
          <select
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            className={styles.selectInput}
            required
          >
            <option value="">{props.programPlaceholder}</option>
            <option value="Koala Group">Koala Group</option>
            <option value="Possum Group">Possum Group</option>
          </select>
        </div>

        <p>Select Days</p>
        <div className={styles.checkBoxGroup}>
          {days.map((day) => (
            <label key={day} className={styles.dayLabel}>
              <input
                type="checkbox"
                value={day}
                checked={formData.selectedDays.includes(day)}
                onChange={handleCheckboxChange}
              />
              {day}
            </label>
          ))}
        </div>

        <textarea
          name="message"
          placeholder={props.messagePlaceholder}
          value={formData.message}
          onChange={handleInputChange}
          className={styles.messageTextarea}
        />

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

export { ChildcareContactForm };
