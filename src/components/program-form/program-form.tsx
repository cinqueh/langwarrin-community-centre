import React, { useState } from "react";
import styles from "./styles.module.css";

interface ProgramEnrollmentFormProps {
  title: string;
  subtitle: string;
  programInfoTitle: string;
  programOptions?: { option: string }[];
  contactInfoTitle: string;
  addressInfoTitle: string;
  termsConditionsTitle: string;
  termsConditionsText: string;
  accessCorrectionTitle: string;
  accessCorrectionText: string;
  termsCheckboxLabel: string;
  promotionCheckboxLabel: string;
  ageCheckboxLabel: string;
  linkUrl: string;
}

const ProgramEnrollmentForm = (props: ProgramEnrollmentFormProps) => {
  const [formData, setFormData] = useState({
    programName: "",
    courseSource: "",
    title: "",
    firstName: "",
    lastName: "",
    mobile: "",
    homePhone: "",
    email: "",
    gender: "",
    dob: "",
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyMobile: "",
    unitNo: "",
    streetName: "",
    city: "",
    postalCode: "",
    state: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToBond, setAgreedToBond] = useState(false);
  const [agreedToAge, setAgreedToAge] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!agreedToTerms || !agreedToBond || !agreedToAge) {
      alert(
        "Please agree to the terms and conditions. Please confirm your age and agree to the bond agreement."
      );
    }

    const allFieldsFilled = Object.entries(formData)
      .filter(([key]) => key !== "unitNo" && key !== "homePhone") // Exclude unitNo and homephone from the check
      .every(([_, value]) => value);

    if (allFieldsFilled) {
      console.log("Form submitted");
      window.location.href = props.linkUrl;
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Title and Subtitle */}
      <h1 className={styles.title}>{props.title}</h1>
      <h2 className={styles.subtitle}>{props.subtitle}</h2>

      {/* Program Information Section */}
      <h4>{props.programInfoTitle}</h4>
      <select name="programName" onChange={handleInputChange}>
        <option value="">Select a Program</option>
        {props.programOptions &&
          props.programOptions.map(
            (optionObj: { option: string }, index: number) => (
              <option key={index} value={optionObj.option}>
                {optionObj.option}
              </option>
            )
          )}
      </select>
      <input
        type="text"
        name="courseSource"
        placeholder="How did you hear about this course?"
        onChange={handleInputChange}
        required
      />

      {/* Contact Information Section */}
      <h4>{props.contactInfoTitle}</h4>
      <div className={styles.nameInputGroup}>
        <select name="title" onChange={handleInputChange}>
          <option value="">Title</option>
          <option value="Miss">Miss</option>
          <option value="Mr">Mr</option>
          <option value="Ms">Ms</option>
          <option value="Mrs">Mrs</option>
        </select>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleInputChange}
          required
        />
      </div>

      {/* More Contact Information */}
      <div className={styles.inputGroup}>
        <div className={styles.mobileInputWrapper}>
          <span className={styles.mobilePrefix}>+61 |</span>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            pattern="[0-9]*"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.mobileInputWrapper}>
          <span className={styles.mobilePrefix}>03 |</span>
          <input
            type="tel"
            name="homePhone"
            placeholder="Home Phone"
            required
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className={styles.emailAndGenderInputGroup}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleInputChange}
          required
        />
        <div>
          <select name="gender" onChange={handleInputChange}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Emergency Contact Section */}
      <h4>Emergency Contact Information</h4>
      <div className={styles.inputGroup}>
        <input
          type="text"
          name="emergencyFirstName"
          placeholder="First Name"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="emergencyLastName"
          placeholder="Last Name"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.mobileInputWrapper}>
        <span className={styles.mobilePrefix}>+61 |</span>
        <input
          type="tel"
          name="emergencyMobile"
          placeholder="Mobile"
          pattern="[0-9]*"
          required
          onChange={handleInputChange}
        />
      </div>

      {/* Address Section */}
      <h4>{props.addressInfoTitle}</h4>
      <input
        type="text"
        name="unitNo"
        placeholder="Unit No (Optional)"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="streetName"
        placeholder="Street Name"
        onChange={handleInputChange}
        required
      />
      <div className={styles.inputGroup}>
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          onChange={handleInputChange}
          required
        />
      </div>
      <select name="state" onChange={handleInputChange}>
        <option value="">State</option>
        <option value="VIC">VIC</option>
        <option value="NSW">NSW</option>
        <option value="QLD">QLD</option>
        <option value="WA">WA</option>
        <option value="SA">SA</option>
        <option value="TAS">TAS</option>
        <option value="ACT">ACT</option>
      </select>

      {/* Terms and Conditions */}
      <h4>{props.termsConditionsTitle}</h4>
      <span dangerouslySetInnerHTML={{ __html: props.termsConditionsText }} />

      {/* Access and Correction */}
      <h4>{props.accessCorrectionTitle}</h4>
      <span dangerouslySetInnerHTML={{ __html: props.accessCorrectionText }} />

      {/* Checkboxes */}
      <div className={styles.checkBoxGroup}>
        <label>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className={styles.checkboxInput}
          />
          <span
            dangerouslySetInnerHTML={{ __html: props.termsCheckboxLabel }}
          />
        </label>

        <label>
          <input
            type="checkbox"
            name="promotionAccepted"
            checked={agreedToBond}
            onChange={(e) => setAgreedToBond(e.target.checked)}
            className={styles.checkboxInput}
          />
          <span
            dangerouslySetInnerHTML={{ __html: props.promotionCheckboxLabel }}
          />
        </label>

        <label>
          <input
            type="checkbox"
            name="ageConfirmed"
            checked={agreedToAge}
            onChange={(e) => setAgreedToAge(e.target.checked)}
            className={styles.checkboxInput}
          />
          <span dangerouslySetInnerHTML={{ __html: props.ageCheckboxLabel }} />
        </label>
      </div>

      <button
        className="button-white"
        style={{ display: "block", margin: "0 auto" }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export { ProgramEnrollmentForm };
