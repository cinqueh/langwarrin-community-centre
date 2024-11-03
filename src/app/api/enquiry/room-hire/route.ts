import rateLimitHandler from "@/components/api/rate-limit";
import { RoomBookingEnquiryDTO } from "../../../../backend/dto/inquiry";
import RoomBookingInquiryService from "@/backend/service/room-booking-inquiry-service";
import IEmailServiceAdapter from '@/backend/service/email/email-adapter';
import NodeMailerService from '@/backend/service/email/node-mailer-service';

// Type guard to check if the request body is a valid RoomBookingEnquiryDTO
function isRoomBookingEnquiryDTO(body: any): body is RoomBookingEnquiryDTO {
    return (
        typeof body === 'object' &&
        typeof body.roomName === 'string' &&
        typeof body.hireType === 'string' &&
        typeof body.bookingDate === 'string' &&
        typeof body.bookingStartTime === 'string' &&
        typeof body.bookingEndTime === 'string' &&
        typeof body.purposeOfHire === 'string' &&
        typeof body.isOrganisationBooking === 'boolean' &&
        (body.organisationName === undefined || typeof body.organisationName === 'string') &&
        (body.organisationAddress === undefined || typeof body.organisationAddress === 'string') &&
        (body.otherCompaniesInvolved === undefined || typeof body.otherCompaniesInvolved === 'boolean') &&
        (body.companyDetails === undefined || typeof body.companyDetails === 'string') &&
        typeof body.numberAttending === 'number' &&
        (body.howDidYouHear === undefined || typeof body.howDidYouHear === 'string') &&
        (body.specialRequirements === undefined || typeof body.specialRequirements === 'string') &&
        typeof body.willLiquorBeConsumed === 'boolean' &&
        typeof body.person === 'object' &&
        typeof body.person.firstName === 'string' &&
        typeof body.person.surname === 'string' &&
        typeof body.person.email === 'string' &&
        typeof body.person.phoneNumber === 'string' &&
        typeof body.person.address === 'object' &&
        typeof body.person.address.state === 'string' &&
        typeof body.person.address.suburb === 'string' &&
        typeof body.person.address.postcode === 'string' &&
        typeof body.person.address.streetAddress === 'string'
    );
}

export async function POST(request: Request) {
    try {
        return await rateLimitHandler(request, async () => {
            const body = await request.json();

            // Validate the body
            if (!isRoomBookingEnquiryDTO(body)) {
                return new Response(
                    JSON.stringify({ error: 'Invalid input.' }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }

            const service = new RoomBookingInquiryService();
            const data = await service.newRoomBookingInquiry(body);

            // Email sending logic
            try {
                // Use the email service through the interface
                const emailService: IEmailServiceAdapter =
                    NodeMailerService.getInstance();
                    const adminEmail = process.env.ADMIN_CONFIRMATION_EMAIL || 'test.langwarrin.community@gmail.com';
                    const userEmail = body.person?.email || '';

                const baseUrl =
                    process.env.NEXT_PUBLIC_BASE_URL ||
                    'https://langwarrin-community-centre.vercel.app';
                const adminDashboardLink = `${baseUrl}/admin/room-hire`;

                // Room details (HTML formatted)
                const roomDetails = `
                    <p><strong>Room Name:</strong> ${body.roomName}</p>
                    <p><strong>Hire Type:</strong> ${body.hireType}</p>
                    <p><strong>Booking Date:</strong> ${body.bookingDate}</p>
                    <p><strong>Time:</strong> ${body.bookingStartTime} to ${body.bookingEndTime}</p>
                `;

                // Personal details (HTML formatted)
                const personalDetails = `
                    <p><strong>Full Name:</strong> ${body.person?.firstName} ${body.person?.surname}</p>
                    <p><strong>Email:</strong> ${body.person?.email}</p>
                    <p><strong>Phone Number:</strong> ${body?.person?.phoneNumber}</p>
                    <p><strong>Address:</strong> ${
                        body.person?.address?.streetAddress
                    }, ${body.person?.address?.suburb}, ${
                        body.person?.address?.state
                }, ${body.person?.address?.postcode}</p>
                `;

                // Additional information (HTML formatted)
                const additionalInfo = `
                    <p><strong>Purpose of Hire:</strong> ${body.purposeOfHire}</p>
                    <p><strong>Organisation Booking:</strong> ${
                        body.isOrganisationBooking ? 'Yes' : 'No'
                    }</p>
                    <p><strong>Organisation Name:</strong> ${
                        body.organisationName || 'N/A'
                    }</p>
                    <p><strong>Organisation Address:</strong> ${
                        body.organisationAddress || 'N/A'
                    }</p>
                    <p><strong>Other Companies Involved:</strong> ${
                        body.otherCompaniesInvolved ? 'Yes' : 'No'
                    }</p>
                    <p><strong>Company Details:</strong> ${
                        body.companyDetails || 'N/A'
                    }</p>
                    <p><strong>Number Attending:</strong> ${
                        body.numberAttending
                    }</p>
                    <p><strong>Special Requirements:</strong> ${
                        body.specialRequirements || 'None'
                    }</p>
                    <p><strong>Will Liquor be Consumed:</strong> ${
                        body.willLiquorBeConsumed ? 'Yes' : 'No'
                    }</p>
                    <p><strong>How Did You Hear About the Space:</strong> ${
                        body.howDidYouHear || 'N/A'
                    }</p>
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
                    <p>Dear ${body.person?.firstName},</p>
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
                    adminEmailContent // HTML content
                );

                // Send confirmation email to the client
                await emailService.sendEmail(
                    userEmail,
                    'Thank you for your room booking',
                    clientEmailContent // HTML content
                );
            } catch (error) {
                const errorMessage =
                    error instanceof Error ? error.message : 'Unknown error';
                console.error('Error sending emails:', errorMessage);

                return new Response(
                    JSON.stringify({
                        message: 'Error sending emails',
                        error: errorMessage,
                    }),
                    {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }

            // Return the original response
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        });
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: 'Failed to process request' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
