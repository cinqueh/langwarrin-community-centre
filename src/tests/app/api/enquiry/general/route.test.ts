import { POST } from "../../../../../app/api/enquiry/general/route";
import { GeneralInquiryDTO } from "../../../../../backend/dto/inquiry";
import GeneralInquiryService from "../../../../../backend/service/general-inquiry-service";
import 'whatwg-fetch';

// Mock the GeneralInquiryService
jest.mock("../../../../../backend/service/general-inquiry-service");
const mockNewGeneralInquiry = jest.fn();
(GeneralInquiryService as jest.Mock).mockImplementation(() => ({
  newGeneralInquiry: mockNewGeneralInquiry,
}));

// Mock NextRequest
const mockNextRequest = (body: any) => ({
  json: jest.fn().mockResolvedValue(body),
});

const validGeneralInquiryDTO: GeneralInquiryDTO = {
    message: "This is a general inquiry message.",
    person: {
        personId: 1,
        firstName: "John",
        surname: "Doe",
        email: "john@example.com",
        address: {
        state: "Victoria",
        streetAddress: "123 Main St",
        suburb: "Melbourne",
        postcode: "3000",
        },
    },
};

describe("General Inquiry API - POST Handler", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    // Test for a valid GeneralInquiryDTO
    it("should return 200 with valid GeneralInquiryDTO", async () => {
      // Mock the service response
      mockNewGeneralInquiry.mockResolvedValue(validGeneralInquiryDTO);

      // Mock NextRequest
      const req = mockNextRequest(validGeneralInquiryDTO);

      // Call the POST handler
      const response = await POST(req as any);

      // Verify the response
      const json = await response.json();
      expect(response.status).toBe(200);
      expect(json).toEqual(validGeneralInquiryDTO);
    });

    // Test for an invalid GeneralInquiryDTO
    it("should return 400 with invalid input", async () => {
      const invalidBody = { message: "Missing person object" }; // Missing required fields like 'person'

      const req = mockNextRequest(invalidBody);

      const response = await POST(req as any);
      const json = await response.json();

      // Verify the response
      expect(response.status).toBe(400);
      expect(json.error).toBe("Invalid input.");
    });

    // Test for handling errors in the service layer
    it("should return 500 if the service throws an error", async () => {
      // Mock the service to throw an error
      mockNewGeneralInquiry.mockRejectedValue(new Error("Service Error"));

      const req = mockNextRequest(validGeneralInquiryDTO);

      const response = await POST(req as any);
      const json = await response.json();

      // Verify the response
      expect(response.status).toBe(500);
      expect(json.error).toBe("Failed to process request");
    });
});
