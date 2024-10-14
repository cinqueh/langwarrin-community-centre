import React, { useState } from "react";
import styles from "./styles.module.css";
import { PersonDTO, AddressDTO } from "../../backend/dto/person";
import {
  GeneralInquiryDTO,
  FeedbackInquiryDTO,
  ComplaintInquiryDTO,
} from "../../backend/dto/inquiry";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  addressTitle?: string;
  feedbackTitle?: string;
  complaintsTitle?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  title = "Contact Us",
  subtitle = "Got any suggestions or questions? Fill this form to reach out.",
  addressTitle = "Address",
  feedbackTitle = "Feedback & Compliments",
  complaintsTitle = "Complaints",
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    homePhone: "",
    enquiryType: "general",
    message: "",
    address: {
      apartment: "",
      street: "",
      suburb: "",
      state: "VIC",
      postcode: "",
    },
    feedbackProgramName: "",
    feedbackMessage: "",
    complaintsPersonName: "",
    complaintsReason: "",
    complaintsSolution: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setAlertMessage("")
  };

  const submitForm = async (url: string, dataToSubmit: any) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        setAlertMessage("Form submitted successfully!");
        setAlertType("success");
      } else {
        setAlertMessage(
          "An error occurred while submitting the form. Please try again."
        );
        setAlertType("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertMessage(
        "An error occurred while submitting the form. Please try again."
      );
      setAlertType("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const person = new PersonDTO({
      personId: 0,
      firstName: formData.firstName,
      surname: formData.lastName,
      email: formData.email,
      homeNumber: formData.homePhone,
      phoneNumber: formData.mobile,
      address: formData.address
        ? new AddressDTO({
            state: formData.address.state,
            streetAddress: formData.address.street,
            apartment: formData.address.apartment,
            suburb: formData.address.suburb,
            postcode: formData.address.postcode,
          })
        : undefined,
    });

    let dataToSubmit;

    // Handle general enquiry
    if (formData.enquiryType === "general") {
      dataToSubmit = new GeneralInquiryDTO({
        date: new Date(),
        person,
        message: formData.message,
      });
      await submitForm("/api/enquiry/general", dataToSubmit);
    }

    // Handle feedback enquiry
    if (formData.enquiryType === "feedback") {
      dataToSubmit = new FeedbackInquiryDTO({
        date: new Date(),
        person,
        programName: formData.feedbackProgramName,
        feedback: formData.feedbackMessage,
      });
      await submitForm("/api/enquiry/feedback", dataToSubmit);
    }

    // Handle complaints enquiry
    if (formData.enquiryType === "complaints") {
      dataToSubmit = new ComplaintInquiryDTO({
        date: new Date(),
        person,
        programName: formData.complaintsPersonName,
        grievanceReason: formData.complaintsReason,
        suggestedSolution: formData.complaintsSolution,
      });
      await submitForm("/api/enquiry/complaint", dataToSubmit);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>

      {/* First Name and Last Name */}
      <div className={styles.inputGroup}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Family Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email and Mobile */}
      <div className={styles.inputGroup}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className={styles.mobileInputWrapper}>
          <span className={styles.mobilePrefix}>+61 |</span>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Enquiry Type Dropdown */}
      <div className={styles.inputGroup}>
        <select
          name="enquiryType"
          aria-label="Enquiry Type"
          value={formData.enquiryType}
          onChange={handleChange}
        >
          <option value="general">General Enquiry</option>
          <option value="feedback">Feedback & Compliments</option>
          <option value="complaints">Complaints</option>
        </select>
        <div className={styles.mobileInputWrapper}>
          <span className={styles.mobilePrefix}>+61 |</span>
          <input
            type="tel"
            name="homePhone"
            placeholder="Home Phone"
            value={formData.homePhone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* General Enquirement field */}
      {formData.enquiryType === "general" && (
        <div className={styles.fullLineInput}>
          <label htmlFor="message">Enter your message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {/* Address fields for Feedback & Complaints */}
      {(formData.enquiryType === "feedback" ||
        formData.enquiryType === "complaints") && (
        <>
          <h2 className={styles.sectionTitle}>{addressTitle}</h2>
          <div className={styles.fullLineInput}>
            <input
              type="text"
              name="apartment"
              placeholder="Apartment, Unit No., Suite, etc (Optional)"
              value={formData.address.apartment}
              onChange={handleChange}
            />
          </div>
          <div className={styles.fullLineInput}>
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.address.street}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.addressInputGroup}>
            <input
              type="text"
              name="suburb"
              placeholder="Suburb"
              value={formData.address.suburb}
              onChange={handleChange}
              required
            />
            <select
              name="state"
              value={formData.address.state}
              onChange={handleChange}
              required
            >
              <option value="VIC">VIC</option>
              <option value="NSW">NSW</option>
              <option value="QLD">QLD</option>
              <option value="SA">SA</option>
              <option value="WA">WA</option>
              <option value="TAS">TAS</option>
              <option value="NT">NT</option>
              <option value="ACT">ACT</option>
            </select>
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={formData.address.postcode}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      {/* Feedback & Compliments */}
      {formData.enquiryType === "feedback" && (
        <>
          <h2 className={styles.sectionTitle}>{feedbackTitle}</h2>
          <div className={styles.fullLineInput}>
            <input
              type="text"
              name="feedbackProgramName"
              placeholder="Name of program"
              value={formData.feedbackProgramName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.fullLineInput}>
            <label htmlFor="feedbackMessage">Feedback</label>
            <textarea
              id="feedbackMessage"
              name="feedbackMessage"
              value={formData.feedbackMessage}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      {/* Complaints */}
      {formData.enquiryType === "complaints" && (
        <>
          <h2 className={styles.sectionTitle}>{complaintsTitle}</h2>
          <div className={styles.fullLineInput}>
            <input
              type="text"
              name="complaintsPersonName"
              placeholder="Name of person/s complaint is in regards to"
              value={formData.complaintsPersonName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.fullLineInput}>
            <label htmlFor="complaintsReason">
              Please state the reason for the grievance and/or why you feel you
              may have been unfairly treated
            </label>
            <textarea
              id="complaintsReason"
              name="complaintsReason"
              value={formData.complaintsReason}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.fullLineInput}>
            <label htmlFor="complaintsSolution">
              Your suggestions for a solution
            </label>
            <textarea
              id="complaintsSolution"
              name="complaintsSolution"
              value={formData.complaintsSolution}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}
      {alertMessage && (
        <p className={alertType === "success" ? "alertSuccess" : "alertError"}>
          {alertMessage}
        </p>
      )}
      <button
        type="submit"
        className="button-white"
        style={{ display: "block", margin: "0 auto" }}
      >
        Send
      </button>
    </form>
  );
};

export { ContactForm };
