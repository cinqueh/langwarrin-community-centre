import { GeneralInquiryDTO } from "../dto/inquiry";
import { MemberDTO } from "../dto/member";
import BaseRepository from "./base-repository";

export default class GeneralInquiryRepository extends BaseRepository {

    public async addGeneralInquiry(inquiry: GeneralInquiryDTO) {

        const client = this.getSupabaseClient()

        const addInquiryData = {
            _date: inquiry?.date?.toISOString(),
            _email: inquiry?.person?.email,
            _firstname: inquiry?.person?.firstName,
            _phonenumber: inquiry?.person?.phoneNumber,
            _message: inquiry?.message,
            _surname: inquiry?.person?.surname,
        };

        return await client
            .rpc('add_general_inquiry', addInquiryData);
    }

    public override async get(id: number) {
        const client = this.getSupabaseClient();

        return await client
            .from('generalinquiry')
            .select(`
                *,
                inquiry (
                  *,
                  person (
                    *
                  )
                )
              `)
            .eq('inquiryid', id);
    }

    public async getAll() {
        
        const client = this.getSupabaseClient();

        return await client
            .from('generalinquiry')
            .select(`
                *,
                inquiry (
                  *,
                  person (
                    *
                  )
                )
              `);
    }

}