import ChildcareInquiryService from "../../../../backend/service/childcare-inquiry-service";
import { ChildcareInquiryDTO } from "../../../../backend/dto/inquiry";
import { ChildDTO } from "../../../../backend/dto/childcare/child";
import { ChildcareProgramDTO } from "../../../../backend/dto/childcare/childcareprogram";
import { ChildcareSessionDTO } from "../../../../backend/dto/childcare/childcaresession";
import { PersonDTO, AddressDTO } from "../../../../backend/dto/person";

function isChildcareInquiryDTO(body: any): boolean {
  return (
    typeof body === "object" &&
    typeof body.child === "object" &&
    typeof body.child.childFirstName === "string" &&
    typeof body.child.childSurname === "string" &&
    typeof body.child.childAge === "number" &&
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
    const body = await request.json();

    if (!isChildcareInquiryDTO(body)) {
      return new Response(JSON.stringify({ error: "Invalid input." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const child = new ChildDTO({
      childId: body.child.childId || null,
      childAge: body.child.childAge,
      childFirstName: body.child.childFirstName,
      childSurname: body.child.childSurname,
    });

    // Create AddressDTO
    const address = new AddressDTO({
        state: body.person.address.state,
        streetAddress: body.person.address.streetAddress,
        apartment: body.person.address.apartment || undefined,
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

      const childcareProgram = body.childcareProgram
      ? new ChildcareProgramDTO({
          childcareProgramId: body.childcareProgram.childcareProgramId,
          childcareSessionId: body.childcareProgram.childcareSessionId,
          programName: body.childcareProgram.programName,
        })
      : null;
    
    const childcareSession = body.childcareSession
      ? new ChildcareSessionDTO({
          childcareSessionId: body.childcareSession.childcareSessionId,
          day: body.childcareSession.day,
          startTime: body.childcareSession.startTime,
          endTime: body.childcareSession.endTime,
        })
      : null;

    const inquiry = new ChildcareInquiryDTO({
    date: new Date(body.date),
    person: person,
    child: child,
    childcareProgram: childcareProgram || undefined,
    childcareSession: childcareSession || undefined,
    notes: body.notes || null,
    });

    const service = new ChildcareInquiryService();
    const data = await service.addChildcareInquiry(inquiry);


    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
