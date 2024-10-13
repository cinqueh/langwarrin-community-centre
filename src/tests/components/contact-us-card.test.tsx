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

    fireEvent.change(screen.getByLabelText("Enquiry Type"), {
      target: { value: "general" },
    });

    expect(screen.getByLabelText("Enter your message")).toBeInTheDocument();
  });

  it("shows feedback fields when Feedback & Compliments is selected", () => {
    render(<ContactForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Enquiry Type"), {
      target: { value: "feedback" },
    });

    expect(screen.getByPlaceholderText("Name of program")).toBeInTheDocument();
    expect(screen.getByLabelText("Feedback")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.addressTitle)).toBeInTheDocument(); // Address section is present
  });

  it("shows complaints fields when Complaints is selected", () => {
    render(<ContactForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Enquiry Type"), {
      target: { value: "complaints" },
    });

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

  it("submits the form successfully for General Enquiry", () => {
    render(<ContactForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Enquiry Type"), {
      target: { value: "general" },
    });

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Family Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mobile"), {
      target: { value: "0400123456" },
    });
    fireEvent.change(screen.getByLabelText("Enter your message"), {
      target: { value: "This is a general enquiry." },
    });

    fireEvent.click(screen.getByRole("button", { name: /send/i }));
  });
});