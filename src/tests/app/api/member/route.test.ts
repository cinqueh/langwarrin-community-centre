import { POST } from "../../../../app/api/member/route";
import { MemberDTO } from "../../../../backend/dto/member";
import MemberService from "../../../../backend/service/member-service";
import 'whatwg-fetch';

// Mock the MemberService
jest.mock("../../../../backend/service/member-service");
const mockAddMember = jest.fn();
(MemberService as jest.Mock).mockImplementation(() => ({
  addMember: mockAddMember,
}));

// Mock NextRequest
const mockNextRequest = (body: any) => ({
  json: jest.fn().mockResolvedValue(body),
});

const validMemberDTO: MemberDTO = {
  memberId: 1,
  title: "Ms.",
  submitDate: new Date("2024-09-19T09:11:22.027Z"),
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

describe("Member API - POST Handler", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    // Test for a valid MemberDTO
    it("should return 200 with valid MemberDTO", async () => {
      // Mock the service response
      mockAddMember.mockResolvedValue(validMemberDTO);

      // Mock NextRequest
      const req = mockNextRequest(validMemberDTO);

      // Call the POST handler
      const response = await POST(req as any);

      // Verify the response
      const json = await response.json();
      expect(response.status).toBe(200);
      expect(json).toEqual({...validMemberDTO, submitDate: "2024-09-19T09:11:22.027Z"});
    });

    // Test for an invalid MemberDTO
    it("should return 400 with invalid input", async () => {
      const invalidBody = { title: "Ms." }; // Missing required fields like memberId, submitDate

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
      mockAddMember.mockRejectedValue(new Error("Service Error"));

      const req = mockNextRequest(validMemberDTO);

      const response = await POST(req as any);
      const json = await response.json();

      // Verify the response
      expect(response.status).toBe(500);
      expect(json.error).toBe("Failed to process request");
    });
});
