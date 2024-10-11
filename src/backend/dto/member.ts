import { PersonDTO } from "./person";

export class MemberDTO {
    memberId: number;
    title: string;
    submitDate: Date;
    approved?: Date;
    person?: PersonDTO;

    constructor(data: {
        memberId: number,
        title: string,
        submitDate: Date,
        approved?: Date,
        person?: PersonDTO
    }) {
        this.memberId = data.memberId;
        this.title = data.title;
        this.submitDate = data.submitDate;
        this.approved = data.approved;
        this.person = data.person;
    }
}