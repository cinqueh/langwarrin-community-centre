import ChildcareInquirySessionService from "../../../../backend/service/childcare-session-inquiry-service";
import { ChildcareInquirySessionDTO } from "../../../../backend/dto/inquiry";

function isChildcareInquirySessionDTO(body: any): body is ChildcareInquirySessionDTO {
    return (
        typeof body === 'object' &&
        typeof body.inquiryId === 'number' &&
        typeof body.childId === 'number' &&
        typeof body.childcareSessionId === 'number'
    );
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the body
        if (!isChildcareInquirySessionDTO(body)) {
            return new Response(JSON.stringify({ error: 'Invalid input.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const service = new ChildcareInquirySessionService();
        const data = await service.addChildcareInquirySession(body);

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to process request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
