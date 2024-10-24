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

    public async sendEmail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to,
            subject,
            text,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
