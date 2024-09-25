import RoomService from "@/backend/service/room-service";

export async function GET(request: Request) {
    try {
        const service = new RoomService();
        const data = await service.getRooms();

        return new Response(
            JSON.stringify(data),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Failed to fetch content' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}