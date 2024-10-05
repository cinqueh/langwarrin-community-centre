"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface AdditionalInfoFormProps {
  fields: {
    question: string;
    inputType: string;
    options?: { option: string }[];
    required: boolean;
  }[];
  linkUrl: string;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({
  fields,
  linkUrl,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const savedFormData = localStorage.getItem("AdditionalInfoFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextClick = () => {
    const missingRequiredFields = fields.some(
      (field) => field.required && !formData[field.question]
    );

    if (missingRequiredFields) {
      alert("Please fill out all required fields.");
    } else {
      localStorage.setItem("AdditionalInfoFormData", JSON.stringify(formData));
      window.location.href = linkUrl;
    }
  };

  return (
    <div className={styles.additionalInfoFormContainer}>
      {fields.map((field, index) => (
        <div key={index} className={styles.additionalInfoInputGroup}>
          <label>
            {field.question}
            {field.required && (
              <span className={styles.additionalInfoRequired}> *</span>
            )}
          </label>
          {field.inputType === "select" ? (
            <select
              name={field.question}
              value={formData[field.question] || ""}
              onChange={handleInputChange}
              required={field.required}
            >
              <option value="">--</option>
              {field.options &&
                field.options.map((optionObj, idx) => (
                  <option key={idx} value={optionObj.option}>
                    {optionObj.option}
                  </option>
                ))}
            </select>
          ) : (
            <input
              type="text"
              name={field.question}
              value={formData[field.question] || ""}
              onChange={handleInputChange}
              required={field.required}
            />
          )}
        </div>
      ))}
      <button
        className="button-white"
        style={{ display: "block", margin: "0 auto" }}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

export { AdditionalInfoForm };
