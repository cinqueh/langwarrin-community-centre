export class ChildcareProgramDTO {
    childcareProgramId?: number;
    childcareSessionId?: number;
    programName: string;

    constructor(data: {
        childcareProgramId?: number;
        childcareSessionId?: number;
        programName: string;
    }) {
        this.childcareProgramId = data.childcareProgramId;
        this.childcareSessionId = data.childcareSessionId;
        this.programName = data.programName;
    }
}