import { AddressDTO, PersonDTO } from "./person";
import { ChildcareSessionDTO } from "./childcare/childcaresession"; // Import from childcare folder
import { ChildDTO } from "./childcare/child"; // Import child DTO for Childcare Inquiry
import { ChildcareProgramDTO } from "./childcare/childcareprogram"; // Import childcare program DTO for Childcare Inquiry

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

// Program Course Inquiry should have person + address
export class ProgramCourseInquiryDTO extends InquiryDTO {
  emergencyFirstName: string;
  emergencySurName: string;
  emergencyNumber: string;
  programName: string;
  howHeardAboutProgram: string;

  constructor(data: {
    date: Date,
    person: PersonDTO,
    emergencyFirstName: string,
    emergencySurName: string,
    emergencyNumber: string,
    programName: string,
    howHeardAboutProgram: string,
    inquiryId?: number,
    notes?: string
  }) {
    super(data);

    this.emergencyFirstName = data.emergencyFirstName;
    this.emergencySurName = data.emergencySurName;
    this.emergencyNumber = data.emergencyNumber;
    this.programName = data.programName;
    this.howHeardAboutProgram = data.howHeardAboutProgram;
  }
}

// Childcare Inquiry with child, childcare program and session details
export class ChildcareInquiryDTO extends InquiryDTO {
  child: ChildDTO; 
  childcareProgram?: ChildcareProgramDTO; 
  childcareSession?: ChildcareSessionDTO; 

  constructor(data: {
    date: Date,
    person: PersonDTO,
    child: ChildDTO,
    childcareProgram?: ChildcareProgramDTO,
    childcareSession?: ChildcareSessionDTO,
    inquiryId?: number,
    notes?: string
  }) {
    super(data);
    this.child = data.child;
    this.childcareProgram = data.childcareProgram;
    this.childcareSession = data.childcareSession;
  }
}

// Childcare Inquiry Session with childcare session details
export class ChildcareInquirySessionDTO {
  inquiryId: number;
  childId: number;
  childcareSessionId: number;

  constructor(data: {
    inquiryId: number;
    childId: number;
    childcareSessionId: number;
  }) {
    this.inquiryId = data.inquiryId;
    this.childId = data.childId;
    this.childcareSessionId = data.childcareSessionId;
  }
}

// recommiting for the purpose of testing and deployment