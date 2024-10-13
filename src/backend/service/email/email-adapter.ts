export default interface IEmailServiceAdapter {
    sendEmail(to: string, subject: string, text: string): Promise<void>;
  }