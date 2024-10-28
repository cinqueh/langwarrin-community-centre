import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; // Import the email adapter interface
import NodeMailerService from '@/backend/service/email/node-mailer-service'; // Adjust path as necessary

export async function POST(request: Request) {
    try {
        const { userEmail, formData } = await request.json();

        // Use the interface instead of the class directly
        const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
        const adminEmail = 'langwarrin.community@gmail.com';

        // Construct the link to the admin childcare dashboard page
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://langwarrin-community-centre.vercel.app';
        const adminDashboardLink = `${baseUrl}/admin/childcare`;

        // Email content for admin (HTML formatted)
        const adminEmailContent = `
            <p>New childcare inquiry submitted:</p>
            <hr/>
            <p><strong>Parent Information:</strong></p>
            <p><strong>Title:</strong> ${formData.title}</p>
            <p><strong>First Name:</strong> ${formData.firstName}</p>
            <p><strong>Last Name:</strong> ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Mobile:</strong> ${formData.mobile}</p>
            <p><strong>Home Phone:</strong> ${formData.homePhone}</p>
            <p><strong>Occupation:</strong> ${formData.occupation}</p>
            <hr/>
            <p><strong>Child Information:</strong></p>
            <p><strong>Child First Name:</strong> ${formData.childFirstName}</p>
            <p><strong>Child Last Name:</strong> ${formData.childLastName}</p>
            <p><strong>Child Age:</strong> ${formData.childAge}</p>
            <hr/>
            <p><strong>Program:</strong> ${formData.program}</p>
            <p><strong>Selected Days:</strong> ${formData.selectedDays.join(', ')}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
            <hr/>
            <p>Please review the submission details above.</p>
            <a href="${adminDashboardLink}">View all childcare enquiries here</a>
        `;

        // Email content for client (HTML formatted)
        const clientEmailContent = `
            <p>Dear ${formData.firstName},</p>
            <p>Thank you for submitting your childcare inquiry for the "<strong>${formData.program}</strong>" program at the Langwarrin Community Centre.</p>
            <p>Here are the details you submitted:</p>
            <hr/>
            <p><strong>Parent Information:</strong></p>
            <p><strong>Title:</strong> ${formData.title}</p>
            <p><strong>First Name:</strong> ${formData.firstName}</p>
            <p><strong>Last Name:</strong> ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Mobile:</strong> ${formData.mobile}</p>
            <p><strong>Home Phone:</strong> ${formData.homePhone}</p>
            <p><strong>Occupation:</strong> ${formData.occupation}</p>
            <hr/>
            <p><strong>Child Information:</strong></p>
            <p><strong>Child First Name:</strong> ${formData.childFirstName}</p>
            <p><strong>Child Last Name:</strong> ${formData.childLastName}</p>
            <p><strong>Child Age:</strong> ${formData.childAge}</p>
            <hr/>
            <p><strong>Program:</strong> ${formData.program}</p>
            <p><strong>Selected Days:</strong> ${formData.selectedDays.join(', ')}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
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