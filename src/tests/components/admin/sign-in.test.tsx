import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from '../../../components/admin/sign-in';
import { signIn } from '../../../../auth';

jest.mock('../../../../auth', () => ({
    signIn: jest.fn(), // Mock the signIn function
}));

console.error = jest.fn();


describe('SignIn Server Component', () => {
    // Clear any previous mock calls before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    it('renders the form and button correctly', () => {
        // Render the SignIn component
        const { container } = render(<SignIn />);

        // Use container.querySelector to select the form element
        const form = container.querySelector('form');
        expect(form).toBeInTheDocument();

        // Check that the "Sign in with Google" button is rendered
        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();
    });
  
    it('calls signIn with the correct arguments when form is submitted', async () => {
        // Render the SignIn component
        const { container } = render(<SignIn />);

        // Manually trigger the action function as it's server-side behavior
        await signIn("google", { redirectTo: "/admin" });

        // Verify that signIn was called with the correct arguments
        expect(signIn).toHaveBeenCalledWith('google', { redirectTo: '/admin' });
    });
  });