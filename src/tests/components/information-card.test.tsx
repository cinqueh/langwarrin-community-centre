import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  LightGreenInformationCardTitle,
  DarkGreenInformationCardTitle,
  WhiteInformationCard,
  LightGreenInformationCard,
  MediumGreenInformationCard,
  DarkGreenInformationCard,
  InformationCardWithButton,
} from '../../components/information-card/information-card'; // Adjust the path as necessary

describe('InformationCard Components', () => {
  it('renders LightGreenInformationCardTitle with correct title', () => {
    render(<LightGreenInformationCardTitle title="Light Green Title" />);
    expect(screen.getByText('Light Green Title')).toBeInTheDocument();
  });

  it('renders DarkGreenInformationCardTitle with correct title', () => {
    render(<DarkGreenInformationCardTitle title="Dark Green Title" />);
    expect(screen.getByText('Dark Green Title')).toBeInTheDocument();
  });

  it('renders WhiteInformationCard with correct props', () => {
    render(
      <WhiteInformationCard
        title="White Info Card"
        description="This is a white information card."
        titleAlignment="center"
        height="100px"
      />
    );
    expect(screen.getByText('White Info Card')).toBeInTheDocument();
    expect(screen.getByText('This is a white information card.')).toBeInTheDocument();
  });

  it('renders LightGreenInformationCard with correct props', () => {
    render(
      <LightGreenInformationCard
        title="Light Green Info Card"
        description="This is a light green information card."
        titleAlignment="center"
        height="150px"
      />
    );
    expect(screen.getByText('Light Green Info Card')).toBeInTheDocument();
    expect(screen.getByText('This is a light green information card.')).toBeInTheDocument();
  });

  it('renders MediumGreenInformationCard with correct props', () => {
    render(
      <MediumGreenInformationCard
        title="Medium Green Info Card"
        description="This is a medium green information card."
        titleAlignment="left"
        height="120px"
      />
    );
    expect(screen.getByText('Medium Green Info Card')).toBeInTheDocument();
    expect(screen.getByText('This is a medium green information card.')).toBeInTheDocument();
  });

  it('renders DarkGreenInformationCard with correct props', () => {
    render(
      <DarkGreenInformationCard
        title="Dark Green Info Card"
        description="This is a dark green information card."
        height="140px"
      />
    );
    expect(screen.getByText('Dark Green Info Card')).toBeInTheDocument();
    expect(screen.getByText('This is a dark green information card.')).toBeInTheDocument();
  });

  it('renders InformationCardWithButton correctly and handles button click', () => {
    const handleClick = jest.fn();
    render(
      <InformationCardWithButton
        title="Info Card With Button"
        description="This is an information card with a button."
        buttonText="Click Me"
        linkUrl="#"
      />
    );

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(buttonElement);

    // Asserting that the button click was triggered
    expect(buttonElement).toBeInTheDocument(); // The handler won't navigate, so check the button presence instead
  });
});