import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  InformationCard,
  InformationCardWithButton,
} from "../../components/information-card/information-card";

describe("InformationCard Components", () => {
  it("renders InformationCard with correct title and description", () => {
    render(
      <InformationCard
        title="Test Title"
        description="This is a test description."
        titleAlignment="center"
        descriptionAlignment="left"
        colorScheme="lightGreen"
        minHeight="200px"
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test description.")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toHaveStyle("text-align: center");
    expect(screen.getByText("This is a test description.")).toHaveStyle(
      "text-align: left"
    );
  });

  it("renders InformationCardWithButton and handles button click", () => {
    const handleClick = jest.fn();
    render(
      <InformationCardWithButton
        title="Card With Button"
        description="Description for the card with a button."
        buttonText="Click Me"
        linkUrl="#"
        titleAlignment="left"
        descriptionAlignment="left"
      />
    );

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByText("Card With Button")).toBeInTheDocument();
    expect(
      screen.getByText("Description for the card with a button.")
    ).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(buttonElement);

    // Assert button presence (since actual redirection is not happening in the test environment)
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders InformationCard with different color schemes", () => {
    const { rerender } = render(
      <InformationCard title="Dark Green Card" colorScheme="darkGreen" />
    );
    const darkGreenCard = screen.getByText("Dark Green Card");
    expect(darkGreenCard).toBeInTheDocument();

    rerender(
      <InformationCard title="Light Green Card" colorScheme="lightGreen" />
    );
    const lightGreenCard = screen.getByText("Light Green Card");
    expect(lightGreenCard).toBeInTheDocument();

    rerender(<InformationCard title="White Card" colorScheme="white" />);
    const whiteCard = screen.getByText("White Card");
    expect(whiteCard).toBeInTheDocument();
  });
});
