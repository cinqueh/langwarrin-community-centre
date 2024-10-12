// __tests__/DisplayIndividualComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { DisplayIndividualComponent } from '../../../components/admin/display-individual';
import '@testing-library/jest-dom';
import { ColumnAdapter } from '@/backend/dto/display-object';

interface MockData {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
}

type MockDataAll = MockData & {
    id: number;
}

const columns: ColumnAdapter<MockDataAll>[] = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Address', accessor: 'address' },
  { Header: 'Phone Number', accessor: 'phoneNumber' },
  { Header: 'ID', accessor: 'id' }, // This should be filtered out
];

const data = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  address: '123 Street, City',
  phoneNumber: '555-1234',
  id: 1,
};

describe('DisplayIndividualComponent', () => {
  it('renders correctly and filters out the id column', () => {
    render(<DisplayIndividualComponent<MockData> data={data} columns={columns} />);
    
    // Check that the ID field is not rendered
    expect(screen.queryByText('ID')).not.toBeInTheDocument();
    
    // Check that the rest of the fields are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('123 Street, City')).toBeInTheDocument();
    
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('555-1234')).toBeInTheDocument();
  });
});
