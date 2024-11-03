import { GeneralInquiryDTO } from "../dto/inquiry";
import { GeneralInquiry, GeneralInquiryMapper } from "../mapper/inquiry-mapper";
import GeneralInquiryRepository from "../repository/general-inquiry-repository";
import DatabaseService from "./database-service";

export default class GeneralInquiryService extends DatabaseService<GeneralInquiryRepository, GeneralInquiry, GeneralInquiryDTO> {

    constructor(){
        super( new GeneralInquiryRepository(), new GeneralInquiryMapper());
    }

    public async newGeneralInquiry(inquiry: GeneralInquiryDTO) { // : Promise<MemberDTO[]> {

        inquiry.date = new Date();

        inquiry = this.validateData(inquiry, (data) => Boolean(data.person?.phoneNumber));

        const response = await this.repository.addGeneralInquiry(inquiry);

        return this.handleResponse(response, (data) => data);

    }
}