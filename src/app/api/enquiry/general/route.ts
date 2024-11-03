import GeneralInquiryService from "../../../../backend/service/general-inquiry-service";
import { GeneralInquiryDTO } from "../../../../backend/dto/inquiry";
import rateLimitHandler from "../../../../components/api/rate-limit";

import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; // Import the email adapter interface
import NodeMailerService from '@/backend/service/email/node-mailer-service'; 

function isGeneralInquiryDTO(body: any): body is GeneralInquiryDTO {
    return (
        typeof body === 'object' &&
        typeof body.message === 'string' &&
        (typeof body.person === 'object')
    );
}

export async function POST(request: Request) {
    try {
        return await rateLimitHandler(request, async() => {
            const body = await request.json();

            // Validate the body
            if (!isGeneralInquiryDTO(body)) {
                return new Response(
                    JSON.stringify({ error: 'Invalid input.' }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            }
    
            const service = new GeneralInquiryService();
            const data = await service.newGeneralInquiry(body);

            // Email Sending Logic
            try {
                const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
                const adminEmail = process.env.ADMIN_CONFIRMATION_EMAIL || 'test.langwarrin.community@gmail.com';
                const userEmail = body.person?.email || '';

                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://langwarrin-community-centre.vercel.app';
                const adminDashboardLink = `${baseUrl}/admin/general-enquiry`;

                // Admin Email Content
                const adminEmailContent = `
                    <p>New General Inquiry submitted:</p>
                    <hr/>
                    <p><strong>First Name:</strong> ${body.person?.firstName}</p>
                    <p><strong>Last Name:</strong> ${body.person?.surname}</p>
                    <p><strong>Email:</strong> ${body.person?.email}</p>
                    <p><strong>Mobile:</strong> ${body.person?.phoneNumber}</p>
                    <p><strong>Home Phone:</strong> ${body.person?.homeNumber}</p>
                    <p><strong>Message:</strong> ${body.message}</p>
                    <hr/>
                    <p>Please review the submission details above.</p>
                    <a href="${adminDashboardLink}">View all general inquiries here</a>
                `;

                // Client Email Content
                const clientEmailContent = `
                    <p>Dear ${body.person?.firstName},</p>
                    <p>Thank you for submitting your inquiry.</p>
                    <p>Your message has been received, and we will get back to you shortly.</p>
                    <hr/>
                    <p><strong>First Name:</strong> ${body.person?.firstName}</p>
                    <p><strong>Last Name:</strong> ${body.person?.surname}</p>
                    <p><strong>Email:</strong> ${body.person?.email}</p>
                    <p><strong>Mobile:</strong> ${body.person?.phoneNumber}</p>
                    <p><strong>Home Phone:</strong> ${body.person?.homeNumber}</p>
                    <p><strong>Message:</strong> ${body.message}</p>
                    <hr/>
                    <p>This mailbox is unmonitored. If in doubt, please contact <strong>(03) 9789 7653</strong> or <strong>reception@langwarrincc.org.au</strong>.</p>
                    <p>Best regards,<br/>Langwarrin Community Centre</p>
                `;

                // Send emails
                await emailService.sendEmail(adminEmail, 'New General Inquiry Submission', adminEmailContent);
                await emailService.sendEmail(userEmail, 'Thank you for your inquiry', clientEmailContent);
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
