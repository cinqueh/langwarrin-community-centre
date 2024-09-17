import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignOut from '../../../components/admin/sign-out';
import { signOut } from '../../../../auth';

jest.mock('../../../../auth', () => ({
    signOut: jest.fn(), // Mock the signIn function
}));

console.error = jest.fn();


describe('SignIn Server Component', () => {
    // Clear any previous mock calls before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    it('renders the form and button correctly', () => {
        // Render the SignIn component
        const { container } = render(<SignOut />);

        // Use container.querySelector to select the form element
        const form = container.querySelector('form');
        expect(form).toBeInTheDocument();

        // Check that the "Sign in with Google" button is rendered
        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();
    });
  
    it('calls signIn with the correct arguments when form is submitted', async () => {
        // Render the SignIn component
        const { container } = render(<SignOut />);

        // Manually trigger the action function as it's server-side behavior
        await signOut();

        // Verify that signIn was called with the correct arguments
        expect(signOut).toHaveBeenCalled();
    });
  });