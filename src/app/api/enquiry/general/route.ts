import GeneralInquiryService from "../../../../backend/service/general-inquiry-service";
import { GeneralInquiryDTO } from "../../../../backend/dto/inquiry";

function isGeneralInquiryDTO(body: any): body is GeneralInquiryDTO {
    return (
        typeof body === 'object' &&
        typeof body.message === 'string' &&
        (typeof body.person === 'object')
    );
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log("Received");

        // Validate the body
        if (!isGeneralInquiryDTO(body)) {
            return new Response(
                JSON.stringify({ error: 'Invalid input.' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        const service = new GeneralInquiryService();
        const data = await service.newGeneralInquiry(body);

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