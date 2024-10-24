import NodeMailerService from '@/backend/service/email/node-mailer-service'; // Adjust path as necessary

export async function POST(request: Request) {
    try {
        const { userEmail, formData } = await request.json();
        
        const emailService = NodeMailerService.getInstance();
        const adminEmail = 'langwarrin.community@gmail.com';

        // Email content for admin
        const adminEmailContent = `
            New membership form submitted:
            ---------------------------------
            Title: ${formData.title}
            First Name: ${formData.firstName}
            Last Name: ${formData.lastName}
            Email: ${formData.email}
            Mobile: ${formData.mobile}
            Home Phone: ${formData.homePhone}
            Occupation: ${formData.occupation}
            Apartment: ${formData.apartment || 'N/A'}
            Address: ${formData.address}
            Suburb: ${formData.suburb}
            State: ${formData.state}
            Postcode: ${formData.postcode}
            ---------------------------------
            Please review the submission details above.
        `;

        // Email content for client
        const clientEmailContent = `
            Dear ${formData.firstName},

            Thank you for submitting your membership form to the Langwarrin Community Centre.
            
            Here are the details you submitted:
            ---------------------------------
            Title: ${formData.title}
            First Name: ${formData.firstName}
            Last Name: ${formData.lastName}
            Email: ${formData.email}
            Mobile: ${formData.mobile}
            Home Phone: ${formData.homePhone}
            Occupation: ${formData.occupation}
            Apartment: ${formData.apartment || 'N/A'}  // If optional field
            Address: ${formData.address}
            Suburb: ${formData.suburb}
            State: ${formData.state}
            Postcode: ${formData.postcode}
            ---------------------------------

            We will review your submission and get back to you soon.

            This mailbox is unmonitored. If in doubt, please contact: langwarrin.community@gmail.com.

            Best regards,
            Langwarrin Community Centre
        `;

        // Send email to admin
        await emailService.sendEmail(adminEmail, 'New Membership Form Submission', adminEmailContent);

        // Send confirmation email to the user
        await emailService.sendEmail(userEmail, 'Thank you for your membership form submission', clientEmailContent);

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