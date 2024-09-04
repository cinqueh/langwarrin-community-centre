import { Calculator } from '../../../backend/controller/TestController';

export async function GET(request: Request) {

    const cal = new Calculator();

    return new Response(JSON.stringify({
        sum: cal.add(1, 1),
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}