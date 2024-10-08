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

export async function GET(request: Request) {
    try {
        const service = new ChildcareSessionService();
        const data = await service.getAllSessions(); // Using the getAllSessions() method from the service

        return new Response(
            JSON.stringify(data),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Failed to fetch childcare sessions' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
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