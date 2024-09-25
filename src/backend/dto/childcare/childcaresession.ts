export class ChildcareSessionDTO {
    childcareSessionId?: number;
    day: string;
    startTime: string;
    endTime: string;

    constructor(data: {
        childcareSessionId?: number;
        day: string;
        startTime: string;
        endTime: string;
    }) {
        this.childcareSessionId = data.childcareSessionId;
        this.day = data.day;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
    }
}
