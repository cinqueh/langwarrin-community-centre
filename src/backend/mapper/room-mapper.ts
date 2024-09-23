import RoomInformation from "../../backend/dto/room/room-dto";
import { BuilderOptions } from "../../backend/service/builder-service";
import { NodeNextRequest } from "next/dist/server/base-http/node";
import Mapper from "./mapper";

interface RoomBookingOptionsData extends BuilderOptions {
    roomName: string;
    capacity: any;
    communityGroupHourlyRate: any;
    permanentHiresHourlyRate: any;
    casualHiresHourlyRate: any;
}

export default class RoomMapper implements Mapper<BuilderOptions, RoomInformation> {

    public mapTo(builderOptions: BuilderOptions): RoomInformation {

        const options = builderOptions as RoomBookingOptionsData;

        return new RoomInformation(
            options.roomName,
            +options.capacity,
            +options.communityGroupHourlyRate,
            +options.permanentHiresHourlyRate,
            +options.casualHiresHourlyRate
        );

    }
}