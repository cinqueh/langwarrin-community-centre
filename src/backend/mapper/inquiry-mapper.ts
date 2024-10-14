import {
  FeedbackInquiryDTO,
  GeneralInquiryDTO,
  ProgramCourseInquiryDTO,
  ChildcareInquiryDTO,
  ChildcareInquirySessionDTO,
  ComplaintInquiryDTO,
  RoomBookingEnquiryDTO
} from "../dto/inquiry";
import Mapper from "./mapper";
import { Person, PersonMapper } from "./person-mapper";
import {Child, ChildMapper, ChildcareProgram, ChildcareProgramMapper, ChildcareSession, ChildcareSessionMapper} from "./childcare-mapper"
import { ChildDTO } from "../dto/childcare/child";
import { ChildcareProgramDTO } from "../dto/childcare/childcareprogram";
import { ChildcareSessionDTO } from "../dto/childcare/childcaresession";

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
  child: ChildDTO;
  childcareprogram?: ChildcareProgramDTO;
  childcaresession?: ChildcareSessionDTO;
  person: Person;
  notes?: string;
};

// ChildcareInquirySession Entity
export type ChildcareInquirySession = {
  inquiryid: number;
  childid: number;
  childcaresessionid: number;
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

// Childcare Inquiry Mapper
export class ChildcareInquiryMapper implements Mapper<ChildcareInquiry, ChildcareInquiryDTO> {
  private personMapper = new PersonMapper();
  private childMapper = new ChildMapper();
  private programMapper = new ChildcareProgramMapper();
  private sessionMapper = new ChildcareSessionMapper();

  public mapTo(inquiry: ChildcareInquiry): ChildcareInquiryDTO {
    return new ChildcareInquiryDTO({
      date: new Date(),
      person: this.personMapper.mapTo(inquiry.person),
      // Mapping from Child (entity) to ChildDTO
      child: this.childMapper.mapTo({
        childid: inquiry.child.childId!,
        childage: inquiry.child.childAge,
        childfirstname: inquiry.child.childFirstName,
        childsurname: inquiry.child.childSurname,
      }),
      // Mapping from ChildcareProgram (entity) to ChildcareProgramDTO
      childcareProgram: inquiry.childcareprogram ? this.programMapper.mapTo({
        childcareprogramid: inquiry.childcareprogram.childcareProgramId!,
        childcaresessionid: inquiry.childcareprogram.childcareSessionId,
        programname: inquiry.childcareprogram.programName
      }) : undefined,
      // Mapping from ChildcareSession (entity) to ChildcareSessionDTO
      childcareSession: inquiry.childcaresession ? this.sessionMapper.mapTo({
        childcaresessionid: inquiry.childcaresession.childcareSessionId!,
        day: inquiry.childcaresession.day,
        starttime: inquiry.childcaresession.startTime,
        endtime: inquiry.childcaresession.endTime
      }) : undefined,
      inquiryId: inquiry.inquiryid,
      notes: inquiry.notes,
    });
  }
}


// Childcare Inquiry Session Mapper
export class ChildcareInquirySessionMapper implements Mapper<ChildcareInquirySession, ChildcareInquirySessionDTO> {
  public mapTo(session: ChildcareInquirySession): ChildcareInquirySessionDTO {
    return new ChildcareInquirySessionDTO({
      inquiryId: session.inquiryid,
      childId: session.childid,
      childcareSessionId: session.childcaresessionid,
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