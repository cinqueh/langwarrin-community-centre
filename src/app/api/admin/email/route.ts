import { authorizeRoute } from "@/components/admin/auth";
import { EmailRequestDTO } from "@/backend/dto/email";
import BrevoService from "@/backend/service/email/brevo-service";
import IEmailServiceAdapter from "@/backend/service/email/email-adapter";

function isStringArray(value: any): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function isEmailRequest(body: any): body is EmailRequestDTO {
    return (
        typeof body === 'object' &&
        isStringArray(body.recipients) &&
        typeof body.subject === 'string' &&
        typeof body.body === 'string'
    );
}

export async function POST(request: Request) {
    try {
        return authorizeRoute(
            async () => {

                const body = await request.json();

                // Validate the body
                if (!isEmailRequest(body)) {
                    return new Response(
                        JSON.stringify({ error: 'Invalid input.' }),
                        {
                            status: 400,
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );
                }

                console.log(body);

                const service: IEmailServiceAdapter = new BrevoService();
                const data = await service.sendBulkEmail(body.recipients, body.subject, body.body);

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