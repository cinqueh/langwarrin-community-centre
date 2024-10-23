import {
  FeedbackInquiryDTO,
  GeneralInquiryDTO,
  ProgramCourseInquiryDTO,
  ChildcareInquiryDTO,
  ComplaintInquiryDTO
} from "../dto/inquiry";
import Mapper from "./mapper";
import { Person, PersonMapper } from "./person-mapper";
import {Child, ChildMapper} from "./childcare-mapper"
import { ChildDTO } from "../dto/childcare/child";

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

  public mapTo(inquiry: ChildcareInquiry): ChildcareInquiryDTO {
    return new ChildcareInquiryDTO({
      date: new Date(inquiry?.inquiry?.time),  // Directly access the date field from ChildcareInquiry
      person: this.personMapper.mapTo(inquiry.person),  // Map person
      child: this.childMapper.mapTo({
        childid: inquiry.child.childId!,  // Map child data
        childage: inquiry.child.childAge,
        childfirstname: inquiry.child.childFirstName,
        childsurname: inquiry.child.childSurname,
      }),
      day: inquiry.day,         // Directly map the day field
      program: inquiry.program, // Directly map the program field
      inquiryId: inquiry.inquiryid,
      notes: inquiry.notes || undefined,  // Map optional notes field
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