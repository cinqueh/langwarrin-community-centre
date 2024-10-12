import React, { useState } from "react";
import styles from "./styles.module.css"; // Import the CSS module

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields (general fields for all types)
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile
    ) {
      alert("Please fill in all required general information.");
      return;
    }

    // Validate the address if enquiryType is feedback or complaints
    if (
      (formData.enquiryType === "feedback" ||
        formData.enquiryType === "complaints") &&
      (!formData.address.street ||
        !formData.address.suburb ||
        !formData.address.state ||
        !formData.address.postcode)
    ) {
      console.log(formData.address);
      alert("Please fill in the address information.");
      return;
    }

    // Initialize the form data to submit with the common fields
    let dataToSubmit: any = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobile: formData.mobile,
      homePhone: formData.homePhone,
    };

    // Handle general enquiry
    if (formData.enquiryType === "general") {
      if (!formData.message) {
        alert("Please enter your message for General Enquiry.");
        return;
      }
      dataToSubmit.message = formData.message; // For general enquiry
    }

    // Handle feedback
    if (formData.enquiryType === "feedback") {
      if (!formData.feedbackProgramName || !formData.feedbackMessage) {
        alert("Please provide the program name and feedback.");
        return;
      }

      // Add address, programName, and feedbackMessage
      dataToSubmit.address = formData.address;
      dataToSubmit.programName = formData.feedbackProgramName;
      dataToSubmit.feedback = formData.feedbackMessage;
    }

    // Handle complaints
    if (formData.enquiryType === "complaints") {
      if (
        !formData.complaintsPersonName ||
        !formData.complaintsReason ||
        !formData.complaintsSolution
      ) {
        alert("Please provide all required information for Complaints.");
        return;
      }

      // Add address, programName, grievanceReason, and suggestedSolution
      dataToSubmit.address = formData.address;
      dataToSubmit.programName = formData.complaintsPersonName;
      dataToSubmit.grievanceReason = formData.complaintsReason;
      dataToSubmit.suggestedSolution = formData.complaintsSolution;
    }

    // Submit form data
    console.log("Form submitted", dataToSubmit);
    alert("Form submitted successfully!");
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
        />
        <input
          type="text"
          name="lastName"
          placeholder="Family Name"
          value={formData.lastName}
          onChange={handleChange}
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
        />
        <div className={styles.mobileInputWrapper}>
          <span className={styles.mobilePrefix}>+61 |</span>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
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
            />
          </div>
          <div className={styles.addressInputGroup}>
            <input
              type="text"
              name="suburb"
              placeholder="Suburb"
              value={formData.address.suburb}
              onChange={handleChange}
            />
            <select
              name="state"
              value={formData.address.state}
              onChange={handleChange}
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
            />
          </div>
          <div className={styles.fullLineInput}>
            <label htmlFor="feedbackMessage">Feedback</label>
            <textarea
              id="feedbackMessage"
              name="feedbackMessage"
              value={formData.feedbackMessage}
              onChange={handleChange}
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
            />
          </div>
        </>
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
