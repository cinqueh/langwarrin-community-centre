// __tests__/BackButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BackButton } from '../../../components/admin/back-button';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  describe('BackButton', () => {
    let routerPush: jest.Mock;
  
    beforeEach(() => {
      routerPush = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        push: routerPush,
      });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders correctly', () => {
      render(<BackButton />);
      
      // Check if the button is rendered with the correct text and symbol
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('<')).toBeInTheDocument();
    });
  
    it('navigates to the parent path when clicked', () => {
      // Mock the current URL path
      Object.defineProperty(window, 'location', {
        value: {
          pathname: '/hello/world/1',
        },
        writable: true,
      });
  
      render(<BackButton />);
  
      const button = screen.getByText('Back');
  
      // Simulate clicking the back button
      fireEvent.click(button);
  
      // Check if router.push was called with the correct parent path
      expect(routerPush).toHaveBeenCalledWith('/hello/world');
    });
});