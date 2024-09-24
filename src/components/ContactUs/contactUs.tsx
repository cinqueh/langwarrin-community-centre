"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";

type ContactUsProps = {
  title: string;
  subtitle: string;
  firstNamePlaceholder: string;
  familyNamePlaceholder: string;
  emailPlaceholder: string;
  mobilePlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  sendButtonText: string;
  imageSrc: string;
  imageAlt: string;
};

const ContactUs: React.FC<ContactUsProps> = ({
  title,
  subtitle,
  firstNamePlaceholder,
  familyNamePlaceholder,
  emailPlaceholder,
  mobilePlaceholder,
  subjectPlaceholder,
  messagePlaceholder,
  sendButtonText,
  imageSrc,
  imageAlt,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    familyName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };
return (
    <div className={styles.contactUsContainer}>
      <div className={styles.contactForm}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
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
              name="familyName"
              placeholder={familyNamePlaceholder}
              value={formData.familyName}
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
          </div>
<select
            name="subject"
            className={styles.subjectSelect}
            value={formData.subject}
            onChange={handleInputChange}
            required
          >
            <option value="">{subjectPlaceholder}</option>
            <option value="General Enquiry">General Enquiry</option>
            <option value="Feedback">Feedback</option>
            <option value="Support">Support</option>
          </select>
          <textarea
            name="message"
            placeholder={messagePlaceholder}
            value={formData.message}
            onChange={handleInputChange}
            className={styles.messageTextarea}
            required
          />
          <button type="submit" className={styles.sendButton}>
            {sendButtonText}
          </button>
        </form>
      </div>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={imageAlt} className={styles.sideImage} />
      </div>
    </div>
  );
};

export default ContactUs;