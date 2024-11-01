// rateLimitHandler.ts
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Initialize the rate limiter
const rateLimiter = new RateLimiterMemory({
  points: Number(process.env.API_RATE_LIMIT_POINTS) || 10, // Default to 10 requests
  duration: Number(process.env.API_RATE_LIMIT_DURATION) || 60, // Default to 60 seconds
});

export default async function rateLimitHandler(
  request: Request,
  onSuccess: () => Promise<Response> | Response
): Promise<Response> {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || request.headers.get('host');

    await rateLimiter.consume(ip as string);

    // Call the onSuccess callback if within the rate limit
    return await onSuccess();
  } catch {
    // Return a 429 response if the rate limit is exceeded
    return new Response(
      JSON.stringify({ error: 'Too Many Requests' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
