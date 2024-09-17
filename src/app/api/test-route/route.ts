import NodeMailerService from '@/backend/service/email/node-mailer-service';
import IEmailServiceAdapter from '@/backend/service/email/email-adapter';


export async function GET(request: Request) {
    try {
        // get the service
        const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();

        // Call the sendEmail function (assuming it sends an email successfully)
        await emailService.sendEmail("cinque.howells@gmail.com", "Test", "Test email!");
    
        // Return a response with a success message
        return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {

        const err = error as Error;

        // Handle any errors that occur during email sending
        return new Response(JSON.stringify({ message: "Failed to send email", error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
}