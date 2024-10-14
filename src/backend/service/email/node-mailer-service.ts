
import nodemailer, { Transporter } from 'nodemailer';
import IEmailServiceAdapter from './email-adapter';

// Singleton email service
export default class NodeMailerService implements IEmailServiceAdapter {
    private static instance: NodeMailerService;
    private transporter: Transporter;

    private constructor() {
      // Initalise the transporter
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    }

    public static getInstance(): NodeMailerService {
        if (!NodeMailerService.instance) {
          NodeMailerService.instance = new NodeMailerService();
        }
        return NodeMailerService.instance;
    }

    // Send Email
    public async sendEmail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: to,
            subject: subject,
            text: text,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`Email sent: ${info.response}`);
        } catch (error) {
            console.error(`Error sending email: ${error}`);
        }
    }
}