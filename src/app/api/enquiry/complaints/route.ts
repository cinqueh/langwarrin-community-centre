import ComplaintInquiryService from "../../../../backend/service/complaint-inquiry-service";
import { ComplaintInquiryDTO } from "../../../../backend/dto/inquiry";
import rateLimitHandler from "@/components/api/rate-limit";

import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; // Import the email adapter interface
import NodeMailerService from '@/backend/service/email/node-mailer-service'; 

function isComplaintInquiryDTO(body: any): body is ComplaintInquiryDTO {
  return (
    typeof body === 'object' &&
    typeof body.programName === 'string' &&
    typeof body.grievanceReason === 'string' &&
    typeof body.suggestedSolution === 'string' &&
    (typeof body.person === 'object')
  );
}

export async function POST(request: Request) {
  try {
    return await rateLimitHandler(request, async() => {
        const body = await request.json();

        // Validate the body
        if (!isComplaintInquiryDTO(body)) {
          return new Response(
            JSON.stringify({ error: 'Invalid input.' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
    
        const service = new ComplaintInquiryService();
        const data = await service.newComplaintInquiry(body);

        // Email Sending Logic
        try {
            const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
            const adminEmail = process.env.ADMIN_CONFIRMATION_EMAIL || 'test.langwarrin.community@gmail.com';
            const userEmail = body.person?.email || '';

            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://langwarrin-community-centre.vercel.app';
            const adminDashboardLink = `${baseUrl}/admin/complaint`;

            // Admin Email Content
            const adminEmailContent = `
                <p>New Complaint submitted:</p>
                <hr/>
                <p><strong>First Name:</strong> ${body.person?.firstName}</p>
                <p><strong>Last Name:</strong> ${body.person?.surname}</p>
                <p><strong>Email:</strong> ${body.person?.email}</p>
                <p><strong>Mobile:</strong> ${body.person?.phoneNumber}</p>
                <p><strong>Home Phone:</strong> ${body.person?.homeNumber}</p>
                <p><strong>Complaints Person:</strong> ${body.programName}</p>
                <p><strong>Complaints Reason:</strong> ${body.grievanceReason}</p>
                <p><strong>Suggested Solution:</strong> ${body.suggestedSolution}</p>
                <hr/>
                <p>Please review the submission details above.</p>
                <a href="${adminDashboardLink}">View all complaints here</a>
            `;

            // Client Email Content
            const clientEmailContent = `
                <p>Dear ${body.person?.firstName},</p>
                <p>Thank you for submitting your complaint regarding "<strong>${body.programName}</strong>".</p>
                <p>We will review your submission and get back to you soon.</p>
                <hr/>
                <p><strong>First Name:</strong> ${body.person?.firstName}</p>
                <p><strong>Last Name:</strong> ${body.person?.surname}</p>
                <p><strong>Email:</strong> ${body.person?.email}</p>
                <p><strong>Mobile:</strong> ${body.person?.phoneNumber}</p>
                <p><strong>Home Phone:</strong> ${body.person?.homeNumber}</p>
                <p><strong>Complaints Reason:</strong> ${body.grievanceReason}</p>
                <p><strong>Suggested Solution:</strong> ${body.suggestedSolution}</p>
                <hr/>
                <p>This mailbox is unmonitored. If in doubt, please contact <strong>(03) 9789 7653</strong> or <strong>reception@langwarrincc.org.au</strong>.</p>
                <p>Best regards,<br/>Langwarrin Community Centre</p>
            `;

            // Send emails
            await emailService.sendEmail(adminEmail, 'New Complaint Submission', adminEmailContent);
            await emailService.sendEmail(userEmail, 'Thank you for your complaint submission', clientEmailContent);
        } catch (error) {
            console.error('Error sending emails:', error);
            // Handle email sending errors if necessary
        }
    
        return new Response(
          JSON.stringify(data),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
