import rateLimitHandler from "@/components/api/rate-limit";
import { FeedbackInquiryDTO } from "../../../../backend/dto/inquiry";
import FeedbackInquiryService from "@/backend/service/feedback-inquiry-service";

function isFeedbackInquiryDTO(body: any): body is FeedbackInquiryDTO {
    return (
        typeof body === 'object' &&
        typeof body.programName === 'string' &&
        typeof body.feedback === 'string' &&
        (typeof body.person === 'object') &&
        (typeof body.person.address === 'object')
    );
}

export async function POST(request: Request) {
    try {
        return rateLimitHandler(request, async() => {
            const body = await request.json();

            // Validate the body
            if (!isFeedbackInquiryDTO(body)) {
                return new Response(
                    JSON.stringify({ error: 'Invalid input.' }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            }
    
            const service = new FeedbackInquiryService();
            const data = await service.newFeedbackInquiry(body);
    
            return new Response(
                JSON.stringify(data),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        });
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