import { AddressDTO, PersonDTO } from "./person";
import { ChildDTO } from "./childcare/child"; // Import child DTO for Childcare Inquiry

export class InquiryDTO {
  inquiryId?: number;
  date?: Date;
  person?: PersonDTO;
  notes?: string;

  constructor(data: {
    date?: Date,
    person?: PersonDTO,
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

// Room Booking Enquiry
export class RoomBookingEnquiryDTO extends InquiryDTO {
  roomName: string;
  hireType: string;
  bookingDate: string;
  bookingStartTime: string;  // New field for booking start time
  bookingEndTime: string;    // New field for booking end time
  purposeOfHire: string;
  isOrganisationBooking: boolean;
  organisationName?: string;
  organisationAddress?: string;
  otherCompaniesInvolved?: boolean;
  companyDetails?: string;
  numberAttending: number;
  howDidYouHear: string;
  specialRequirements?: string;
  willLiquorBeConsumed: boolean; 

  constructor(data: {
    roomName: string;
    hireType: string;
    bookingDate: string;
    bookingStartTime: string;  // New field
    bookingEndTime: string;    // New field
    purposeOfHire: string;
    isOrganisationBooking: boolean;
    organisationName?: string;
    organisationAddress?: string;
    otherCompaniesInvolved?: boolean;
    companyDetails?: string;
    numberAttending: number;
    howDidYouHear: string;
    specialRequirements?: string;
    willLiquorBeConsumed: boolean;
    person: PersonDTO;
    inquiryId?: number;
    inquiryDate: Date;
    notes?: string;
  }) {
    super({
      date: data.inquiryDate,
      person: data.person,
      inquiryId: data.inquiryId,
      notes: data.notes,
    });

    this.roomName = data.roomName;
    this.hireType = data.hireType;
    this.bookingDate = data.bookingDate;
    this.bookingStartTime = data.bookingStartTime;  // Assigning new field
    this.bookingEndTime = data.bookingEndTime;      // Assigning new field
    this.purposeOfHire = data.purposeOfHire;
    this.isOrganisationBooking = data.isOrganisationBooking;
    this.organisationName = data.organisationName;
    this.organisationAddress = data.organisationAddress;
    this.otherCompaniesInvolved = data.otherCompaniesInvolved;
    this.companyDetails = data.companyDetails;
    this.numberAttending = data.numberAttending;
    this.howDidYouHear = data.howDidYouHear;
    this.specialRequirements = data.specialRequirements;
    this.willLiquorBeConsumed = data.willLiquorBeConsumed;
  }
}