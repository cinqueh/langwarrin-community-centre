import NewsService from "@/backend/service/news-service";
import ProgramService from "@/backend/service/program-service";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const service = new NewsService();
        const data = await service.getNews();
  
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
            JSON.stringify({ error: 'Failed to fetch content' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
  }
  