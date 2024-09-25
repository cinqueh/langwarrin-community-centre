import BaseRepository from "./base-repository";
import { ComplaintInquiryDTO } from "../dto/inquiry";

export default class ComplaintInquiryRepository extends BaseRepository {

  public async addComplaintInquiry(inquiry: ComplaintInquiryDTO) {
    const client = this.getSupabaseClient();

    const addInquiryData = {
      _date: inquiry?.date?.toISOString(),
      _firstname: inquiry?.person?.firstName,
      _surname: inquiry?.person?.surname,
      _email: inquiry?.person?.email,
      _phonenumber: inquiry?.person?.phoneNumber,
      _programname: inquiry.programName,
      _grievancereason: inquiry.grievanceReason,
      _suggestedsolution: inquiry.suggestedSolution,
    };

    return await client.rpc('add_complaint_inquiry', addInquiryData); // Call the correct RPC function
  }

  public async get(id: number) {
    const client = this.getSupabaseClient();

    return await client
      .from('complaintinquiry')
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
      .from('complaintinquiry')
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