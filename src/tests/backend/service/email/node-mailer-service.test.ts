import NodeMailerService from '../../../../backend/service/email/node-mailer-service';
import nodemailer from 'nodemailer';

// Mock nodemailer
jest.mock('nodemailer');

describe('NodeMailerService', () => {
    let sendMailMock: jest.Mock;
    let transporterMock: nodemailer.Transporter;

    const resetSingleton = () => {
        (NodeMailerService as any).instance = null;
    };

    beforeEach(() => {
        // Reset and clear mocks before each test
        jest.clearAllMocks();

        // Mock environment variables
        process.env.GMAIL_USER = 'testuser@gmail.com';
        process.env.GMAIL_PASSWORD = 'testpassword';

        // Create a mock transport object
        sendMailMock = jest.fn().mockResolvedValue({ response: '250 OK' });
        transporterMock = {
            sendMail: sendMailMock,
        } as unknown as nodemailer.Transporter;

        // Mock the createTransport method to return the transporterMock
        (nodemailer.createTransport as jest.Mock).mockReturnValue(transporterMock);

        NodeMailerService.getInstance();
    });

    afterEach(() => {
        // Reset the singleton instance after each test
        resetSingleton();
    });

    it('should initialize the transporter correctly', () => {
        // Call to initialize
        expect(nodemailer.createTransport).toHaveBeenCalledWith({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
    });

    it('should return the same instance (singleton behavior)', () => {
        const instance1 = NodeMailerService.getInstance();
        const instance2 = NodeMailerService.getInstance();
        expect(instance1).toBe(instance2);  // Both instances should be the same
    });

    it('should call sendMail with correct parameters', async () => {
        const emailService = NodeMailerService.getInstance();

        // Call sendEmail method
        await emailService.sendEmail('test@example.com', 'Test Subject', 'Test body');

        // Check if sendMail was called with correct arguments
        expect(sendMailMock).toHaveBeenCalledWith({
            from: process.env.GMAIL_USER,
            to: 'test@example.com',
            subject: 'Test Subject',
            text: 'Test body',
        });
    });

    it('should log error if sending email fails', async () => {
        const emailService = NodeMailerService.getInstance();

        // Mock sendMail to throw an error
        sendMailMock.mockRejectedValue(new Error('SMTP error'));

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Call sendEmail and catch the error
        await emailService.sendEmail('test@example.com', 'Test Subject', 'Test body');

        // Check that the error was logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending email: Error: SMTP error');
        
        consoleErrorSpy.mockRestore();
    });
});