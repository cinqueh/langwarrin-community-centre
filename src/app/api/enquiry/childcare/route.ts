import IEmailServiceAdapter from '@/backend/service/email/email-adapter';
import NodeMailerService from '@/backend/service/email/node-mailer-service';
import ChildcareInquiryService from "../../../../backend/service/childcare-inquiry-service";
import ChildService from "../../../../backend/service/child-service";
import { ChildcareInquiryDTO } from "../../../../backend/dto/inquiry";
import { ChildDTO } from "../../../../backend/dto/childcare/child";
import { PersonDTO } from "../../../../backend/dto/person";
import rateLimitHandler from "@/components/api/rate-limit";

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
    return await rateLimitHandler(request, async() => {
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

      // Send emails after the childcare inquiry is successfully added
      try {
        const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
        const adminEmail = process.env.ADMIN_CONFIRMATION_EMAIL || 'test.langwarrin.community@gmail.com';
        const userEmail = body.person?.email || '';

        // Construct the link to the admin childcare dashboard page
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://langwarrin-community-centre.vercel.app';
        const adminDashboardLink = `${baseUrl}/admin/childcare`;

        // Email content for admin (HTML formatted)
        const adminEmailContent = `
          <p>New childcare inquiry submitted:</p>
          <hr/>
          <p><strong>Parent Information:</strong></p>
          <p><strong>First Name:</strong> ${body.person.firstName}</p>
          <p><strong>Last Name:</strong> ${body.person.surname}</p>
          <p><strong>Email:</strong> ${body.person.email}</p>
          <p><strong>Mobile:</strong> ${body.person.phoneNumber || 'N/A'}</p>
          <hr/>
          <p><strong>Child Information:</strong></p>
          <p><strong>Child First Name:</strong> ${body.child.childFirstName}</p>
          <p><strong>Child Last Name:</strong> ${body.child.childSurname}</p>
          <p><strong>Child Age:</strong> ${body.child.childAge}</p>
          <hr/>
          <p><strong>Program:</strong> ${body.program}</p>
          <p><strong>Selected Days:</strong> ${body.day || 'N/A'}</p>
          <p><strong>Message:</strong> ${body.notes || 'N/A'}</p>
          <hr/>
          <p>Please review the submission details above.</p>
          <a href="${adminDashboardLink}">View all childcare enquiries here</a>
        `;

        // Email content for client (HTML formatted)
        const clientEmailContent = `
          <p>Dear ${body.person.firstName},</p>
          <p>Thank you for submitting your childcare inquiry for the "<strong>${body.program}</strong>" program at the Langwarrin Community Centre.</p>
          <p>Here are the details you submitted:</p>
          <hr/>
          <p><strong>Parent Information:</strong></p>
          <p><strong>First Name:</strong> ${body.person.firstName}</p>
          <p><strong>Last Name:</strong> ${body.person.surname}</p>
          <p><strong>Email:</strong> ${body.person.email}</p>
          <p><strong>Mobile:</strong> ${body.person.phoneNumber || 'N/A'}</p>
          <hr/>
          <p><strong>Child Information:</strong></p>
          <p><strong>Child First Name:</strong> ${body.child.childFirstName}</p>
          <p><strong>Child Last Name:</strong> ${body.child.childSurname}</p>
          <p><strong>Child Age:</strong> ${body.child.childAge}</p>
          <hr/>
          <p><strong>Program:</strong> ${body.program}</p>
          <p><strong>Selected Days:</strong> ${body.day || 'N/A'}</p>
          <p><strong>Message:</strong> ${body.notes || 'N/A'}</p>
          <hr/>
          <p>We will review your submission and get back to you soon.</p>
          <p>This mailbox is unmonitored. If in doubt, please contact <strong>(03) 9789 7653</strong> or <strong>reception@langwarrincc.org.au</strong>.</p>
          <p>Best regards,<br/>Langwarrin Community Centre</p>
        `;

        // Send email to admin
        await emailService.sendEmail(
          adminEmail,
          'New Childcare Inquiry Submission',
          adminEmailContent // HTML content
        );

        // Send confirmation email to the client
        await emailService.sendEmail(
          userEmail,
          'Thank you for your childcare inquiry',
          clientEmailContent // HTML content
        );

        console.log('Emails sent successfully');
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
      }

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
