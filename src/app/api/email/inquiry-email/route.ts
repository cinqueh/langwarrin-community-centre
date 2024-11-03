import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; // Import the email adapter interface
import NodeMailerService from '@/backend/service/email/node-mailer-service'; 
import { emailRateLimiter } from '@/components/api/rate-limit';

export async function POST(request: Request) {

    try {

        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || request.headers.get('host');

        // Apply the email-specific rate limiter
        try {
        await emailRateLimiter.consume(ip as string);
        } catch {
        return new Response(
            JSON.stringify({ error: 'Too Many Requests' }),
            { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
        }

        const { userEmail, formData } = await request.json();

        // Use the interface instead of the class directly
        const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
        const adminEmail = 'langwarrin.community@gmail.com';

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://langwarrin-community-centre.vercel.app';
        let adminDashboardLink = '';

        let adminEmailContent = '';
        let clientEmailContent = '';

        if (formData.enquiryType === 'general') {
            // Set link for general inquiry
            adminDashboardLink = `${baseUrl}/admin/general-enquiry`;

            // General Inquiry Email Content
            adminEmailContent = `
                <p>New General Inquiry submitted:</p>
                <hr/>
                <p><strong>First Name:</strong> ${formData.firstName}</p>
                <p><strong>Last Name:</strong> ${formData.lastName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Mobile:</strong> ${formData.mobile}</p>
                <p><strong>Home Phone:</strong> ${formData.homePhone}</p>
                <p><strong>Message:</strong> ${formData.message}</p>
                <hr/>
                <p>Please review the submission details above.</p>
                <a href="${adminDashboardLink}">View all general inquiries here</a>
            `;
            clientEmailContent = `
                <p>Dear ${formData.firstName},</p>
                <p>Thank you for submitting your inquiry.</p>
                <p>Your message has been received, and we will get back to you shortly.</p>
                <hr/>
                <p><strong>First Name:</strong> ${formData.firstName}</p>
                <p><strong>Last Name:</strong> ${formData.lastName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Mobile:</strong> ${formData.mobile}</p>
                <p><strong>Home Phone:</strong> ${formData.homePhone}</p>
                <p><strong>Message:</strong> ${formData.message}</p>
                <hr/>
                <p>This mailbox is unmonitored. If in doubt, please contact <strong>(03) 9789 7653</strong> or <strong>reception@langwarrincc.org.au</strong>.</p>
                <p>Best regards,<br/>Langwarrin Community Centre</p>
            `;
        } else if (formData.enquiryType === 'feedback') {
            // Set link for feedback
            adminDashboardLink = `${baseUrl}/admin/feedback`;

            // Feedback Inquiry Email Content
            adminEmailContent = `
                <p>New Feedback & Compliments submitted:</p>
                <hr/>
                <p><strong>First Name:</strong> ${formData.firstName}</p>
                <p><strong>Last Name:</strong> ${formData.lastName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Mobile:</strong> ${formData.mobile}</p>
                <p><strong>Home Phone:</strong> ${formData.homePhone}</p>
                <p><strong>Address:</strong> ${formData.address.apartment}, ${formData.address.street}, ${formData.address.suburb}, ${formData.address.state}, ${formData.address.postcode}</p>
                <p><strong>Program Name:</strong> ${formData.feedbackProgramName}</p>
                <p><strong>Feedback Message:</strong> ${formData.feedbackMessage}</p>
                <hr/>
                <p>Please review the submission details above.</p>
                <a href="${adminDashboardLink}">View all feedback here</a>
            `;
            clientEmailContent = `
                <p>Dear ${formData.firstName},</p>
                <p>Thank you for your feedback regarding "<strong>${formData.feedbackProgramName}</strong>".</p>
                <p>We appreciate your input and will review it shortly.</p>
                <hr/>
                <p><strong>First Name:</strong> ${formData.firstName}</p>
                <p><strong>Last Name:</strong> ${formData.lastName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Mobile:</strong> ${formData.mobile}</p>
                <p><strong>Home Phone:</strong> ${formData.homePhone}</p>
                <p><strong>Address:</strong> ${formData.address.apartment}, ${formData.address.street}, ${formData.address.suburb}, ${formData.address.state}, ${formData.address.postcode}</p>
                <p><strong>Feedback Message:</strong> ${formData.feedbackMessage}</p>
                <hr/>
                <p>This mailbox is unmonitored. If in doubt, please contact <strong>(03) 9789 7653</strong> or <strong>reception@langwarrincc.org.au</strong>.</p>
                <p>Best regards,<br/>Langwarrin Community Centre</p>
            `;
        } else if (formData.enquiryType === 'complaints') {
            // Set link for complaints
            adminDashboardLink = `${baseUrl}/admin/complaint`;

            // Complaints Email Content
            adminEmailContent = `
                <p>New Complaint submitted:</p>
                <hr/>
                <p><strong>First Name:</strong> ${formData.firstName}</p>
                <p><strong>Last Name:</strong> ${formData.lastName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Mobile:</strong> ${formData.mobile}</p>
                <p><strong>Home Phone:</strong> ${formData.homePhone}</p>
                <p><strong>Complaints Person:</strong> ${formData.complaintsPersonName}</p>
                <p><strong>Complaints Reason:</strong> ${formData.complaintsReason}</p>
                <p><strong>Suggested Solution:</strong> ${formData.complaintsSolution}</p>
                <hr/>
                <p>Please review the submission details above.</p>
                <a href="${adminDashboardLink}">View all complaints here</a>
            `;
            clientEmailContent = `
                <p>Dear ${formData.firstName},</p>
                <p>Thank you for submitting your complaint regarding "<strong>${formData.complaintsPersonName}</strong>".</p>
                <p>We will review your submission and get back to you soon.</p>
                <hr/>
                <p><strong>First Name:</strong> ${formData.firstName}</p>
                <p><strong>Last Name:</strong> ${formData.lastName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Mobile:</strong> ${formData.mobile}</p>
                <p><strong>Home Phone:</strong> ${formData.homePhone}</p>
                <p><strong>Complaints Reason:</strong> ${formData.complaintsReason}</p>
                <p><strong>Suggested Solution:</strong> ${formData.complaintsSolution}</p>
                <hr/>
                <p>This mailbox is unmonitored. If in doubt, please contact <strong>(03) 9789 7653</strong> or <strong>reception@langwarrincc.org.au</strong>.</p>
                <p>Best regards,<br/>Langwarrin Community Centre</p>
            `;
        }

        // Send email to admin
        await emailService.sendEmail(adminEmail, `New ${formData.enquiryType} Inquiry Submission`, adminEmailContent);

        // Send confirmation email to the user
        await emailService.sendEmail(userEmail, `Thank you for your ${formData.enquiryType} submission`, clientEmailContent);

        return new Response(
            JSON.stringify({ message: 'Emails sent successfully' }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error sending emails:', errorMessage);

        return new Response(
            JSON.stringify({ message: 'Error sending emails', error: errorMessage }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}