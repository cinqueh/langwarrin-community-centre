import { GeneralInquiryDTO } from "../dto/inquiry";
import Mapper from "./mapper";
import { Person, PersonMapper } from "./person-mapper";

export type Inquiry =
{
    inquiryId: number;
    time: string;
    person: Person;
    notes: string;
}

export type GeneralInquiry = {
    inquiryId: number;
    message: string;
    inquiry: Inquiry;
};

export default class GeneralInquiryMapper implements Mapper<GeneralInquiry, GeneralInquiryDTO> {

    public mapTo(inquiry: GeneralInquiry): GeneralInquiryDTO {
        const personMapper = new PersonMapper();

        return new GeneralInquiryDTO({
            date: new Date(inquiry?.inquiry?.time),
            person: personMapper.mapTo(inquiry?.inquiry?.person),
            message: inquiry.message,
            inquiryId: inquiry.inquiryId,
            notes: inquiry?.inquiry?.notes ? inquiry?.inquiry?.notes : undefined,
        });
    }
}