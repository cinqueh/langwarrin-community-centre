export default class RoomInformation {
    roomName: string;
    capacity: number;
    communityGroupHourlyRate: number;
    permanentHiresHourlyRate: number;
    casualHiresHourlyRate: number;
  
    constructor(
        roomName: string,
        capacity: number,
        communityGroupHourlyRate: number,
        permanentHiresHourlyRate: number,
        casualHiresHourlyRate: number
    ) {
        this.roomName = roomName;
        this.capacity = capacity;
        this.communityGroupHourlyRate = communityGroupHourlyRate;
        this.permanentHiresHourlyRate = permanentHiresHourlyRate;
        this.casualHiresHourlyRate = casualHiresHourlyRate;
    }
}