import ChildcareProgramService from "../../../../backend/service/childcare-program-service";
import { ChildcareProgramDTO } from "../../../../backend/dto/childcare/childcareprogram";

function isChildcareProgramDTO(body: any): body is ChildcareProgramDTO {
    return (
        typeof body === "object" &&
        typeof body.programName === "string" &&
        typeof body.childcareSessionId === "number"
    );
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the body
        if (!isChildcareProgramDTO(body)) {
            return new Response(JSON.stringify({ error: "Invalid input." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const service = new ChildcareProgramService();
        const data = await service.addChildcareProgram(body);

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