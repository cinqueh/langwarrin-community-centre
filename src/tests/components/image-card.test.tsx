import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgramImageCard, ImageCard } from '../../components/image-card/image-card'; // Adjust the import path based on your folder structure

describe('ProgramImageCard and ImageCard Components', () => {
  const defaultProps = {
    imageUrl: 'https://via.placeholder.com/300',
    altText: 'A placeholder image',
  };

  it('renders ProgramImageCard with correct src and alt attributes', () => {
    render(<ProgramImageCard {...defaultProps} />);

    // Check if the image is rendered with the correct src and alt text
    const programImageElement = screen.getByAltText(defaultProps.altText);
    expect(programImageElement).toBeInTheDocument();
    expect(programImageElement).toHaveAttribute('src', defaultProps.imageUrl);
  });

  it('applies correct styling to ProgramImageCard container', () => {
    render(<ProgramImageCard {...defaultProps} />);

    // Check if the outer container has the correct CSS class applied
    const programContainer = screen.getByAltText(defaultProps.altText).closest('div');
    expect(programContainer).toHaveClass('programImageCardContainer');
  });

  it('renders ImageCard with correct src and alt attributes', () => {
    render(<ImageCard {...defaultProps} />);

    // Check if the image is rendered with the correct src and alt text
    const imageElement = screen.getByAltText(defaultProps.altText);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', defaultProps.imageUrl);
  });

  it('applies correct styling to ImageCard container', () => {
    render(<ImageCard {...defaultProps} />);

    // Check if the outer container has the correct CSS class applied
    const imageContainer = screen.getByAltText(defaultProps.altText).closest('div');
    expect(imageContainer).toHaveClass('imageCardContainer');
  });
});