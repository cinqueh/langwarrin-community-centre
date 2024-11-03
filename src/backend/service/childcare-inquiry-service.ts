import ChildcareInquiryRepository from "../repository/childcare-inquiry-repository";
import { ChildcareInquiryDTO } from "../dto/inquiry";
import DatabaseService from "./database-service";
import { ChildcareInquiryMapper } from "../mapper/inquiry-mapper";

export default class ChildcareInquiryService extends DatabaseService<
  ChildcareInquiryRepository,
  any, // Replace with the correct entity type if needed
  ChildcareInquiryDTO
> {
  constructor() {
    super(new ChildcareInquiryRepository(), new ChildcareInquiryMapper());
  }

  public async addChildcareInquiry(inquiry: ChildcareInquiryDTO) {
    inquiry.date = new Date();  // Ensure date is set to the current time
    inquiry = this.validateData(inquiry, (data) => Boolean(data.child));  // Validate that the child data exists
    const response = await this.repository.addChildcareInquiry(inquiry);  // Add inquiry to repository
    return this.handleResponse(response, (data) => data);  // Handle repository response
  }

  public async getAllInquiries() {
    const response = await this.repository.getAll();
    return this.handleResponse(response, (data) => {
        if (Array.isArray(data)) {
            return data.map(this.mapper.mapTo);
        } else {
            return [];
        }
    });
  }

  public async getInquiryById(id: number) {
    return await this.repository.get(id);  // Fetch inquiry by ID
  }
}