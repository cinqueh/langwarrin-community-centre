import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainBanner from '../../components/main-banner/main-banner'; // Adjust the import path based on your folder structure


jest.mock('next/font/google', () => ({
  Anton: () => ({ className: 'ignored-anton-font' }),
}));

describe('MainBanner Component', () => {
  const defaultProps = {
    title: 'Welcome to Our Community Centre',
    subtitle: 'Empowering the Community',
    subText: 'Join us and make a difference',
    buttonText: 'Learn More',
    linkUrl: '/learn-more',
    note: '* Terms and conditions apply',
  };

  it('renders the MainBanner component with given props', () => {
    render(<MainBanner {...defaultProps} />);

    // Check if all text elements are rendered
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subText)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.buttonText)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.note)).toBeInTheDocument();
  });

  it('calls a custom handler when the button is clicked', () => {
    // Create a mock function to simulate button click
    const mockButtonClickHandler = jest.fn();
    
    // Render the component with a custom click handler
    render(
      <button onClick={mockButtonClickHandler}>
        {defaultProps.buttonText}
      </button>
    );

    // Find the button and simulate a click
    const button = screen.getByText(defaultProps.buttonText);
    fireEvent.click(button);

    // Check if the mock function was called
    expect(mockButtonClickHandler).toHaveBeenCalledTimes(1);
  });
});