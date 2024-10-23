import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContactForm } from '../../components/contact-us/contact-us-card'; // Adjust the path as necessary

describe("ContactForm Component", () => {
  const defaultProps = {
    title: "Contact Us",
    subtitle: "Got any suggestions or questions? Fill this form to reach out.",
    addressTitle: "Address",
    feedbackTitle: "Feedback & Compliments",
    complaintsTitle: "Complaints",
  };

  it("renders the form with default props", () => {
    render(<ContactForm {...defaultProps} />);

    // Check if all main components are rendered
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Family Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mobile")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Home Phone")).toBeInTheDocument();
  });

  it("shows message textarea for General Enquiry", () => {
    render(<ContactForm {...defaultProps} />);

    // Change the Enquiry Type to General
    fireEvent.change(screen.getByLabelText("Enquiry Type"), {
      target: { value: "general" },
    });

    // Check that the message textarea is visible for General Enquiry
    expect(screen.getByLabelText("Enter your message")).toBeInTheDocument();
  });

  it("shows feedback fields when Feedback & Compliments is selected", () => {
    render(<ContactForm {...defaultProps} />);

    // Change the Enquiry Type to Feedback
    fireEvent.change(screen.getByLabelText("Enquiry Type"), {
      target: { value: "feedback" },
    });

    // Check that feedback-specific fields are visible
    expect(screen.getByPlaceholderText("Name of program")).toBeInTheDocument();
    expect(screen.getByLabelText("Feedback")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.addressTitle)).toBeInTheDocument(); // Address section is present
  });

  it("shows complaints fields when Complaints is selected", () => {
    render(<ContactForm {...defaultProps} />);

    // Change the Enquiry Type to Complaints
    fireEvent.change(screen.getByLabelText("Enquiry Type"), {
      target: { value: "complaints" },
    });

    // Check that complaints-specific fields are visible
    expect(
      screen.getByPlaceholderText("Name of person/s complaint is in regards to")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        "Please state the reason for the grievance and/or why you feel you may have been unfairly treated"
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Your suggestions for a solution")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.addressTitle)).toBeInTheDocument(); // Address section is present
  });
});