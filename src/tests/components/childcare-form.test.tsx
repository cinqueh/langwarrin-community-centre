import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChildcareContactForm } from '../../components/childcare-form/childcare-form';

// Default props to pass into the component
const defaultProps = {
  title: 'Childcare: Contact Us',
  subtitle: 'Want to enrol your child in the childcare program? Fill out this form now.',
  firstNamePlaceholder: 'First Name',
  lastNamePlaceholder: 'Last Name',
  emailPlaceholder: 'Enter your email',
  mobilePlaceholder: 'Mobile',
  homePhonePlaceholder: 'Home Phone',
  occupationPlaceholder: 'Previous/Current Occupation',
  childFirstNamePlaceholder: "Child's First Name",
  childLastNamePlaceholder: "Child's Last Name",
  programPlaceholder: 'Select a program', // Updated to match the option text
  messagePlaceholder: 'Enter your message',
  submitButtonText: 'Submit',
};

describe('ChildcareContactForm Component', () => {
  it('renders correctly with given props', () => {
    render(<ChildcareContactForm {...defaultProps} />);
    // Check all input placeholders for existence
    expect(screen.getByPlaceholderText(defaultProps.firstNamePlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.lastNamePlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.emailPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.mobilePlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.homePhonePlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.occupationPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.childFirstNamePlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.childLastNamePlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.messagePlaceholder)).toBeInTheDocument();
    
    // Check dropdown by default option text instead of placeholder
    expect(screen.getByText('Select a program')).toBeInTheDocument();

    // Check for the button text
    expect(screen.getByText(defaultProps.submitButtonText)).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(<ChildcareContactForm {...defaultProps} />);

    // Select input fields
    const firstNameInput = screen.getByPlaceholderText(defaultProps.firstNamePlaceholder);
    const lastNameInput = screen.getByPlaceholderText(defaultProps.lastNamePlaceholder);
    const mobileInput = screen.getByPlaceholderText(defaultProps.mobilePlaceholder);
    const emailInput = screen.getByPlaceholderText(defaultProps.emailPlaceholder);
    const occupationInput = screen.getByPlaceholderText(defaultProps.occupationPlaceholder);
    const childFirstNameInput = screen.getByPlaceholderText(defaultProps.childFirstNamePlaceholder);
    const childLastNameInput = screen.getByPlaceholderText(defaultProps.childLastNamePlaceholder);
    const messageTextarea = screen.getByPlaceholderText(defaultProps.messagePlaceholder);

    // Select dropdown input
    const programSelect = screen.getByText('Select a program');

    // Fire change events to simulate input
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(mobileInput, { target: { value: '0498765432' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(occupationInput, { target: { value: 'Teacher' } });
    fireEvent.change(childFirstNameInput, { target: { value: 'Jane' } });
    fireEvent.change(childLastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(messageTextarea, { target: { value: 'Looking for childcare information' } });
    fireEvent.change(programSelect, { target: { value: 'Koala Group' } });

    // Verify values after the change
    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(mobileInput).toHaveValue('0498765432');
    expect(emailInput).toHaveValue('john.doe@example.com');
    expect(occupationInput).toHaveValue('Teacher');
    expect(childFirstNameInput).toHaveValue('Jane');
    expect(childLastNameInput).toHaveValue('Doe');
    expect(messageTextarea).toHaveValue('Looking for childcare information');
    expect(programSelect).toHaveValue('Koala Group');
  });
});