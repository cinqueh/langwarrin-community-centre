import IEmailServiceAdapter from './email-adapter';

// Singleton email service
export default class BrevoService implements IEmailServiceAdapter {

    private readonly API_PATH = 'https://api.brevo.com/v3/smtp/email';

    public async sendBulkEmail(to: string[], subject: string, text: string) {

        const emailData = {
            sender: { email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME },
            to: to.map(email => ({ email })),
            subject: subject,
            htmlContent: text,
        };
        
        const response = await fetch(this.API_PATH, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.BREVO_API_KEY || ''
            },
            body: JSON.stringify(emailData)
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error sending bulk email:', errorData);
            throw new Error(`Failed to send email: ${errorData.message || 'Unknown error'}`);
        } else {
            const responseData = await response.json();
        }
    }

    // Send Email
    public async sendEmail(to: string, subject: string, text: string) {
        this.sendBulkEmail([to], subject, text);
    }
}