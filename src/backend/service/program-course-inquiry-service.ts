// service/program-course-inquiry-service.ts
import { ProgramCourseInquiryDTO } from "../dto/inquiry";
import {
  ProgramCourseInquiry,
  ProgramCourseInquiryMapper,
} from "../mapper/inquiry-mapper";
import ProgramCourseInquiryRepository from "../repository/program-course-inquiry-repository";
import DatabaseService from "./database-service";

export default class ProgramCourseInquiryService extends DatabaseService<
  ProgramCourseInquiryRepository,
  ProgramCourseInquiry,
  ProgramCourseInquiryDTO
> {
  constructor() {
    super(new ProgramCourseInquiryRepository(), new ProgramCourseInquiryMapper());
  }

  public async newProgramCourseInquiry(inquiry: ProgramCourseInquiryDTO) {
    inquiry.date = new Date();

    // Make sure emergency data is present
    inquiry = this.validateData(inquiry, (data) => Boolean(data.emergencyNumber));

    const response = await this.repository.addProgramCourseInquiry(inquiry);
    return this.handleResponse(response, (data) => data);
  }
}
