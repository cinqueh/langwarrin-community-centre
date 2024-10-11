import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GovernmentCard } from '../../components/government-card/government-card'; // Adjust the import path if necessary

describe('GovernmentCard Component', () => {
  const defaultProps = {
    title: 'Government Initiatives',
    subheading: 'Supporting the Community',
    image1: 'https://via.placeholder.com/150',
    altText1: 'Placeholder Image 1',
    image2: 'https://via.placeholder.com/150',
    altText2: 'Placeholder Image 2',
    image3: 'https://via.placeholder.com/150',
    altText3: 'Placeholder Image 3',
    image4: 'https://via.placeholder.com/150',
    altText4: 'Placeholder Image 4',
    image5: 'https://via.placeholder.com/150',
    altText5: 'Placeholder Image 5',
    image6: 'https://via.placeholder.com/150',
    altText6: 'Placeholder Image 6',
    list: '<ul><li>Support Program 1</li><li>Support Program 2</li></ul>', // Optional list for testing
  };

  it('renders the GovernmentCard with the provided title and subheading', () => {
    render(<GovernmentCard {...defaultProps} />);
    
    // Check if the title is rendered
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    
    // Check if the subheading is rendered
    expect(screen.getByText(defaultProps.subheading)).toBeInTheDocument();
  });

  it('renders all the images with the correct alt text', () => {
    render(<GovernmentCard {...defaultProps} />);

    // Check each image for correct alt text
    expect(screen.getByAltText(defaultProps.altText1)).toHaveAttribute('src', defaultProps.image1);
    expect(screen.getByAltText(defaultProps.altText2)).toHaveAttribute('src', defaultProps.image2);
    expect(screen.getByAltText(defaultProps.altText3)).toHaveAttribute('src', defaultProps.image3);
    expect(screen.getByAltText(defaultProps.altText4)).toHaveAttribute('src', defaultProps.image4);
    expect(screen.getByAltText(defaultProps.altText5)).toHaveAttribute('src', defaultProps.image5);
    expect(screen.getByAltText(defaultProps.altText6)).toHaveAttribute('src', defaultProps.image6);
  });

  it('renders the optional list correctly when provided', () => {
    render(<GovernmentCard {...defaultProps} />);

    // Check if the list is rendered correctly when provided
    const listElement = screen.getByText('Support Program 1');
    expect(listElement).toBeInTheDocument();
    expect(listElement.closest('ul')).toContainHTML(defaultProps.list);
  });

  it('does not render the list when the list prop is empty or not provided', () => {
    const { container } = render(
      <GovernmentCard
        {...defaultProps}
        list="" // Override the list prop to be empty
      />
    );

    // Check that no list is rendered
    expect(container.querySelector('.listParagraph')).toBeNull();
  });
});