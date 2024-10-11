import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  FormDownloadCard,
  DarkGreenProgramCard,
  MediumGreenProgramCard,
  LightGreenProgramCard,
} from '../../components/programs/programs-card'; // Adjust the path to your component

describe('Program Cards Components', () => {
  const formDownloadProps = {
    title: 'Download Form',
    description: 'Click to download the membership form.',
    buttonText: 'Download Now',
    linkUrl: 'https://example.com/download-form',
  };

  const darkGreenCardProps = {
    imageUrl: 'https://example.com/dark-green.jpg',
    altText: 'Dark Green Program Image',
    title: 'Dark Green Program',
    linkUrl: 'https://example.com/dark-green-program',
  };

  const mediumGreenCardProps = {
    imageUrl: 'https://example.com/medium-green.jpg',
    altText: 'Medium Green Program Image',
    title: 'Medium Green Program',
    linkUrl: 'https://example.com/medium-green-program',
  };

  const lightGreenCardProps = {
    imageUrl: 'https://example.com/light-green.jpg',
    altText: 'Light Green Program Image',
    title: 'Light Green Program',
    linkUrl: 'https://example.com/light-green-program',
  };

  it('renders FormDownloadCard correctly with given props', () => {
    render(<FormDownloadCard {...formDownloadProps} />);

    // Check if the title, description, and button are displayed correctly
    expect(screen.getByText(formDownloadProps.title)).toBeInTheDocument();
    expect(screen.getByText(formDownloadProps.description)).toBeInTheDocument();
    const button = screen.getByText(formDownloadProps.buttonText);
    expect(button).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(button);
  });

  it('renders DarkGreenProgramCard correctly with given props', () => {
    render(<DarkGreenProgramCard {...darkGreenCardProps} />);

    // Check if the image, title, and button are displayed correctly
    expect(screen.getByAltText(darkGreenCardProps.altText)).toBeInTheDocument();
    expect(screen.getByText(darkGreenCardProps.title)).toBeInTheDocument();
    const button = screen.getByText('More Info');
    expect(button).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(button);
  });

  it('renders MediumGreenProgramCard correctly with given props', () => {
    render(<MediumGreenProgramCard {...mediumGreenCardProps} />);

    // Check if the image, title, and button are displayed correctly
    expect(screen.getByAltText(mediumGreenCardProps.altText)).toBeInTheDocument();
    expect(screen.getByText(mediumGreenCardProps.title)).toBeInTheDocument();
    const button = screen.getByText('More Info');
    expect(button).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(button);
  });

  it('renders LightGreenProgramCard correctly with given props', () => {
    render(<LightGreenProgramCard {...lightGreenCardProps} />);

    // Check if the image, title, and button are displayed correctly
    expect(screen.getByAltText(lightGreenCardProps.altText)).toBeInTheDocument();
    expect(screen.getByText(lightGreenCardProps.title)).toBeInTheDocument();
    const button = screen.getByText('More Info');
    expect(button).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(button);
  });
});
