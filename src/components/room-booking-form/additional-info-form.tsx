"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface AdditionalInfoFormProps {
  linkUrl: string;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ linkUrl }) => {
  const [formData, setFormData] = useState({
    hirePurpose: "",
    forOrganisation: "",
    organisationAddress: "",
    estimatedAttendance: "",
    specialRequirements: "",
    willLiquorBeConsumed: "",
    howHearAboutSpace: "",
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem("additionalInfoFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("additionalInfoFormData", JSON.stringify(formData));
    window.location.href = linkUrl;
  };

  return (
    <form className={styles.additionalInfoFormContainer} onSubmit={handleSubmit}>
      <div className={styles.additionalInfoInputGroup}>
        <label>
          Purpose of the hire
          <span className={styles.additionalInfoRequired}> *</span>
        </label>
        <input
          type="text"
          name="hirePurpose"
          value={formData.hirePurpose}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label style={{ marginTop: "20px" }}>
          Are you booking for an organisation?
          <span className={styles.additionalInfoRequired}> *</span>
        </label>
        <select
          name="forOrganisation" 
          value={formData.forOrganisation}
          onChange={handleInputChange}
          required
        >
          <option value="">--</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Conditionally display organisation address if "Yes" is selected */}
      {formData.forOrganisation === "Yes" && (
        <div className={styles.additionalInfoInputGroup}>
          <label>If yes, what is your organisation address?</label>
          <input
            type="text"
            name="organisationAddress" 
            value={formData.organisationAddress}
            onChange={handleInputChange}
          />
        </div>
      )}

      <div className={styles.additionalInfoInputGroup}>
        <label>
          Number Attending
          <span className={styles.additionalInfoRequired}> *</span>
        </label>
        <input
          type="number"
          name="estimatedAttendance" 
          value={formData.estimatedAttendance}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.additionalInfoInputGroup}>
        <label>Special Requirements</label>
        <input
          type="text"
          name="specialRequirements" 
          value={formData.specialRequirements}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label style={{ marginTop: "20px" }}>
          Will liquor be consumed at this function?
          <span className={styles.additionalInfoRequired}> *</span>
        </label>
        <select
          name="willLiquorBeConsumed" 
          value={formData.willLiquorBeConsumed}
          onChange={handleInputChange}
          required
        >
          <option value="">--</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Not Sure">Not Sure</option>
        </select>
      </div>

      <div className={styles.additionalInfoInputGroup}>
        <label>
          How did you hear about the space?
          <span className={styles.additionalInfoRequired}> *</span>
        </label>
        <input
          type="text"
          name="howHearAboutSpace" 
          value={formData.howHearAboutSpace}
          onChange={handleInputChange}
          required
        />
      </div>

      <button
        type="submit"
        className="button-white"
        style={{ display: "block", margin: "0 auto" }}
      >
        Save
      </button>
    </form>
  );
};

export { AdditionalInfoForm };