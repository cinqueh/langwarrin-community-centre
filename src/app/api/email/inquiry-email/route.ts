import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; // Import the email adapter interface
import NodeMailerService from '@/backend/service/email/node-mailer-service'; // Adjust path as necessary

export async function POST(request: Request) {
    try {
        const { userEmail, formData } = await request.json();

        // Use the interface instead of the class directly
        const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
        const adminEmail = 'langwarrin.community@gmail.com';

        // Add specific content based on the enquiry type
        let adminEmailContent = '';
        let clientEmailContent = '';

        if (formData.enquiryType === 'general') {
            // General Inquiry Email Content
            adminEmailContent = `
                New General Inquiry submitted:
                ---------------------------------
                First Name: ${formData.firstName}
                Last Name: ${formData.lastName}
                Email: ${formData.email}
                Mobile: ${formData.mobile}
                Home Phone: ${formData.homePhone}
                
                Message: ${formData.message}
                ---------------------------------
                Please review the submission details above.
            `;
            clientEmailContent = `
                Dear ${formData.firstName},

                Thank you for submitting your inquiry. 
                Your message has been received, and we will get back to you shortly.

                First Name: ${formData.firstName}
                Last Name: ${formData.lastName}
                Email: ${formData.email}
                Mobile: ${formData.mobile}
                Home Phone: ${formData.homePhone}

                Message: ${formData.message}

                This mailbox is unmonitored. If in doubt, please contact: langwarrin.community@gmail.com.
                
                Best regards,
                Langwarrin Community Centre
            `;
        } else if (formData.enquiryType === 'feedback') {
            // Feedback Inquiry Email Content
            adminEmailContent = `
                New Feedback & Compliments submitted:
                ---------------------------------
                First Name: ${formData.firstName}
                Last Name: ${formData.lastName}
                Email: ${formData.email}
                Mobile: ${formData.mobile}
                Home Phone: ${formData.homePhone}
                
                Address: ${formData.address.apartment}, ${formData.address.street}, 
                ${formData.address.suburb}, ${formData.address.state}, ${formData.address.postcode}
                
                Program Name: ${formData.feedbackProgramName}
                Feedback Message: ${formData.feedbackMessage}
                ---------------------------------
                Please review the submission details above.
            `;
            clientEmailContent = `
                Dear ${formData.firstName},

                Thank you for your feedback regarding "${formData.feedbackProgramName}".
                We appreciate your input and will review it shortly.

                First Name: ${formData.firstName}
                Last Name: ${formData.lastName}
                Email: ${formData.email}
                Mobile: ${formData.mobile}
                Home Phone: ${formData.homePhone}
                
                Address: ${formData.address.apartment}, ${formData.address.street}, 
                ${formData.address.suburb}, ${formData.address.state}, ${formData.address.postcode}

                Feedback Message: ${formData.feedbackMessage}

                This mailbox is unmonitored. If in doubt, please contact: langwarrin.community@gmail.com.

                Best regards,
                Langwarrin Community Centre
            `;
        } else if (formData.enquiryType === 'complaints') {
            // Complaints Email Content
            adminEmailContent = `
                New Complaint submitted:
                ---------------------------------
                First Name: ${formData.firstName}
                Last Name: ${formData.lastName}
                Email: ${formData.email}
                Mobile: ${formData.mobile}
                Home Phone: ${formData.homePhone}
                
                Complaints Person: ${formData.complaintsPersonName}
                Complaints Reason: ${formData.complaintsReason}
                Suggested Solution: ${formData.complaintsSolution}
                ---------------------------------
                Please review the submission details above.
            `;
            clientEmailContent = `
                Dear ${formData.firstName},

                Thank you for submitting your complaint regarding "${formData.complaintsPersonName}".
                We will review your submission and get back to you soon.

                First Name: ${formData.firstName}
                Last Name: ${formData.lastName}
                Email: ${formData.email}
                Mobile: ${formData.mobile}
                Home Phone: ${formData.homePhone}
                
                Complaints Reason: ${formData.complaintsReason}
                Suggested Solution: ${formData.complaintsSolution}

                This mailbox is unmonitored. If in doubt, please contact: langwarrin.community@gmail.com.

                Best regards,
                Langwarrin Community Centre
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
