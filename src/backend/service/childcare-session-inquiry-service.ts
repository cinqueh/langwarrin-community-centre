import ChildcareInquirySessionRepository from "../repository/childcare-session-inquiry-repository";
import { ChildcareInquirySessionDTO } from "../dto/inquiry";
import DatabaseService from "./database-service";
import { ChildcareInquirySessionMapper } from "../mapper/inquiry-mapper"; // Import the correct mapper

export default class ChildcareInquirySessionService extends DatabaseService<
  ChildcareInquirySessionRepository,
  any, // Replace with the correct entity type
  ChildcareInquirySessionDTO
> {
  constructor() {
    super(new ChildcareInquirySessionRepository(), new ChildcareInquirySessionMapper()); // Pass both the repository and mapper
  }

  public async addChildcareInquirySession(inquirySession: ChildcareInquirySessionDTO) {
    const response = await this.repository.addChildcareInquirySession(inquirySession);
    return this.handleResponse(response, (data) => data);
  }

  public async getAllInquirySessions() {
    return await this.repository.getAll();
  }

  public async getInquirySessionById(id: number) {
    return await this.repository.get(id);
  }
}
