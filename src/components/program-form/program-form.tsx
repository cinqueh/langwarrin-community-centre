import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ProgramInformation from "@/backend/dto/program";
import { AddressDTO, PersonDTO } from "@/backend/dto/person";
import { ProgramCourseInquiryDTO } from "@/backend/dto/inquiry";

interface ProgramEnrollmentFormProps {
  title: string;
  subtitle: string;
  programInfoTitle: string;
  contactInfoTitle: string;
  addressInfoTitle: string;
  termsConditionsTitle: string;
  termsConditionsText: string;
  accessCorrectionTitle: string;
  accessCorrectionText: string;
  termsCheckboxLabel: string;
  promotionCheckboxLabel: string;
  ageCheckboxLabel: string;
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
  const [programs, setPrograms] = useState<ProgramInformation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  // Fetch programs from the API and filter bookable programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/program"); // Adjust the endpoint if needed
        const data = await response.json();

        // Filter the bookable programs
        const bookablePrograms = data.filter(
          (program: ProgramInformation) => program.bookable
        );

        // Update state with the bookable programs
        setPrograms(bookablePrograms);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreedToTerms && agreedToBond && agreedToAge) {
      onSubmit(e);
    } else {
      setAlertMessage("Please agree to all the terms and conditions.");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const personInfo = {
      personId: 0,
      firstName: formData.firstName,
      surname: formData.lastName,
      email: formData.email,
      phoneNumber: formData.mobile,
      homeNumber: formData.homePhone,
      occupation: "",
      address: new AddressDTO({
        state: formData.state,
        streetAddress: formData.streetName,
        apartment: formData.unitNo,
        suburb: formData.city,
        postcode: formData.postalCode,
      }),
    };

    const programCourseInquiryDTO = new ProgramCourseInquiryDTO({
      date: new Date(),
      person: new PersonDTO(personInfo),
      programName: formData.programName,
      emergencyFirstName: formData.emergencyFirstName,
      emergencySurName: formData.emergencyLastName,
      emergencyNumber: formData.emergencyMobile,
      howHeardAboutProgram: formData.courseSource,
    });

    setIsLoading(true);

    // Send form data to backend API
    try {
      const response = await fetch("/api/enquiry/programcourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(programCourseInquiryDTO),
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {/* Title and Subtitle */}
      <h1 className={styles.title}>{props.title}</h1>
      <h2 className={styles.subtitle}>{props.subtitle}</h2>

      {/* Program Information Section */}
      <h4 className={styles.sectionTitle}>{props.programInfoTitle}</h4>
      <select
        name="programName"
        value={formData.programName}
        onChange={handleInputChange}
        required
      >
        <option value="">Select a Program</option>
        {programs.map((program, index) => (
          <option key={index} value={program.name}>
            {program.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="courseSource"
        placeholder="How did you hear about this course?"
        onChange={handleInputChange}
        required
      />

      {/* Contact Information Section */}
      <h4 className={styles.sectionTitle}>{props.contactInfoTitle}</h4>
      <div className={styles.nameInputGroup}>
        <select name="title" onChange={handleInputChange} required>
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
          <select name="gender" onChange={handleInputChange} required>
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
      <h4 className={styles.sectionTitle}>Emergency Contact Information</h4>
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
      <h4 className={styles.sectionTitle}>{props.addressInfoTitle}</h4>
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
      <select name="state" onChange={handleInputChange} required>
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
      <h4 className={styles.sectionTitle}>{props.termsConditionsTitle}</h4>
      <span dangerouslySetInnerHTML={{ __html: props.termsConditionsText }} />

      {/* Access and Correction */}
      <h4 className={styles.sectionTitle}>{props.accessCorrectionTitle}</h4>
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

      {alertMessage && (
        <p className={alertType === "success" ? "alertSuccess" : "alertError"}>
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
  );
};

export { ProgramEnrollmentForm };
