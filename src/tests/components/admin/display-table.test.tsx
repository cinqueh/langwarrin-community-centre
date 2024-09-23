import { render, screen, fireEvent } from "@testing-library/react";
import TableComponent from "../../../components/admin/display-table";
import { saveAs } from "file-saver";
import { Column } from "react-table";
import '@testing-library/jest-dom';

// Mocking the file-saver saveAs function
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

interface TestData {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const mockData: TestData[] = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "555-1234" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", phone: "555-5678" },
];

const columns: Column<TestData>[] = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Phone", accessor: "phone" },
];

describe("TableComponent", () => {
  test("renders the table with the correct number of rows", () => {
    render(<TableComponent data={mockData} columns={columns} descriptor="Community Members" linkedUrl="/members" />);
    
    // Expect the table title to be correct
    expect(screen.getByText(/2 Community Members/i)).toBeInTheDocument();
    
    // Check that the table headers are rendered
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();

    // Check the rows are rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  test("filters the table rows based on search input", () => {
    render(<TableComponent data={mockData} columns={columns} descriptor="Community Members" linkedUrl="/members" />);
    
    // Check that both rows are initially rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();

    // Type in the search bar
    fireEvent.change(screen.getByPlaceholderText("Search..."), { target: { value: "Jane" } });

    // Jane should be visible, John should not
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });

  test("calls router.push with correct URL when row is clicked", () => {
    render(<TableComponent data={mockData} columns={columns} descriptor="Community Members" linkedUrl="/members" />);
    
    // Click the first row
    fireEvent.click(screen.getByText("John Doe"));

    // Ensure router.push is called with the correct URL
    expect(mockPush).toHaveBeenCalledWith("/members/1");
  });

  test("downloads CSV file when Download button is clicked", () => {
    render(<TableComponent data={mockData} columns={columns} descriptor="Community Members" linkedUrl="/members" />);
    
    // Click the download button
    fireEvent.click(screen.getByText(/Download/i));

    // Check that the saveAs function was called
    expect(saveAs).toHaveBeenCalled();

    // Check the CSV content
    const csvBlob = (saveAs as any).mock.calls[0][0]; // Get the Blob passed to saveAs
    const reader = new FileReader();
    reader.onload = function () {
      const csvContent = reader.result;
      expect(csvContent).toContain("ID,Name,Email,Phone");
      expect(csvContent).toContain("1,John Doe,john@example.com,555-1234");
      expect(csvContent).toContain("2,Jane Doe,jane@example.com,555-5678");
    };
    reader.readAsText(csvBlob);
  });
});
