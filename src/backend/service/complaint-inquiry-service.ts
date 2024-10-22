import { ComplaintInquiryDTO } from "../dto/inquiry";
import { ComplaintInquiry, ComplaintInquiryMapper } from "../mapper/inquiry-mapper";
import ComplaintInquiryRepository from "../repository/complaint-inquiry-repository";
import DatabaseService from "./database-service";

export default class ComplaintInquiryService extends DatabaseService<
  ComplaintInquiryRepository,
  ComplaintInquiry,
  ComplaintInquiryDTO
> {
  constructor() {
    super(new ComplaintInquiryRepository(), new ComplaintInquiryMapper());
  }

  public async newComplaintInquiry(inquiry: ComplaintInquiryDTO) {
    inquiry.date = new Date();

    this.validateData(inquiry, (data) => Boolean(data.person?.firstName));

    const response = await this.repository.addComplaintInquiry(inquiry);

    return this.handleResponse(response, (data) => data);
  }
}
