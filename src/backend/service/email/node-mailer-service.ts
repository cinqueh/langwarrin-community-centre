import nodemailer, { Transporter } from 'nodemailer';
import IEmailServiceAdapter from './email-adapter';

export default class NodeMailerService implements IEmailServiceAdapter {
    private static instance: NodeMailerService;
    private transporter: Transporter;

    private constructor() {
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

    async sendEmail(to: string, subject: string, content: string): Promise<void> {
        try {
            const mailOptions: nodemailer.SendMailOptions = {
                from: process.env.GMAIL_USER,
                to,
                subject,
            };
    
            mailOptions.html = content;
    
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error(`Error sending email: ${(error as Error).toString()}`);
        }
    }

    public async sendBulkEmail(to: string[], subject: string, text: string) {
      to.forEach(email => this.sendEmail(email, subject, text));
    }
}
