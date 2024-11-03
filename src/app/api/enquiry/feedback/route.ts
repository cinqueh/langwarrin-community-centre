import rateLimitHandler from "@/components/api/rate-limit";
import { FeedbackInquiryDTO } from "../../../../backend/dto/inquiry";
import FeedbackInquiryService from "@/backend/service/feedback-inquiry-service";

import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; // Import the email adapter interface
import NodeMailerService from '@/backend/service/email/node-mailer-service'; 

function isFeedbackInquiryDTO(body: any): body is FeedbackInquiryDTO {
    return (
        typeof body === 'object' &&
        typeof body.programName === 'string' &&
        typeof body.feedback === 'string' &&
        (typeof body.person === 'object') &&
        (typeof body.person.address === 'object')
    );
}

export async function POST(request: Request) {
    try {
        return await rateLimitHandler(request, async() => {
            const body = await request.json();

            // Validate the body
            if (!isFeedbackInquiryDTO(body)) {
                return new Response(
                    JSON.stringify({ error: 'Invalid input.' }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            }
        
            const service = new FeedbackInquiryService();
            const data = await service.newFeedbackInquiry(body);

            // Email Sending Logic
            try {
                const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
                const adminEmail = process.env.ADMIN_CONFIRMATION_EMAIL || 'test.langwarrin.community@gmail.com';
                const userEmail = body.person?.email || '';

                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://langwarrin-community-centre.vercel.app';
                const adminDashboardLink = `${baseUrl}/admin/feedback`;

                // Admin Email Content
                const adminEmailContent = `
                    <p>New Feedback & Compliments submitted:</p>
                    <hr/>
                    <p><strong>First Name:</strong> ${body.person?.firstName}</p>
                    <p><strong>Last Name:</strong> ${body.person?.surname}</p>
                    <p><strong>Email:</strong> ${body.person?.email}</p>
                    <p><strong>Mobile:</strong> ${body.person?.phoneNumber}</p>
                    <p><strong>Home Phone:</strong> ${body.person?.homeNumber}</p>
                    <p><strong>Address:</strong> ${body.person?.address?.apartment}, ${body.person?.address?.streetAddress}, ${body.person?.address?.suburb}, ${body.person?.address?.state}, ${body.person?.address?.postcode}</p>
                    <p><strong>Program Name:</strong> ${body.programName}</p>
                    <p><strong>Feedback Message:</strong> ${body.feedback}</p>
                    <hr/>
                    <p>Please review the submission details above.</p>
                    <a href="${adminDashboardLink}">View all feedback here</a>
                `;

                // Client Email Content
                const clientEmailContent = `
                    <p>Dear ${body.person?.firstName},</p>
                    <p>Thank you for your feedback regarding "<strong>${body.programName}</strong>".</p>
                    <p>We appreciate your input and will review it shortly.</p>
                    <hr/>
                    <p><strong>First Name:</strong> ${body.person?.firstName}</p>
                    <p><strong>Last Name:</strong> ${body.person?.surname}</p>
                    <p><strong>Email:</strong> ${body.person?.email}</p>
                    <p><strong>Mobile:</strong> ${body.person?.phoneNumber}</p>
                    <p><strong>Home Phone:</strong> ${body.person?.homeNumber}</p>
                    <p><strong>Address:</strong> ${body.person?.address?.apartment}, ${body.person?.address?.streetAddress}, ${body.person?.address?.suburb}, ${body.person?.address?.state}, ${body.person?.address?.postcode}</p>
                    <p><strong>Program Name:</strong> ${body.programName}</p>
                    <p><strong>Feedback Message:</strong> ${body.feedback}</p>
                    <hr/>
                    <p>This mailbox is unmonitored. If in doubt, please contact <strong>(03) 9789 7653</strong> or <strong>reception@langwarrincc.org.au</strong>.</p>
                    <p>Best regards,<br/>Langwarrin Community Centre</p>
                `;

                // Send emails
                await emailService.sendEmail(adminEmail, 'New Feedback Submission', adminEmailContent);
                await emailService.sendEmail(userEmail, 'Thank you for your feedback', clientEmailContent);
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
