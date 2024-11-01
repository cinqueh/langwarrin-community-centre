import ProgramCourseInquiryService from "../../../../backend/service/program-course-inquiry-service";
import { ProgramCourseInquiryDTO } from "../../../../backend/dto/inquiry";
import { PersonDTO, AddressDTO } from "../../../../backend/dto/person";
import rateLimitHandler from "@/components/api/rate-limit";

function isProgramCourseInquiryDTO(body: any): boolean {
  return (
    typeof body === "object" &&
    typeof body.emergencyFirstName === "string" &&
    typeof body.emergencySurName === "string" &&
    typeof body.emergencyNumber === "string" &&
    typeof body.programName === "string" &&
    typeof body.howHeardAboutProgram === "string" &&
    typeof body.person === "object" &&
    typeof body.person.firstName === "string" &&
    typeof body.person.surname === "string" &&
    typeof body.person.email === "string" &&
    typeof body.person.address === "object" &&
    typeof body.person.address.state === "string" &&
    typeof body.person.address.streetAddress === "string" &&
    typeof body.person.address.suburb === "string" &&
    typeof body.person.address.postcode === "string"
  );
}

export async function POST(request: Request) {
  try {
    return rateLimitHandler(request, async() => {
      const body = await request.json();

      // Validate the body thoroughly
      if (!isProgramCourseInquiryDTO(body)) {
        return new Response(JSON.stringify({ error: "Invalid input. Missing required fields." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      // Create AddressDTO
      const address = new AddressDTO({
        state: body.person.address.state,
        streetAddress: body.person.address.streetAddress,
        apartment: body.person.address.apartment || null,
        suburb: body.person.address.suburb,
        postcode: body.person.address.postcode
      });
  
      // Create PersonDTO
      const person = new PersonDTO({
        personId: body.person.personId || null, // optional or null
        firstName: body.person.firstName,
        surname: body.person.surname,
        email: body.person.email,
        phoneNumber: body.person.phoneNumber,
        address: address // Assign AddressDTO
      });
  
      // Create ProgramCourseInquiryDTO
      const inquiry = new ProgramCourseInquiryDTO({
        date: new Date(body.date),
        person: person,  // Attach PersonDTO, which includes AddressDTO
        emergencyFirstName: body.emergencyFirstName,
        emergencySurName: body.emergencySurName,
        emergencyNumber: body.emergencyNumber,
        programName: body.programName,
        howHeardAboutProgram: body.howHeardAboutProgram,
        notes: body.notes || null
      });
  
      // Pass the DTO to the service
      const service = new ProgramCourseInquiryService();
      const data = await service.newProgramCourseInquiry(inquiry);
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}