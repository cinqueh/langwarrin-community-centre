import { Options } from "next/dist/server/base-server";
import BuilderService, { BuilderOptions } from "./builder-service";
import RoomMapper from "../mapper/room/room-mapper";

export default class RoomService {

    public async getRooms() { //: Promise<RoomInformation[]> {

        const builderService = new BuilderService();
        const mapper = new RoomMapper();

        const rooms = [... await builderService.getAllOptionsMapped("Room Booking Card Left", mapper), 
            ...await builderService.getAllOptionsMapped("Room Booking Card Right", mapper)];

        return rooms;
    }
}