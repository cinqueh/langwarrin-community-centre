import GeneralInquiryService from "../../../../backend/service/general-inquiry-service";
import { GeneralInquiryDTO, InquiryDTO } from "../../../../backend/dto/inquiry";
import AdminEditService from "@/backend/service/admin/admin-edit-service";
import { auth } from "../../../../../auth";
import { authorizeRoute } from "@/components/admin/auth";

function isInquiryDTO(body: any): body is InquiryDTO {
    return (
        typeof body === 'object' &&
        typeof body.inquiryId === 'number' &&
        typeof body.notes === 'string'
    );
}

export async function PUT(request: Request) {
    try {
        return authorizeRoute(
            async () => {

                // verify the user is authorized
                const session = await auth();
            
                // if not authenticated, redirect to the login page
                if (!session) {
                    return new Response(
                        JSON.stringify({ error: 'Unauthorized.' }),
                        {
                            status: 403,
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );
                }

                const body = await request.json();

                // Validate the body
                if (!isInquiryDTO(body)) {
                    return new Response(
                        JSON.stringify({ error: 'Invalid input.' }),
                        {
                            status: 400,
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );
                }

                const service = new AdminEditService();
                const data = await service.saveNote(body);

                return new Response(
                    JSON.stringify(data),
                    {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            }
        )
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