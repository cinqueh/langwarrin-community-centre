import { RoomBookingEnquiryDTO } from "../../../../backend/dto/inquiry";
import RoomBookingInquiryService from "@/backend/service/room-booking-inquiry-service";

// Type guard to check if the request body is a valid RoomBookingEnquiryDTO 
function isRoomBookingEnquiryDTO(body: any): body is RoomBookingEnquiryDTO {
    return (
        typeof body === 'object' &&
        typeof body.roomName === 'string' &&
        typeof body.hireType === 'string' &&
        typeof body.bookingDate === 'string' &&
        typeof body.bookingStartTime === 'string' &&  // New validation
        typeof body.bookingEndTime === 'string' &&    // New validation
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
        typeof body.person.address.streetAddress === 'string' // Updated address fields
    );
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the body
        if (!isRoomBookingEnquiryDTO(body)) {
            return new Response(
                JSON.stringify({ error: 'Invalid input.' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        const service = new RoomBookingInquiryService();
        const data = await service.newRoomBookingInquiry(body);

        return new Response(
            JSON.stringify(data),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: 'Failed to process request' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}