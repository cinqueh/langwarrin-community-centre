import NodeMailerService from '@/backend/service/email/node-mailer-service'; // Adjust path as necessary
import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; // Reference the interface

export async function POST(request: Request) {
    try {
        const { userEmail, formData } = await request.json();

        // Reference the interface instead of the class
        const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
        const adminEmail = process.env.ADMIN_CONFIRMATION_EMAIL;

        // Check if the adminEmail is undefined and handle it
        if (!adminEmail) {
            throw new Error('ADMIN_CONFIRMATION_EMAIL environment variable is not set');
        }

        // Construct the link to the admin member dashboard page
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://langwarrin-community-centre.vercel.app';
        const adminDashboardLink = `${baseUrl}/admin/member`;

         // Email content for admin (HTML formatted)
         const adminEmailContent = `
         <p>New membership form submitted:</p>
         <hr/>
         <p><strong>Title:</strong> ${formData.title}</p>
         <p><strong>First Name:</strong> ${formData.firstName}</p>
         <p><strong>Last Name:</strong> ${formData.lastName}</p>
         <p><strong>Email:</strong> ${formData.email}</p>
         <p><strong>Mobile:</strong> ${formData.mobile}</p>
         <p><strong>Home Phone:</strong> ${formData.homePhone}</p>
         <p><strong>Occupation:</strong> ${formData.occupation}</p>
         <p><strong>Apartment:</strong> ${formData.apartment || 'N/A'}</p>
         <p><strong>Address:</strong> ${formData.address}</p>
         <p><strong>Suburb:</strong> ${formData.suburb}</p>
         <p><strong>State:</strong> ${formData.state}</p>
         <p><strong>Postcode:</strong> ${formData.postcode}</p>
         <hr/>
         <p>Please review the submission details above.</p>

         <a href="${adminDashboardLink}">View all membership enquiries here</a>
     `;

     // Email content for client (HTML formatted)
     const clientEmailContent = `
         <p>Dear ${formData.firstName},</p>
         <p>Thank you for submitting your membership form to the Langwarrin Community Centre.</p>
         <p>Here are the details you submitted:</p>
         <hr/>
         <p><strong>Title:</strong> ${formData.title}</p>
         <p><strong>First Name:</strong> ${formData.firstName}</p>
         <p><strong>Last Name:</strong> ${formData.lastName}</p>
         <p><strong>Email:</strong> ${formData.email}</p>
         <p><strong>Mobile:</strong> ${formData.mobile}</p>
         <p><strong>Home Phone:</strong> ${formData.homePhone}</p>
         <p><strong>Occupation:</strong> ${formData.occupation}</p>
         <p><strong>Apartment:</strong> ${formData.apartment || 'N/A'}</p>
         <p><strong>Address:</strong> ${formData.address}</p>
         <p><strong>Suburb:</strong> ${formData.suburb}</p>
         <p><strong>State:</strong> ${formData.state}</p>
         <p><strong>Postcode:</strong> ${formData.postcode}</p>
         <hr/>
         <p>We will review your submission and get back to you soon.</p>
         <p>This mailbox is unmonitored. If in doubt, please contact <strong>(03) 9789 7653</strong> or <strong>reception@langwarrincc.org.au.</strong></p>
         <p>Best regards,<br/>Langwarrin Community Centre</p>
     `;

        // Send email to admin
        await emailService.sendEmail(
            adminEmail,
            'New Membership Form Submission',
            adminEmailContent // HTML content
        );

        // Send confirmation email to the user
        await emailService.sendEmail(
            userEmail,
            'Thank you for your membership form submission',
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
