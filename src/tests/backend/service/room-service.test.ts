import RoomService from "../../../backend/service/room-service";
import BuilderService from "../../../backend/service/builder-service";
import RoomMapper from "../../../backend/mapper/room-mapper";

jest.mock('../../../backend/mapper/room-mapper');

describe('RoomService', () => {
    let roomService: RoomService;

    beforeEach(() => {
        jest.clearAllMocks();
        roomService = new RoomService();
    });

    it('should return a combined list of rooms from both components', async () => {
        // Spy on getAllOptionsMapped on the BuilderService prototype
        const getAllOptionsMappedSpy = jest.spyOn(BuilderService.prototype, 'getAllOptionsMapped');

        // Mock the return values
        const mockRoomsLeft = [{ roomName: 'Room A', capacity: 50 }];
        const mockRoomsRight = [{ roomName: 'Room B', capacity: 30 }];

        getAllOptionsMappedSpy
            .mockResolvedValueOnce(mockRoomsLeft)  // For "Room Booking Card Left"
            .mockResolvedValueOnce(mockRoomsRight); // For "Room Booking Card Right"

        // Call the method under test
        const rooms = await roomService.getRooms();

        // Ensure the method was called twice
        expect(getAllOptionsMappedSpy).toHaveBeenCalledTimes(2);

        // Verify that the returned rooms list contains both sets of mock rooms
        expect(rooms).toEqual([...mockRoomsLeft, ...mockRoomsRight]);
    });

    it('should return an empty array if no rooms are available', async () => {
        // Spy on getAllOptionsMapped on the BuilderService prototype
        const getAllOptionsMappedSpy = jest.spyOn(BuilderService.prototype, 'getAllOptionsMapped');

        // Mock the return values as empty arrays
        getAllOptionsMappedSpy
            .mockResolvedValueOnce([])  // For "Room Booking Card Left"
            .mockResolvedValueOnce([]); // For "Room Booking Card Right"

        // Call the method under test
        const rooms = await roomService.getRooms();

        // Ensure the method was called twice
        expect(getAllOptionsMappedSpy).toHaveBeenCalledTimes(2);

        // Verify that the returned rooms list is an empty array
        expect(rooms).toEqual([]);
    });

    it('should propagate an error from the BuilderService', async () => {
        // Spy on getAllOptionsMapped on the BuilderService prototype
        const getAllOptionsMappedSpy = jest.spyOn(BuilderService.prototype, 'getAllOptionsMapped');

        // Mock one successful response and one rejection
        const mockRoomsLeft = [{ roomName: 'Room A', capacity: 50 }];

        getAllOptionsMappedSpy
            .mockResolvedValueOnce(mockRoomsLeft)  // For "Room Booking Card Left"
            .mockRejectedValueOnce(new Error('Failed to fetch data'));  // For "Room Booking Card Right"

        // Assert that the method rejects with an error
        await expect(roomService.getRooms()).rejects.toThrow('Failed to fetch data');

        // Ensure the method was called twice
        expect(getAllOptionsMappedSpy).toHaveBeenCalledTimes(2);
    });
});
