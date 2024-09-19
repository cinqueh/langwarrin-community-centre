import BuilderService from "../../../backend/service/builder-service";
import Mapper from "../../../backend/mapper/mapper";

// Mock global fetch function
global.fetch = jest.fn();

// Sample data for mocking the API response
const mockApiResponse = {
    results: [
        {
            data: {
                blocks: [
                    {
                        component: {
                            name: 'TestComponent',
                            options: {},
                        }
                    }
                ]
            }
        }
    ]
};

// Sample Mapper mock
class MockMapper implements Mapper<any, any> {
    mapTo(input: any): any {
        return {
            mapped: true,
            options: input,
        };
    }
}

describe('BuilderService', () => {
    let builderService: BuilderService;

    beforeEach(() => {
        builderService = new BuilderService();
        (fetch as jest.Mock).mockClear();
    });

    it('should return all pages from the API', async () => {
        // Mock fetch to return a resolved promise with the sample API response
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockApiResponse)
        });

        const pages = await builderService.getAllPages();

        // Verify fetch was called with the correct URL
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('https://cdn.builder.io/api/v2/content/page'));

        // Verify the results match the mocked API response
        expect(pages).toEqual(mockApiResponse.results);
    });

    it('should return components with the correct name', async () => {
        // Mock fetch to return the same API response
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockApiResponse)
        });

        const components = await builderService.getAllComponents('TestComponent');

        // Verify fetch was called
        expect(fetch).toHaveBeenCalled();

        // Verify the returned components match the mock
        expect(components.length).toBe(1);
        expect(components[0].component?.name).toBe('TestComponent');
    });

    it('should map all options using the provided mapper', async () => {
        // Mock fetch to return the API response
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockApiResponse)
        });

        // Use the mock mapper
        const mockMapper = new MockMapper();
        const mappedOptions = await builderService.getAllOptionsMapped('TestComponent', mockMapper);

        // Ensure that the mapTo method on the mapper was called
        expect(mappedOptions.length).toBe(1);
        expect(mappedOptions[0]).toEqual({ mapped: true, options: {} });
    });

    it('should return an empty array if no components match the name', async () => {
        // Modify the mock API response to contain a different component name
        const noMatchApiResponse = {
            results: [
                {
                    data: {
                        blocks: [
                            {
                                component: {
                                    name: 'DifferentComponent',
                                    options: {},
                                }
                            }
                        ]
                    }
                }
            ]
        };

        // Mock fetch with no matching components
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(noMatchApiResponse)
        });

        const components = await builderService.getAllComponents('TestComponent');

        // Verify no components are returned
        expect(components.length).toBe(0);
    });
});
