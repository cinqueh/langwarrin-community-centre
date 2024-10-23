import { AddressDTO, PersonDTO } from "./person";
import { ChildDTO } from "./childcare/child"; // Import child DTO for Childcare Inquiry

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

// Childcare Inquiry extends InquiryDTO
export class ChildcareInquiryDTO extends InquiryDTO {
  child: ChildDTO;
  day: string;      // The day of the program they are asking about
  program: string;  // The program they are asking about

  constructor(data: {
    date: Date,
    person: PersonDTO,
    child: ChildDTO,
    day: string,     // The day of the program
    program: string, // The program they are asking about
    inquiryId?: number,
    notes?: string,
  }) {
    super(data);  // Call the base constructor
    this.child = data.child;
    this.day = data.day;       // Set day
    this.program = data.program; // Set program
  }
}

export class ComplaintInquiryDTO extends InquiryDTO {
  programName: string;
  grievanceReason: string;
  suggestedSolution: string;

  constructor(data: {
    date: Date,
    person: PersonDTO,
    programName: string,
    grievanceReason: string,
    suggestedSolution: string,
    inquiryId?: number,
    notes?: string,
  }) {
    super(data);
    this.programName = data.programName;
    this.grievanceReason = data.grievanceReason;
    this.suggestedSolution = data.suggestedSolution;
  }
}
