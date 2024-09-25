import {
  FeedbackInquiryDTO,
  GeneralInquiryDTO,
  ProgramCourseInquiryDTO,
} from "../dto/inquiry";
import Mapper from "./mapper";
import { Person, PersonMapper } from "./person-mapper";
import { AddressDTO } from "../dto/person"; // Import AddressDTO

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
