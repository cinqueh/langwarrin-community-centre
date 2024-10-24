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
            New program enrollment submitted:
            ---------------------------------
            Program Name: ${formData.programName}
            Course Source: ${formData.courseSource}
            Title: ${formData.title}
            First Name: ${formData.firstName}
            Last Name: ${formData.lastName}
            Mobile: ${formData.mobile}
            Home Phone: ${formData.homePhone}
            Email: ${formData.email}
            Gender: ${formData.gender}
            Date of Birth: ${formData.dob}
            Emergency Contact: ${formData.emergencyFirstName} ${formData.emergencyLastName}, Mobile: ${formData.emergencyMobile}
            Address: Unit ${formData.unitNo || 'N/A'}, ${formData.streetName}, ${formData.city}, ${formData.state}, ${formData.postalCode}
            ---------------------------------
            Please review the submission details above.
        `;

        // Email content for client
        const clientEmailContent = `
            Dear ${formData.firstName},

            Thank you for enrolling in the program "${formData.programName}" at the Langwarrin Community Centre.

            Here are the details you submitted:
            ---------------------------------
            Program Name: ${formData.programName}
            Course Source: ${formData.courseSource}
            Title: ${formData.title}
            First Name: ${formData.firstName}
            Last Name: ${formData.lastName}
            Mobile: ${formData.mobile}
            Home Phone: ${formData.homePhone}
            Email: ${formData.email}
            Gender: ${formData.gender}
            Date of Birth: ${formData.dob}
            Emergency Contact: ${formData.emergencyFirstName} ${formData.emergencyLastName}, Mobile: ${formData.emergencyMobile}
            Address: Unit ${formData.unitNo || 'N/A'}, ${formData.streetName}, ${formData.city}, ${formData.state}, ${formData.postalCode}
            ---------------------------------

            We will review your submission and get back to you soon.

            This mailbox is unmonitored. If in doubt, please contact: langwarrin.community@gmail.com.

            Best regards,
            Langwarrin Community Centre
        `;

        // Send email to admin
        await emailService.sendEmail(adminEmail, 'New Program Enrollment Submission', adminEmailContent);

        // Send confirmation email to the user
        await emailService.sendEmail(userEmail, 'Thank you for enrolling in our program', clientEmailContent);

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
