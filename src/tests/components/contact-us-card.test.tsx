import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactUs from '../../components/contact-us/contact-us-card'; // Adjust the path as necessary

describe('ContactUs Component', () => {
  const defaultProps = {
    title: 'Contact Us',
    subtitle: 'Fill in the form to get in touch',
    firstNamePlaceholder: 'First Name',
    familyNamePlaceholder: 'Family Name',
    emailPlaceholder: 'Enter your email',
    mobilePlaceholder: 'Mobile Number',
    subjectPlaceholder: 'Select a subject',
    messagePlaceholder: 'Your message',
    sendButtonText: 'Send',
    imageSrc: '/images/contact-us.png', // Example image path
    imageAlt: 'Contact Us',
  };

  it('renders correctly with given props', () => {
    render(<ContactUs {...defaultProps} />);

    // Check if the component's title, subtitle, and placeholders are rendered correctly
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.firstNamePlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.familyNamePlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.emailPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.mobilePlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.messagePlaceholder)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: defaultProps.sendButtonText })).toBeInTheDocument();
  });

  it('handles form input changes correctly', () => {
    render(<ContactUs {...defaultProps} />);

    // Query the input fields
    const firstNameInput = screen.getByPlaceholderText(defaultProps.firstNamePlaceholder);
    const familyNameInput = screen.getByPlaceholderText(defaultProps.familyNamePlaceholder);
    const emailInput = screen.getByPlaceholderText(defaultProps.emailPlaceholder);
    const mobileInput = screen.getByPlaceholderText(defaultProps.mobilePlaceholder);
    const subjectSelect = screen.getByRole('combobox');
    const messageTextarea = screen.getByPlaceholderText(defaultProps.messagePlaceholder);

    // Simulate user input
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(familyNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(mobileInput, { target: { value: '0400123456' } });
    fireEvent.change(subjectSelect, { target: { value: 'Support' } });
    fireEvent.change(messageTextarea, { target: { value: 'I need help with my account.' } });

    // Assert that the values have been updated correctly
    expect(firstNameInput).toHaveValue('John');
    expect(familyNameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('john.doe@example.com');
    expect(mobileInput).toHaveValue('0400123456');
    expect(subjectSelect).toHaveValue('Support');
    expect(messageTextarea).toHaveValue('I need help with my account.');
  });

  it('submits the form correctly', () => {
    render(<ContactUs {...defaultProps} />);

    // Query the input fields and button
    const firstNameInput = screen.getByPlaceholderText(defaultProps.firstNamePlaceholder);
    const familyNameInput = screen.getByPlaceholderText(defaultProps.familyNamePlaceholder);
    const emailInput = screen.getByPlaceholderText(defaultProps.emailPlaceholder);
    const mobileInput = screen.getByPlaceholderText(defaultProps.mobilePlaceholder);
    const subjectSelect = screen.getByRole('combobox');
    const messageTextarea = screen.getByPlaceholderText(defaultProps.messagePlaceholder);
    const submitButton = screen.getByRole('button', { name: defaultProps.sendButtonText });

    // Simulate user input
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(familyNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(mobileInput, { target: { value: '0400123456' } });
    fireEvent.change(subjectSelect, { target: { value: 'Support' } });
    fireEvent.change(messageTextarea, { target: { value: 'I need help with my account.' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Assert form data (you can adjust this assertion based on your form submission logic)
    expect(firstNameInput).toHaveValue('John');
    expect(familyNameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('john.doe@example.com');
    expect(mobileInput).toHaveValue('0400123456');
    expect(subjectSelect).toHaveValue('Support');
    expect(messageTextarea).toHaveValue('I need help with my account.');
  });
});