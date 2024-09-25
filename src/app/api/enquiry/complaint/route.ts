import ComplaintInquiryService from "../../../../backend/service/complaint-inquiry-service";
import { ComplaintInquiryDTO } from "../../../../backend/dto/inquiry";

function isComplaintInquiryDTO(body: any): body is ComplaintInquiryDTO {
  return (
    typeof body === 'object' &&
    typeof body.programName === 'string' &&
    typeof body.grievanceReason === 'string' &&
    typeof body.suggestedSolution === 'string' &&
    (typeof body.person === 'object')
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the body
    if (!isComplaintInquiryDTO(body)) {
      return new Response(
        JSON.stringify({ error: 'Invalid input.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const service = new ComplaintInquiryService();
    const data = await service.newComplaintInquiry(body);

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