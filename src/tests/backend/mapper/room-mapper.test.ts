import RoomMapper from "../../../backend/mapper/room-mapper"; // adjust the path accordingly
import RoomInformation from "../../../backend/dto/room/room-dto";
import { BuilderOptions } from "../../../backend/service/builder-service";

// Mock data for BuilderOptions
const mockBuilderOptions: BuilderOptions = {
  roomName: "Test Room",
  capacity: "50",
  communityGroupHourlyRate: "20",
  permanentHiresHourlyRate: "30",
  casualHiresHourlyRate: "40",
};

// Mock RoomInformation object we expect from the mapper
const expectedRoomInformation = new RoomInformation(
  "Test Room",
  50,
  20,
  30,
  40 
);

describe("RoomMapper", () => {
  let roomMapper: RoomMapper;

  // Initialize RoomMapper before each test
  beforeEach(() => {
    roomMapper = new RoomMapper();
  });

  it("should map BuilderOptions to RoomInformation correctly", () => {
    const result = roomMapper.mapTo(mockBuilderOptions);

    // Ensure that the mapped result matches the expected RoomInformation
    expect(result).toEqual(expectedRoomInformation);
  });

  it("should convert string values to numbers", () => {
    const result = roomMapper.mapTo(mockBuilderOptions);

    // Check individual fields
    expect(result.roomName).toBe("Test Room");
    expect(result.capacity).toBe(50);
    expect(result.communityGroupHourlyRate).toBe(20);
    expect(result.permanentHiresHourlyRate).toBe(30);
    expect(result.casualHiresHourlyRate).toBe(40);
  });

  it("should handle invalid number conversions gracefully", () => {
    // Mock data with invalid number values
    const invalidMockBuilderOptions: BuilderOptions = {
      roomName: "Invalid Room",
      capacity: "invalid",
      communityGroupHourlyRate: "invalid",
      permanentHiresHourlyRate: "30",
      casualHiresHourlyRate: "40",
    };

    const result = roomMapper.mapTo(invalidMockBuilderOptions);

    // For testing, we'll check that the invalid values result in NaN
    expect(result.roomName).toBe("Invalid Room");
    expect(result.capacity).toBeNaN(); // NaN since it couldn't convert
    expect(result.communityGroupHourlyRate).toBeNaN(); // NaN since it couldn't convert
    expect(result.permanentHiresHourlyRate).toBe(30); // Valid number
    expect(result.casualHiresHourlyRate).toBe(40); // Valid number
  });
});
