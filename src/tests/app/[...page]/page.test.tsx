import { builder } from "@builder.io/sdk";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "../../../app/[...page]/page";
import "@testing-library/jest-dom";

// create a mock for the builder sdk
jest.mock("@builder.io/sdk", () => ({
    builder: {
      init: jest.fn(),
      get: jest.fn((modelName, options) => ({
        // mock the toPromise function inside get()
        toPromise: jest.fn(),
      })),
    },
  }));

// mock the RenderBuilderContent component
jest.mock("../../../components/builder", () => ({
  RenderBuilderContent: jest.fn(() => <div>Mocked Content</div>),
}));

// // mock the Header component
// jest.mock("../../../components/layout/footer", () => ({
//   Footer: jest.fn(() => <div>Footer</div>),
// }));

// // mock the Footer component
// jest.mock("../../../components/layout/header", () => ({
//   Header: jest.fn(() => <div>Header</div>),
// }));

// run the unit tests
describe('Builder Page Component', () => {

    const modelName = "page";

    const mockProps = {
      params: {
        page: ['about', 'us'],
      },
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('renders successfully when page request is successful', async () => {

        render(await Page(mockProps));
    
        // Check if the mocked content is rendered
        await waitFor(() =>
            expect(screen.getByText('Mocked Content')).toBeInTheDocument()
        );
    });
  
    test('fetches content from Builder.io with correct URL from parameters', async () => {
      await Page(mockProps);
  
      // Check that the builder API was called with the correct URL path
      expect(builder.get).toHaveBeenCalledWith(modelName, {
        userAttributes: {
          urlPath: '/about/us',
          timestamp: expect.any(Number),
        },
      });
    });
  
    test('handles when no content is returned', async () => {
      // mock Builder API to return null content
      (builder.get(modelName).toPromise as jest.Mock).mockResolvedValueOnce(undefined);
  
      render(await Page(mockProps));
  
      // check that the fallback or error UI is rendered
      await waitFor(() =>
        expect(screen.getByText('Mocked Content')).toBeInTheDocument()
      );
    });
  
    test('renders correctly with empty props', async () => {
      const emptyProps = { params: { page: [] } };
  
      render(await Page(emptyProps));
  
      // Ensure the correct URL is generated from empty params
      await waitFor(() =>
        expect(builder.get).toHaveBeenCalledWith(modelName, {
          userAttributes: {
            urlPath: '/',
            timestamp: expect.any(Number),
          },
        })
      );
  
      expect(screen.getByText('Mocked Content')).toBeInTheDocument();
    });
  
    test('handles API error gracefully', async () => {
      // Mock Builder API to throw an error
      (builder.get(modelName).toPromise as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
  
      render(await Page(mockProps));
  
      // Check that an error message or fallback content is rendered
      await waitFor(() =>
        expect(screen.getByText('Mocked Content')).toBeInTheDocument()
      );
    });
});
