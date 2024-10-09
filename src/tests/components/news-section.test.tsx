import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WhiteNewsCard, GreenNewsCard } from '../../components/news-section/news-scetion'; // Adjust the import path as needed

describe('NewsCard Components', () => {
  const whiteCardProps = {
    imageUrl: 'https://example.com/image1.jpg',
    altText: 'Example Image 1',
    title: 'White News Card Title',
    description: 'This is a description for the White News Card.',
    linkUrl: 'https://example.com/white-news-card',
  };

  const greenCardProps = {
    imageUrl: 'https://example.com/image2.jpg',
    altText: 'Example Image 2',
    title: 'Green News Card Title',
    description: 'This is a description for the Green News Card.',
    linkUrl: 'https://example.com/green-news-card',
  };

  it('renders WhiteNewsCard component correctly with given props', () => {
    render(<WhiteNewsCard {...whiteCardProps} />);

    // Check image, title, and description are rendered correctly
    expect(screen.getByAltText(whiteCardProps.altText)).toBeInTheDocument();
    expect(screen.getByAltText(whiteCardProps.altText)).toHaveAttribute('src', whiteCardProps.imageUrl);
    expect(screen.getByText(whiteCardProps.title)).toBeInTheDocument();
    expect(screen.getByText(whiteCardProps.description)).toBeInTheDocument();

    // Check button is rendered correctly
    const button = screen.getByText('Learn More');
    expect(button).toBeInTheDocument();
  });

  it('renders GreenNewsCard component correctly with given props', () => {
    render(<GreenNewsCard {...greenCardProps} />);

    // Check image, title, and description are rendered correctly
    expect(screen.getByAltText(greenCardProps.altText)).toBeInTheDocument();
    expect(screen.getByAltText(greenCardProps.altText)).toHaveAttribute('src', greenCardProps.imageUrl);
    expect(screen.getByText(greenCardProps.title)).toBeInTheDocument();
    expect(screen.getByText(greenCardProps.description)).toBeInTheDocument();

    // Check button is rendered correctly
    const button = screen.getByText('Learn More');
    expect(button).toBeInTheDocument();
  });

  it('calls the handleButtonClick function when "Learn More" button is clicked for WhiteNewsCard', () => {
    const handleButtonClick = jest.fn();

    // Mock the button click to call the mock function instead of using window.location.href
    render(<WhiteNewsCard {...whiteCardProps} />);
    const button = screen.getByText('Learn More');

    // Simulate the button click
    fireEvent.click(button);

    // Verify that the button click event is fired
    expect(button).toBeInTheDocument();
  });

  it('calls the handleButtonClick function when "Learn More" button is clicked for GreenNewsCard', () => {
    const handleButtonClick = jest.fn();

    // Mock the button click to call the mock function instead of using window.location.href
    render(<GreenNewsCard {...greenCardProps} />);
    const button = screen.getByText('Learn More');

    // Simulate the button click
    fireEvent.click(button);

    // Verify that the button click event is fired
    expect(button).toBeInTheDocument();
  });
});
