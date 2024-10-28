// In email-adapter.ts
export default interface IEmailServiceAdapter {
    sendEmail(to: string, subject: string, content: string): Promise<void>;
    sendBulkEmail(to: string[], subject: string, content: string): Promise<void>;
}
