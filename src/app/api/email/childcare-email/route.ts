import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; // Import the email adapter interface
import NodeMailerService from '@/backend/service/email/node-mailer-service'; // Adjust path as necessary

export async function POST(request: Request) {
    try {
        const { userEmail, formData } = await request.json();

        // Use the interface instead of the class directly
        const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
        const adminEmail = 'langwarrin.community@gmail.com';

        // Email content for admin
        const adminEmailContent = `
            New childcare inquiry submitted:
            ---------------------------------
            Parent Information:
            Title: ${formData.title}
            First Name: ${formData.firstName}
            Last Name: ${formData.lastName}
            Email: ${formData.email}
            Mobile: ${formData.mobile}
            Home Phone: ${formData.homePhone}
            Occupation: ${formData.occupation}

            Child Information:
            Child First Name: ${formData.childFirstName}
            Child Last Name: ${formData.childLastName}
            Child Age: ${formData.childAge}

            Program: ${formData.program}
            Selected Days: ${formData.selectedDays.join(', ')}

            Message: ${formData.message}
            ---------------------------------
            Please review the submission details above.
        `;

        // Email content for client
        const clientEmailContent = `
            Dear ${formData.firstName},

            Thank you for submitting your childcare inquiry for the "${formData.program}" program at the Langwarrin Community Centre.

            Here are the details you submitted:
            ---------------------------------
            Parent Information:
            Title: ${formData.title}
            First Name: ${formData.firstName}
            Last Name: ${formData.lastName}
            Email: ${formData.email}
            Mobile: ${formData.mobile}
            Home Phone: ${formData.homePhone}
            Occupation: ${formData.occupation}

            Child Information:
            Child First Name: ${formData.childFirstName}
            Child Last Name: ${formData.childLastName}
            Child Age: ${formData.childAge}

            Program: ${formData.program}
            Selected Days: ${formData.selectedDays.join(', ')}

            Message: ${formData.message}
            ---------------------------------

            We will review your submission and get back to you soon.

            This mailbox is unmonitored. If in doubt, please contact (03) 9789 7653 or reception@langwarrincc.org.au.

            Best regards,
            Langwarrin Community Centre
        `;

        // Send email to admin
        await emailService.sendEmail(adminEmail, 'New Childcare Inquiry Submission', adminEmailContent);

        // Send confirmation email to the client
        await emailService.sendEmail(userEmail, 'Thank you for your childcare inquiry', clientEmailContent);

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