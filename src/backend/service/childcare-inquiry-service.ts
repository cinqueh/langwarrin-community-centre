import ChildcareInquiryRepository from "../repository/childcare-inquiry-repository";
import { ChildcareInquiryDTO } from "../dto/inquiry";
import DatabaseService from "./database-service";
import { ChildcareInquiryMapper } from "../mapper/inquiry-mapper"; // Import the correct mapper

export default class ChildcareInquiryService extends DatabaseService<
  ChildcareInquiryRepository,
  any, // Replace with the correct entity type
  ChildcareInquiryDTO
> {
  constructor() {
    super(new ChildcareInquiryRepository(), new ChildcareInquiryMapper()); // Pass both the repository and mapper
  }

  public async addChildcareInquiry(inquiry: ChildcareInquiryDTO) {
    inquiry.date = new Date(); // Ensure date is added
    this.validateData(inquiry, (data) => Boolean(data.child));
    const response = await this.repository.addChildcareInquiry(inquiry);
    return this.handleResponse(response, (data) => data);
  }

  public async getAllInquiries() {
    return await this.repository.getAll();
  }

  public async getInquiryById(id: number) {
    return await this.repository.get(id);
  }
}