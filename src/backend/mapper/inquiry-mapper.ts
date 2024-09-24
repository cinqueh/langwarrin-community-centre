import {
  FeedbackInquiryDTO,
  GeneralInquiryDTO,
  ProgramCourseInquiryDTO,
  ChildcareInquiryDTO,
  ChildcareInquirySessionDTO,
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
