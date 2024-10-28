export class EmailRequestDTO {
    recipients: string[];
    subject: string;
    body: string;
  
    constructor(data: {
        recipients: string[],
        subject: string,
        body: string
    }) {
      this.recipients = data.recipients;
      this.subject = data.subject;
      this.body = data.body;
    }
  }