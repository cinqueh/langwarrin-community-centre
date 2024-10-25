import BaseRepository from "./base-repository";
import { ChildcareInquiryDTO } from "../dto/inquiry";

export default class ChildcareInquiryRepository extends BaseRepository {
  public async addChildcareInquiry(inquiry: ChildcareInquiryDTO) {
    const client = this.getSupabaseClient();

    const addInquiryData = {
      _date: inquiry?.date?.toISOString(),                // Capture inquiry date
      _firstname: inquiry?.person?.firstName,             // Person's first name
      _surname: inquiry?.person?.surname,                 // Person's last name
      _email: inquiry?.person?.email,                     // Person's email
      _phonenumber: inquiry?.person?.phoneNumber,         // Person's phone number
      _childfirstname: inquiry.child?.childFirstName,     // Child's first name
      _childsurname: inquiry.child?.childSurname,         // Child's last name
      _childage: inquiry.child?.childAge,                 // Child's age
      _day: inquiry.day,                                  // Program day
      _program: inquiry.program,                          // Program name
      _notes: inquiry.notes || null                       // Optional notes
    };

    return await client.rpc("add_childcare_inquiry", addInquiryData);
  }

  public override async get(id: number) {
    const client = this.getSupabaseClient();

    // Fetch a single childcare inquiry by id
    const response = await client
      .from("childcareinquiry")
      .select(`
        *,
        person (
            *
        ),
        child (
            *
        )
      `)
      .eq("inquiryid", id);

    // Return the fetched data
    return response;
  }

  public async getAll() {
    const client = this.getSupabaseClient();
  
    // Fetch all childcare inquiries, including related person and child data
    const response = await client.from("childcareinquiry").select(`
      *,
      inquiry (
          *,
          person (
              *
          )
      ),
      child (
          *
      )
    `);
  
    // Return the fetched data
    return response;
  }
  
}
