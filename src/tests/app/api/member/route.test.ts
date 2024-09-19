import supertest from "supertest";
import { createServer } from "http";
import { POST } from "../../../../app/api/member/route"; 
import { MemberDTO } from "../../../../backend/dto/member";
import MemberService from "../../../../backend/service/member-service";

// Mock the MemberService
jest.mock("../../../../backend/service/member-service");
const mockAddMember = jest.fn();
(MemberService as jest.Mock).mockImplementation(() => ({
  addMember: mockAddMember,
}));

// Utility function to run the API handler using `supertest`
const runApiHandler = (handler: any, method: string, body?: any) => {
  const server = createServer((req, res) => {
    req.method = method;
    req.headers['content-type'] = 'application/json';
    handler(req, res);
  });

  const request = supertest(server);

  if (method === "POST") {
    return request.post("/").send(body); // Use the `.send()` method to send a request body
  }
};

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

    // Use supertest to send a POST request
    const response = await runApiHandler(POST, "POST", validMemberDTO);

    // Verify the response
    expect(response?.status).toBe(200);
    expect(response?.body).toEqual(validMemberDTO);
  });

  // Test for an invalid MemberDTO
  it("should return 400 with invalid input", async () => {
    const invalidBody = { title: "Ms." }; // Missing required fields like memberId, submitDate

    // Use supertest to send a POST request
    const response = await runApiHandler(POST, "POST", invalidBody);

    // Verify the response
    expect(response?.status).toBe(400);
    expect(response?.body.error).toBe("Invalid input.");
  });

  // Test for handling errors in the service layer
  it("should return 500 if the service throws an error", async () => {
    // Mock the service to throw an error
    mockAddMember.mockRejectedValue(new Error("Service Error"));

    // Use supertest to send a POST request
    const response = await runApiHandler(POST, "POST", validMemberDTO);

    // Verify the response
    expect(response?.status).toBe(500);
    expect(response?.body.error).toBe("Failed to process request");
  });
});