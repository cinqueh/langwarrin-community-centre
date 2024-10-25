import { FeedbackInquiryDTO, GeneralInquiryDTO } from "../dto/inquiry";
import { FeedbackInquiry, FeedbackInquiryMapper, GeneralInquiry, GeneralInquiryMapper } from "../mapper/inquiry-mapper";
import FeedbackInquiryRepository from "../repository/feedback-inquiry-repository";
import GeneralInquiryRepository from "../repository/general-inquiry-repository";
import DatabaseService from "./database-service";

export default class FeedbackInquiryService extends DatabaseService<FeedbackInquiryRepository, FeedbackInquiry, FeedbackInquiryDTO> {

    constructor(){
        super(new FeedbackInquiryRepository(), new FeedbackInquiryMapper());
    }

    public async newFeedbackInquiry(inquiry: FeedbackInquiryDTO) { // : Promise<MemberDTO[]> {

        inquiry.date = new Date();

        this.validateData(inquiry, (data) => Boolean(data.person?.phoneNumber));

        const response = await this.repository.addFeedbackInquiry(inquiry);

        return this.handleResponse(response, (data) => data);

    }
}