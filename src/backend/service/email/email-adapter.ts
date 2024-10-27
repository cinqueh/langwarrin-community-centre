// In email-adapter.ts
export default interface IEmailServiceAdapter {
  sendEmail(to: string, subject: string, text?: string, html?: string): Promise<void>;
}
