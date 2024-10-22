import { InquiryDTO } from "@/backend/dto/inquiry";
import AdminEditRepository from "@/backend/repository/admin-edit-repository";
import { DatabaseService } from "../database-service";

export default class AdminEditService extends DatabaseService<AdminEditRepository> {

    constructor(){
        super(new AdminEditRepository());
    }

    public async saveNote(inquiry: InquiryDTO): Promise<InquiryDTO> {
      this.validateData(inquiry, (data) => Boolean(data.inquiryId));

      const response = await this.repository.editInquiry(inquiry);

      return this.handleResponse(response, (data) => inquiry);
    }
}
