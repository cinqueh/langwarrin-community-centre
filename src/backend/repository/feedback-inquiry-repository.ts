import { FeedbackInquiryDTO, GeneralInquiryDTO } from "../dto/inquiry";
import { MemberDTO } from "../dto/member";
import BaseRepository from "./base-repository";

export default class FeedbackInquiryRepository extends BaseRepository {

    public async addFeedbackInquiry(inquiry: FeedbackInquiryDTO) {

        const client = this.getSupabaseClient()

        const addInquiryData = {
            _date: inquiry?.date?.toISOString(),
            _firstname: inquiry?.person?.firstName,
            _surname: inquiry?.person?.surname,
            _email: inquiry?.person?.email,
            _phonenumber: inquiry?.person?.phoneNumber,
            _state: inquiry?.person?.address?.state,
            _streetaddress: inquiry?.person?.address?.streetAddress,
            _apartment: inquiry?.person?.address?.apartment,
            _suburb: inquiry?.person?.address?.suburb,
            _postcode: inquiry?.person?.address?.postcode,
            _programname: inquiry.programName,
            _feedback: inquiry.feedback
        };

        return await client
            .rpc('add_feedback_inquiry', addInquiryData);
    }

    public override async get(id: number) {
        const client = this.getSupabaseClient();

        return await client
            .from('feedbackinquiry')
            .select(`
                *,
                inquiry (
                  *,
                  person (
                    *,
                    address (
                        *
                    )
                  )
                )
              `)
            .eq('inquiryid', id);
    }

    public async getAll() {
        
        const client = this.getSupabaseClient();

        return await client
            .from('feedbackinquiry')
            .select(`
                *,
                inquiry (
                  *,
                  person (
                    *,
                    address (
                        *
                    )
                  )
                )
              `);
    }

}