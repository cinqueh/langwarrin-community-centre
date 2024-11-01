import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmailForm from "../../../components/admin/email";

// Mock @blocknote/react and @blocknote/mantine
jest.mock("@blocknote/react", () => ({
  useCreateBlockNote: jest.fn().mockReturnValue({
    blocksToHTMLLossy: jest.fn().mockResolvedValue("<p>Mock HTML Content</p>"),
  }),
}));

jest.mock("@blocknote/mantine", () => ({
  BlockNoteView: () => <div data-testid="BlockNoteView">Mocked BlockNoteView</div>,
}));

// Mocked email data
const memberEmailsMock = ["test1@example.com", "test2@example.com"];

// Mock window alert and confirm
const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
const confirmMock = jest.spyOn(window, "confirm").mockImplementation(() => true);

describe("EmailForm Component with mocked BlockNote", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous calls/mocks between tests
  });

  it("renders EmailForm component with initial elements", () => {
    render(<EmailForm memberEmails={memberEmailsMock} />);

    expect(screen.getByText("Emails")).toBeInTheDocument();
    expect(screen.getByText("Add Members")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email and press enter")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email subject")).toBeInTheDocument();
    expect(screen.getByText("Send Email")).toBeInTheDocument();
    expect(screen.getByTestId("BlockNoteView")).toHaveTextContent("Mocked BlockNoteView");
  });

  it("adds an email to the list when Enter is pressed", () => {
    render(<EmailForm memberEmails={memberEmailsMock} />);

    const emailInput = screen.getByPlaceholderText("Enter email and press enter");
    fireEvent.change(emailInput, { target: { value: "new@example.com" } });
    fireEvent.keyPress(emailInput, { key: "Enter", code: "Enter", charCode: 13 });

    expect(screen.getByText("new@example.com")).toBeInTheDocument();
  });

  it("inserts all member emails into the email list when 'Add Members' is clicked", () => {
    render(<EmailForm memberEmails={memberEmailsMock} />);

    const addMembersButton = screen.getByText("Add Members");
    fireEvent.click(addMembersButton);

    memberEmailsMock.forEach(email => {
      expect(screen.getByText(email)).toBeInTheDocument();
    });
  });

  it("clears all emails from the email list when 'Clear' is clicked", () => {
    render(<EmailForm memberEmails={memberEmailsMock} />);

    const addMembersButton = screen.getByText("Add Members");
    fireEvent.click(addMembersButton);

    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);

    memberEmailsMock.forEach(email => {
      expect(screen.queryByText(email)).not.toBeInTheDocument();
    });
  });

  it("sends the email if all required fields are filled", async () => {
    render(<EmailForm memberEmails={memberEmailsMock} />);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    const emailInput = screen.getByPlaceholderText("Enter email and press enter");
    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.keyPress(emailInput, { key: "Enter", code: "Enter", charCode: 13 });

    const subjectInput = screen.getByPlaceholderText("Enter email subject");
    fireEvent.change(subjectInput, { target: { value: "Test Subject" } });

    const sendButton = screen.getByText("Send Email");
    fireEvent.click(sendButton);

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith("Email sent successfully!"));
  });
});
