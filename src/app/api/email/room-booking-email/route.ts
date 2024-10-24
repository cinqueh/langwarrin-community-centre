import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; // Interface for the email service
import NodeMailerService from '@/backend/service/email/node-mailer-service'; // Concrete implementation of email service

export async function POST(request: Request) {
    try {
        const { formData, userEmail } = await request.json();

        // Use the email service through the interface
        const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
        const adminEmail = 'langwarrin.community@gmail.com';

        // Extract room details
        const roomDetails = `
            Room Name: ${formData.roomDetails.roomName}
            Hire Type: ${formData.roomDetails.hireType}
            Booking Date: ${formData.roomDetails.date}
            Time: ${formData.roomDetails.startTime} to ${formData.roomDetails.endTime}
            Total Amount: $${formData.roomDetails.totalAmount}
        `;

        // Extract personal details
        const personalDetails = `
            Full Name: ${formData.personalDetails.firstName} ${formData.personalDetails.familyName}
            Email: ${formData.personalDetails.email}
            Mobile: ${formData.personalDetails.mobile}
            Address: ${formData.personalDetails.unitNo ? formData.personalDetails.unitNo + ", " : ""} 
            ${formData.personalDetails.streetName}, 
            ${formData.personalDetails.city}, 
            ${formData.personalDetails.postalCode}, 
            ${formData.personalDetails.state}
        `;

        // Extract additional information
        const additionalInfo = `
            Purpose of Hire: ${formData.additionalInfo.hirePurpose}
            Organisation: ${formData.additionalInfo.forOrganisation === "Yes" ? formData.additionalInfo.organisationName : "N/A"}
            Organisation Address: ${formData.additionalInfo.forOrganisation === "Yes" ? formData.additionalInfo.organisationAddress : "N/A"}
            Number Attending: ${formData.additionalInfo.estimatedAttendance}
            Special Requirements: ${formData.additionalInfo.specialRequirements || "None"}
            Will Liquor be Consumed: ${formData.additionalInfo.willLiquorBeConsumed}
            How Did You Hear About the Space: ${formData.additionalInfo.howHearAboutSpace}
        `;

        // Construct email content
        const adminEmailContent = `
            New Room Booking Submitted:
            ---------------------------------
            ${roomDetails}

            Personal Details:
            ---------------------------------
            ${personalDetails}

            Additional Information:
            ---------------------------------
            ${additionalInfo}

            Please review the booking details.
        `;

        const clientEmailContent = `
            Dear ${formData.personalDetails.firstName},

            Thank you for your room booking at Langwarrin Community Centre.

            Here are the details you submitted:
            ---------------------------------
            ${roomDetails}

            Personal Details:
            ---------------------------------
            ${personalDetails}

            Additional Information:
            ---------------------------------
            ${additionalInfo}

            We will review your booking and get back to you shortly.

            This mailbox is unmonitored. If in doubt, please contact: langwarrin.community@gmail.com.

            Best regards,
            Langwarrin Community Centre
        `;

        // Send email to admin
        await emailService.sendEmail(adminEmail, 'New Room Booking Submission', adminEmailContent);  

        // Send confirmation email to the user
        await emailService.sendEmail(userEmail, 'Thank you for your room booking', clientEmailContent);

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