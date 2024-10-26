import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; // Interface for the email service
import NodeMailerService from '@/backend/service/email/node-mailer-service'; // Concrete implementation of email service

export async function POST(request: Request) {
    try {
        const { formData, userEmail } = await request.json();

        // Use the email service through the interface
        const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
        const adminEmail = 'langwarrin.community@gmail.com';

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://langwarrin-community-centre.vercel.app';
        const adminDashboardLink = `${baseUrl}/admin/room-hire`;

        // Room details (HTML formatted)
        const roomDetails = `
            <p><strong>Room Name:</strong> ${formData.roomDetails.roomName}</p>
            <p><strong>Hire Type:</strong> ${formData.roomDetails.hireType}</p>
            <p><strong>Booking Date:</strong> ${formData.roomDetails.date}</p>
            <p><strong>Time:</strong> ${formData.roomDetails.startTime} to ${formData.roomDetails.endTime}</p>
            <p><strong>Total Amount:</strong> $${formData.roomDetails.totalAmount}</p>
        `;

        // Personal details (HTML formatted)
        const personalDetails = `
            <p><strong>Full Name:</strong> ${formData.personalDetails.firstName} ${formData.personalDetails.familyName}</p>
            <p><strong>Email:</strong> ${formData.personalDetails.email}</p>
            <p><strong>Mobile:</strong> ${formData.personalDetails.mobile}</p>
            <p><strong>Address:</strong> ${formData.personalDetails.unitNo ? formData.personalDetails.unitNo + ", " : ""}${formData.personalDetails.streetName}, ${formData.personalDetails.city}, ${formData.personalDetails.postalCode}, ${formData.personalDetails.state}</p>
        `;

        // Additional information (HTML formatted)
        const additionalInfo = `
            <p><strong>Purpose of Hire:</strong> ${formData.additionalInfo.hirePurpose}</p>
            <p><strong>Organisation:</strong> ${formData.additionalInfo.forOrganisation === "Yes" ? formData.additionalInfo.organisationName : "N/A"}</p>
            <p><strong>Organisation Address:</strong> ${formData.additionalInfo.forOrganisation === "Yes" ? formData.additionalInfo.organisationAddress : "N/A"}</p>
            <p><strong>Number Attending:</strong> ${formData.additionalInfo.estimatedAttendance}</p>
            <p><strong>Special Requirements:</strong> ${formData.additionalInfo.specialRequirements || "None"}</p>
            <p><strong>Will Liquor be Consumed:</strong> ${formData.additionalInfo.willLiquorBeConsumed}</p>
            <p><strong>How Did You Hear About the Space:</strong> ${formData.additionalInfo.howHearAboutSpace}</p>
        `;

        // Admin email content
        const adminEmailContent = `
            <p>New Room Booking Submitted:</p>
            <hr/>
            <p><strong>Room Details:</strong></p>
            ${roomDetails}
            <hr/>
            <p><strong>Personal Details:</strong></p>
            ${personalDetails}
            <hr/>
            <p><strong>Additional Information:</strong></p>
            ${additionalInfo}
            <hr/>
            <p>Please review the booking details above.</p>
            <a href="${adminDashboardLink}">View all room bookings here</a>
        `;

        // Client email content
        const clientEmailContent = `
            <p>Dear ${formData.personalDetails.firstName},</p>
            <p>Thank you for your room booking at Langwarrin Community Centre.</p>
            <p>Here are the details you submitted:</p>
            <hr/>
            <p><strong>Room Details:</strong></p>
            ${roomDetails}
            <hr/>
            <p><strong>Personal Details:</strong></p>
            ${personalDetails}
            <hr/>
            <p><strong>Additional Information:</strong></p>
            ${additionalInfo}
            <hr/>
            <p>We will review your booking and get back to you shortly.</p>
            <p>This mailbox is unmonitored. If in doubt, please contact <strong>(03) 9789 7653</strong> or <strong>reception@langwarrincc.org.au</strong>.</p>
            <p>Best regards,<br/>Langwarrin Community Centre</p>
        `;

        // Send email to admin
        await emailService.sendEmail(
            adminEmail,
            'New Room Booking Submission',
            undefined, // No plain text content
            adminEmailContent // HTML content
        );

        // Send confirmation email to the client
        await emailService.sendEmail(
            userEmail,
            'Thank you for your room booking',
            undefined, // No plain text content
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