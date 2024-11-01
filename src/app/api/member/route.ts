import rateLimitHandler from "@/components/api/rate-limit";
import { MemberDTO } from "../../../backend/dto/member";
import MemberService from "../../../backend/service/member-service";

function isMemberDTO(body: any): body is MemberDTO {
    return (
      typeof body === 'object' &&
      typeof body.title === 'string' &&
      (typeof body.person === 'object') &&
      (typeof body.person.address === 'object')
    );
}

export async function POST(request: Request) {
    try {
        return rateLimitHandler(request, async() => {
            const body = await request.json();

            // Validate the body
            if (!isMemberDTO(body)) {
                return new Response(
                    JSON.stringify({ error: 'Invalid input.' }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            }
    
            const service = new MemberService();
            const data = await service.addMember(body);
    
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