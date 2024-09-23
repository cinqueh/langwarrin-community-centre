import { FeedbackInquiryDTO, GeneralInquiryDTO } from "../dto/inquiry";
import Mapper from "./mapper";
import { Person, PersonMapper } from "./person-mapper";

export type Inquiry =
{
    inquiryid: number;
    time: string;
    person: Person;
    notes: string;
}

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

export class FeedbackInquiryMapper implements Mapper<FeedbackInquiry, FeedbackInquiryDTO> {

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