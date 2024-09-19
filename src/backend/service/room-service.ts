import BuilderService from "./builder-service";
import RoomMapper from "../mapper/room-mapper";
import RoomInformation from "../dto/room/room-dto";

export default class RoomService {

    public async getRooms(): Promise<RoomInformation[]> {

        const builderService = new BuilderService();
        const mapper = new RoomMapper();

        const rooms = [...await builderService.getAllOptionsMapped("Room Booking Card Left", mapper), 
            ...await builderService.getAllOptionsMapped("Room Booking Card Right", mapper)];

        return rooms;
    }
}