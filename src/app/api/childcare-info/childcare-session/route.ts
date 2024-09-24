import ChildcareSessionService from "../../../../backend/service/childcare-session-service";
import { ChildcareSessionDTO } from "../../../../backend/dto/childcare/childcaresession";

function isChildcareSessionDTO(body: any): body is ChildcareSessionDTO {
    return (
        typeof body === "object" &&
        typeof body.day === "string" &&
        typeof body.startTime === "string" &&
        typeof body.endTime === "string"
    );
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the body
        if (!isChildcareSessionDTO(body)) {
            return new Response(JSON.stringify({ error: "Invalid input." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const service = new ChildcareSessionService();
        const data = await service.addChildcareSession(body);

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to process request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}