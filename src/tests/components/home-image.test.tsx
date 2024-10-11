import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackgroundSection from '../../components/home-image/home-image'; // Adjust the import path based on your folder structure

describe('BackgroundSection Component', () => {
  const defaultProps = {
    imageUrl: 'https://via.placeholder.com/1200x600',
    altText: 'A beautiful placeholder image',
  };

  it('renders the image with the correct src and alt text', () => {
    render(<BackgroundSection {...defaultProps} />);

    // Check if the image is rendered with the correct src and alt text
    const imageElement = screen.getByAltText(defaultProps.altText);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', defaultProps.imageUrl);
  });

  it('applies correct styling to the image container', () => {
    render(<BackgroundSection {...defaultProps} />);

    // Check if the outer container has the correct CSS class applied
    const container = screen.getByAltText(defaultProps.altText).closest('div');
    expect(container).toHaveClass('backgroundSection');
  });
});
