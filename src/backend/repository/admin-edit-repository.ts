import { FeedbackInquiryDTO, GeneralInquiryDTO, InquiryDTO } from "../dto/inquiry";
import { MemberDTO } from "../dto/member";
import { BaseRepository } from "./base-repository";
 "./base-repository";

export default class AdminEditRepository extends BaseRepository {

    public async editInquiry(inquiry: InquiryDTO) {

        const client = this.getSupabaseClient()

        const data = {
          notes: inquiry?.notes
        };

        return await client
          .from('inquiry')
          .update(data)
          .eq('inquiryid', inquiry.inquiryId);
    }
}