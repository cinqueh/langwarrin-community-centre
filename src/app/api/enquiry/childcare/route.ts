import ChildcareInquiryService from "../../../../backend/service/childcare-inquiry-service";
import ChildService from "../../../../backend/service/child-service"; // Import ChildService
import { ChildcareInquiryDTO } from "../../../../backend/dto/inquiry";
import { ChildDTO } from "../../../../backend/dto/childcare/child";
import { PersonDTO } from "../../../../backend/dto/person";

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
    typeof body.day === "string" &&    // Validate day field
    typeof body.program === "string"   // Validate program field
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

    // Insert child details
    const child = new ChildDTO({
      childId: undefined,  // Always create a new child
      childAge: body.child.childAge,
      childFirstName: body.child.childFirstName,
      childSurname: body.child.childSurname,
    });

    const childService = new ChildService();
    const childResponse = await childService.addChild(child);  // Add child into the database
    if (childResponse.error) {
      throw new Error('Failed to add child');
    }

    // Now handle the childcare inquiry part
    const person = new PersonDTO({
      personId: body.person.personId || null,
      firstName: body.person.firstName,
      surname: body.person.surname,
      email: body.person.email,
      phoneNumber: body.person.phoneNumber || null,
    });

    const inquiry = new ChildcareInquiryDTO({
      date: new Date(),
      person: person,
      child: child,  // Include the child DTO here
      notes: body.notes || null,
      day: body.day,      // Add the day field
      program: body.program // Add the program field
    });

    const childcareInquiryService = new ChildcareInquiryService();
    const data = await childcareInquiryService.addChildcareInquiry(inquiry);

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