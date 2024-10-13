import BaseRepository from "./base-repository";
import { ProgramCourseInquiryDTO } from "../dto/inquiry";
import FormRepository from "./base-repository";

export default class ProgramCourseInquiryRepository extends FormRepository {
  public async addProgramCourseInquiry(inquiry: ProgramCourseInquiryDTO) {
    const client = this.getSupabaseClient();
  
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
      _emergencyfirstname: inquiry.emergencyFirstName,
      _emergencysurname: inquiry.emergencySurName,
      _emergencynumber: inquiry.emergencyNumber,
      _programname: inquiry.programName,
      _howheardaboutprogram: inquiry.howHeardAboutProgram,
      _notes: inquiry.notes || null,
    };
  
    return await client.rpc("add_program_course_inquiry", addInquiryData);
  }

  public override async get(id: number) {
    const client = this.getSupabaseClient();

    return await client
      .from("programcourseinquiry")
      .select(
        `
                *,
                inquiry (
                    *,
                    person (
                        *
                    )
                )
              `
      )
      .eq("programcourseinquiryid", id);
  }

  public async getAll() {
    const client = this.getSupabaseClient();

    return await client.from("programcourseinquiry").select(`
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
