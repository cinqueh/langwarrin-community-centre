import {
  FeedbackInquiryDTO,
  GeneralInquiryDTO,
  ProgramCourseInquiryDTO,
  ChildcareInquiryDTO,
  ComplaintInquiryDTO,
  RoomBookingEnquiryDTO
} from "../dto/inquiry";
import Mapper from "./mapper";
import { Person, PersonMapper } from "./person-mapper";
import {Child, ChildMapper} from "./childcare-mapper"
import { ChildDTO } from "../dto/childcare/child";
import { PersonDTO } from "../dto/person";


export type Inquiry = {
  inquiryid: number;
  time: string;
  person: Person;
  notes: string;
};

export type GeneralInquiry = {
  inquiryid: number;
  message: string;
  inquiry: Inquiry;
};

export type FeedbackInquiry = {
  inquiryid: number;
  programname: string;
  feedback: string;
  inquiry: Inquiry;
};

export type ProgramCourseInquiry = {
  inquiryid: number;
  emergencyfirstname: string;
  emergencysurname: string;
  emergencynumber: string;
  programname: string;
  howheardaboutprogram: string;
  inquiry: Inquiry;
};

export type ComplaintInquiry = {
  inquiryid: number;
  programname: string;
  personfirstname?: string;  // From PersonDTO
  personsurname?: string;     // From PersonDTO
  grevancereason: string;
  suggestedsolution: string;
  inquiry: Inquiry;   // The Inquiry structure includes common fields like time, person, and notes.
};

// ChildcareInquiry Entity
export type ChildcareInquiry = {
  inquiryid: number;
  child: ChildDTO;     // Child entity
  person: Person;      // Person entity
  day: string;         // The day of the program they are asking about
  program: string;     // The program they are asking about
  notes?: string;      // Optional notes
  inquiry: Inquiry;
};

// Define RoomBookingEnquiry entity type
export type RoomBookingEnquiry = {
  inquiryid: number;
  bookingdate: string;
  bookingstarttime: string;
  bookingendtime: string;
  roomname: string;
  hiretype: string;
  purposeofhire: string;
  isorganisationbooking: boolean;
  organisationname?: string;
  organisationaddress?: string;
  othercompaniesinvolved?: boolean;
  companydetails?: string;
  numberattending: number;
  howdidyouhear: string;
  specialrequirements?: string;
  willliquorbeconsumed: boolean;
  inquiry: Inquiry;
};


export class GeneralInquiryMapper implements Mapper<GeneralInquiry, GeneralInquiryDTO> {
  public mapTo(inquiry: GeneralInquiry): GeneralInquiryDTO {
    const personMapper = new PersonMapper();

    return new GeneralInquiryDTO({
      date: new Date(inquiry?.inquiry?.time),
      person: personMapper.mapTo(inquiry?.inquiry?.person),
      message: inquiry.message,
      inquiryId: inquiry.inquiryid,
      notes: inquiry?.inquiry?.notes ? inquiry?.inquiry?.notes : undefined,
    });
  }
}

export class FeedbackInquiryMapper
  implements Mapper<FeedbackInquiry, FeedbackInquiryDTO>
{
  public mapTo(inquiry: FeedbackInquiry): FeedbackInquiryDTO {
    const personMapper = new PersonMapper();

    console.log(inquiry);

    return new FeedbackInquiryDTO({
      date: new Date(inquiry?.inquiry?.time),
      person: personMapper.mapTo(inquiry?.inquiry?.person),
      programName: inquiry.programname,
      feedback: inquiry.feedback,
      inquiryId: inquiry.inquiryid,
      notes: inquiry?.inquiry?.notes ? inquiry?.inquiry?.notes : undefined,
    });
  }
}

