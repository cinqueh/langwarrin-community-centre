import BaseRepository from "./base-repository";
import { ChildcareInquiryDTO } from "../dto/inquiry";

export default class ChildcareInquiryRepository extends BaseRepository {
  public async addChildcareInquiry(inquiry: ChildcareInquiryDTO) {
    const client = this.getSupabaseClient();

    const addInquiryData = {
      _date: inquiry?.date?.toISOString(),
      _firstname: inquiry?.person?.firstName,
      _surname: inquiry?.person?.surname,
      _email: inquiry?.person?.email,
      _phonenumber: inquiry?.person?.phoneNumber,
      _childfirstname: inquiry.child?.childFirstName, // New: Add child’s first name
      _childsurname: inquiry.child?.childSurname, // New: Add child’s surname
      _childage: inquiry.child?.childAge, // New: Add child’s age
      _childcareprogramid: inquiry.childcareProgram?.childcareProgramId || null, // Access childcareProgramId from the childcareProgram object
      _childcaresessionid: inquiry.childcareSession?.childcareSessionId || null, // Access childcareSessionId from the childcareSession object
      _notes: inquiry.notes || null,
      _state: inquiry?.person?.address?.state, // New: Add state from address
      _streetaddress: inquiry?.person?.address?.streetAddress, // New: Add street address
      _apartment: inquiry?.person?.address?.apartment || null, // New: Add apartment if present
      _suburb: inquiry?.person?.address?.suburb, // New: Add suburb
      _postcode: inquiry?.person?.address?.postcode, // New: Add postcode
    };

    return await client.rpc("add_childcare_inquiry", addInquiryData);
  }

  public override async get(id: number) {
    const client = this.getSupabaseClient();

    return await client
      .from("childcareinquiry")
      .select(`
                *,
                inquiry (
                    *,
                    person (
                        *
                    ),
                    child (
                        *
                    ),
                    childcareprogram (
                        *
                    ),
                    childcaresession (
                        *
                    )
                )
              `)
      .eq("inquiryid", id);
  }

  public async getAll() {
    const client = this.getSupabaseClient();

    return await client.from("childcareinquiry").select(`
                *,
                inquiry (
                    *,
                    person (
                        *
                    ),
                    child (
                        *
                    ),
                    childcareprogram (
                        *
                    ),
                    childcaresession (
                        *
                    )
                )
              `);
  }
}