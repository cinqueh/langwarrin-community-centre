/**
 * @jest-environment node
 */
import IEmailServiceAdapter from '../../../../../backend/service/email/email-adapter';
import NodeMailerService from '../../../../../backend/service/email/node-mailer-service';
import nodemailer from 'nodemailer';
import Docker from 'dockerode';
import axios from 'axios';


describe('MailHog Email Test', () => {

    const docker = new Docker();
    let mailhogContainer: Docker.Container;

    beforeAll(async () => {
        // Spin up the MailHog container before running tests
        mailhogContainer = await docker.createContainer({
          Image: 'mailhog/mailhog',
          name: 'mailhog-test-container',
          HostConfig: {
            PortBindings: {
              '1025/tcp': [{ HostPort: '1025' }],
              '8025/tcp': [{ HostPort: '8025' }],
            },
          },
        });
        
        await mailhogContainer.start();
        console.log('MailHog container started');
    });

    afterAll(async () => {
        // Clean up and remove the MailHog container after tests
        if (mailhogContainer) {
          await mailhogContainer.stop();
          await mailhogContainer.remove();
          console.log('MailHog container stopped and removed');
        }
    });

    beforeEach(async () => {
        // Clear MailHog inbox before each test by sending a DELETE request
        await axios.delete('http://localhost:8025/api/v1/messages');

        process.env.GMAIL_USER = 'testuser@gmail.com';

        // Reset the NodeMailerService singleton instance before each test
        (NodeMailerService as any).instance = null;

        // Mock nodemailer.createTransport to use MailHog's SMTP configuration
        jest.spyOn(nodemailer, 'createTransport').mockReturnValue(
            nodemailer.createTransport({
                host: 'localhost',
                port: 1025,  // MailHog SMTP port
                secure: false,  // No TLS required for MailHog
                auth: {
                user: 'testuser',  // No authentication needed for MailHog
                pass: 'testpass',
                },
            })
        );
    });

    it('should capture an email sent', async () => {

        const mailService = NodeMailerService.getInstance();

        // Step 2: Send an email to MailHog
        await mailService.sendEmail(
            'recipient@test.com',
            'Test Email',
            'This is a test email.'
        );

        // Step 3: Wait for MailHog to capture the email
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Step 4: Query MailHog API to verify the email was sent
        const response = await axios.get('http://localhost:8025/api/v2/messages');
        const messages = response.data.items;

        // Verify that the email was captured by MailHog
        expect(messages.length).toBeGreaterThan(0); // Ensure at least one email was sent
        const email = messages[0];

        // Verify email details
        expect(email.Content.Headers.Subject[0]).toBe('Test Email');
        expect(email.Content.Headers.To[0]).toBe('recipient@test.com');
        expect(email.Content.Body).toContain('This is a test email.');
    });
});