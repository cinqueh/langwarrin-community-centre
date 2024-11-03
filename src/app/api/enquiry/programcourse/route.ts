import ProgramCourseInquiryService from "../../../../backend/service/program-course-inquiry-service";
import { ProgramCourseInquiryDTO } from "../../../../backend/dto/inquiry";
import { PersonDTO, AddressDTO } from "../../../../backend/dto/person";
import rateLimitHandler from "@/components/api/rate-limit";

import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; 
import NodeMailerService from '@/backend/service/email/node-mailer-service'; 

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
    typeof body.person.phoneNumber === "string" &&
    typeof body.person.address === "object" &&
    typeof body.person.address.state === "string" &&
    typeof body.person.address.streetAddress === "string" &&
    typeof body.person.address.suburb === "string" &&
    typeof body.person.address.postcode === "string"
  );
}

export async function POST(request: Request) {
  try {
    return await rateLimitHandler(request, async() => {
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

      // Email sending code
      const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
      const adminEmail = process.env.ADMIN_CONFIRMATION_EMAIL || 'test.langwarrin.community@gmail.com';
      const userEmail = body.person?.email || '';

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://langwarrin-community-centre.vercel.app';
      const adminDashboardLink = `${baseUrl}/admin/program-enrolments`;

      // Email content for admin (HTML formatted)
      const adminEmailContent = `
          <p>New program enrollment submitted:</p>
          <hr/>
          <p><strong>Program Name:</strong> ${body.programName}</p>
          <p><strong>How did you hear about the program?:</strong> ${body.howHeardAboutProgram}</p>
          <p><strong>First Name:</strong> ${body.person.firstName}</p>
          <p><strong>Last Name:</strong> ${body.person.surname}</p>
          <p><strong>Email:</strong> ${body.person.email}</p>
          <p><strong>Phone Number:</strong> ${body.person.phoneNumber}</p>
          <hr/>
          <p><strong>Emergency Contact:</strong> ${body.emergencyFirstName} ${body.emergencySurName}, <strong>Number</strong>: ${body.emergencyNumber}</p>
          <p><strong>Address:</strong> ${body.person.address.streetAddress}, ${body.person.address.suburb}, ${body.person.address.state}, ${body.person.address.postcode}</p>
          <hr/>
          <p>Please review the submission details above.</p>
          <a href="${adminDashboardLink}">View all program enrollments here</a>
      `;

      // Email content for client (HTML formatted)
      const clientEmailContent = `
          <p>Dear ${body.person.firstName},</p>
          <p>Thank you for enrolling in the program "<strong>${body.programName}</strong>" at the Langwarrin Community Centre.</p>
          <p>Here are the details you submitted:</p>
          <hr/>
          <p><strong>Program Name:</strong> ${body.programName}</p>
          <p><strong>How did you hear about the program?:</strong> ${body.howHeardAboutProgram}</p>
          <p><strong>First Name:</strong> ${body.person.firstName}</p>
          <p><strong>Last Name:</strong> ${body.person.surname}</p>
          <p><strong>Email:</strong> ${body.person.email}</p>
          <p><strong>Phone Number:</strong> ${body.person.phoneNumber}</p>
          <hr/>
          <p><strong>Emergency Contact:</strong> ${body.emergencyFirstName} ${body.emergencySurName}, <strong>Number</strong>: ${body.emergencyNumber}</p>
          <p><strong>Address:</strong> ${body.person.address.streetAddress}, ${body.person.address.suburb}, ${body.person.address.state}, ${body.person.address.postcode}</p>
          <hr/>
          <p>We will review your submission and get back to you soon.</p>
          <p>This mailbox is unmonitored. If in doubt, please contact <strong>(03) 9789 7653</strong> or <strong>reception@langwarrincc.org.au</strong>.</p>
          <p>Best regards,<br/>Langwarrin Community Centre</p>
      `;

      // Send email to admin
      await emailService.sendEmail(
          adminEmail,
          'New Program Enrollment Submission',
          adminEmailContent // HTML content
      );

      // Send confirmation email to the user
      await emailService.sendEmail(
          userEmail,
          'Thank you for enrolling in our program',
          clientEmailContent // HTML content
      );

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(errorMessage);
    return new Response(JSON.stringify({ error: "Failed to process request", details: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
