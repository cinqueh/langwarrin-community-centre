import ChildService from "../../../../backend/service/child-service";
import { ChildDTO } from "../../../../backend/dto/childcare/child";

function isChildDTO(body: any): body is ChildDTO {
    return (
        typeof body === "object" &&
        typeof body.childAge === "number" &&
        typeof body.childFirstName === "string" &&
        typeof body.childSurname === "string"
    );
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the body
        if (!isChildDTO(body)) {
            return new Response(JSON.stringify({ error: "Invalid input." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const service = new ChildService();
        const data = await service.addChild(body);

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