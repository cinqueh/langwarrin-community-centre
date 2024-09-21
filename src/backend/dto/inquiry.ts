import { AddressDTO, PersonDTO } from "./person";

class InquiryDTO {
    inquiryId?: number;
    date?: Date;
    person: PersonDTO;
    notes?: string;

    constructor(data: {
        date: Date,
        person: PersonDTO,
        inquiryId?: number,
        notes?: string,
    }) {
        this.inquiryId = data.inquiryId;
        this.date = data.date;
        this.person = data.person;
        this.notes = data.notes;
    }
}

// General inquiries always have a person
export class GeneralInquiryDTO extends InquiryDTO {
    message: string;

    constructor(data: {
        date: Date,
        person: PersonDTO,
        message: string,
        inquiryId?: number,
        notes?: string,
    }) {
        super(data);
        this.message = data.message;
    }
}

// Feedback inquiries should always have a person + address
export class FeedbackInquiryDTO extends InquiryDTO {
    programName: string;
    feedback: string;

    constructor(data: {
        date: Date,
        person: PersonDTO,
        programName: string,
        feedback: string,
        inquiryId?: number,
        notes?: string,
    }) {
        super(data);

        this.programName = data.programName;
        this.feedback = data.feedback;
    }
}