export class ProgramCourseInquiryMapper implements Mapper<ProgramCourseInquiry, ProgramCourseInquiryDTO> {
  public mapTo(inquiry: ProgramCourseInquiry): ProgramCourseInquiryDTO {
    const personMapper = new PersonMapper();

    return new ProgramCourseInquiryDTO({
      date: new Date(inquiry.inquiry?.time),
      inquiryId: inquiry.inquiryid,
      person: personMapper.mapTo(inquiry?.inquiry?.person),
      emergencyFirstName: inquiry.emergencyfirstname,
      emergencySurName: inquiry.emergencysurname,
      emergencyNumber: inquiry.emergencynumber,
      programName: inquiry.programname,
      howHeardAboutProgram: inquiry.howheardaboutprogram,
      notes: inquiry?.inquiry?.notes
    });
  }
}

export class ChildcareInquiryMapper implements Mapper<any, ChildcareInquiryDTO> {
  public mapTo(entity: any): ChildcareInquiryDTO {
    const inquiryData = entity.inquiry || {};
    const personData = inquiryData.person || {};
    const person = new PersonDTO({
      personId: personData.personid,
      firstName: personData.firstname,
      surname: personData.surname,
      email: personData.email,
      phoneNumber: personData.phonenumber,
    });

    const childData = entity.child || {};
    const child = new ChildDTO({
      childId: childData.childid,
      childAge: childData.childage,
      childFirstName: childData.childfirstname,
      childSurname: childData.childsurname,
    });

    const date = new Date(inquiryData.time);  // Correctly accessing the date

    return new ChildcareInquiryDTO({
      inquiryId: entity.inquiryid,
      date: date,
      person: person,
      child: child,
      notes: inquiryData.notes,  // Access notes from inquiryData
      day: entity.day,
      program: entity.program,
    });
  }
}



export class ComplaintInquiryMapper implements Mapper<ComplaintInquiry, ComplaintInquiryDTO> {
  private personMapper = new PersonMapper();

  public mapTo(complaintInquiry: ComplaintInquiry): ComplaintInquiryDTO {
    return new ComplaintInquiryDTO({
      date: new Date(complaintInquiry?.inquiry?.time),
      person: this.personMapper.mapTo(complaintInquiry.inquiry.person),
      programName: complaintInquiry.programname,
      grievanceReason: complaintInquiry.grevancereason,
      suggestedSolution: complaintInquiry.suggestedsolution,
      inquiryId: complaintInquiry.inquiryid,
      notes: complaintInquiry.inquiry?.notes,
    });
  }
}

export class RoomBookingEnquiryMapper implements Mapper<RoomBookingEnquiry, RoomBookingEnquiryDTO> {
  private personMapper = new PersonMapper();

  public mapTo(enquiry: RoomBookingEnquiry): RoomBookingEnquiryDTO {
    return new RoomBookingEnquiryDTO({
      roomName: enquiry.roomname,
      hireType: enquiry.hiretype,
      bookingDate: enquiry.bookingdate,
      bookingStartTime: enquiry.bookingstarttime, // Mapping the new start time field
      bookingEndTime: enquiry.bookingendtime,     // Mapping the new end time field
      purposeOfHire: enquiry.purposeofhire,
      isOrganisationBooking: enquiry.isorganisationbooking,
      organisationName: enquiry.organisationname,
      organisationAddress: enquiry.organisationaddress,
      otherCompaniesInvolved: enquiry.othercompaniesinvolved,
      companyDetails: enquiry.companydetails,
      numberAttending: enquiry.numberattending,
      howDidYouHear: enquiry.howdidyouhear,
      specialRequirements: enquiry.specialrequirements,
      willLiquorBeConsumed: enquiry.willliquorbeconsumed,
      
      // Map the inquiry details (inherited from InquiryDTO)
      person: this.personMapper.mapTo(enquiry.inquiry.person),
      inquiryId: enquiry.inquiry.inquiryid,
      inquiryDate: new Date(enquiry.inquiry.time), // Inquiry submission date
      notes: enquiry.inquiry.notes,
    });
  }
}