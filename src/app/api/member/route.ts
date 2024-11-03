import rateLimitHandler from "../../../components/api/rate-limit";
import { MemberDTO } from "../../../backend/dto/member";
import MemberService from "../../../backend/service/member-service";
import NodeMailerService from '@/backend/service/email/node-mailer-service'; 
import IEmailServiceAdapter from '@/backend/service/email/email-adapter'; // Reference the interface

function isMemberDTO(body: any): body is MemberDTO {
    return (
      typeof body === 'object' &&
      typeof body.title === 'string' &&
      (typeof body.person === 'object') &&
      (typeof body.person.address === 'object')
    );
}

export async function POST(request: Request) {
    try {
        return await rateLimitHandler(request, async() => {
            const body = await request.json();

            // Validate the body
            if (!isMemberDTO(body)) {
                return new Response(
                    JSON.stringify({ error: 'Invalid input.' }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            }
    
            const service = new MemberService();
            const data = await service.addMember(body);
            
            // Send the confirmation and notification emails
            try {
                const emailService: IEmailServiceAdapter = NodeMailerService.getInstance();
                const adminEmail = process.env.ADMIN_CONFIRMATION_EMAIL || 'test.langwarrin.community@gmail.com';
                const userEmail = body.person?.email || '';

                // Construct the link to the admin member dashboard page
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://langwarrin-community-centre.vercel.app';
                const adminDashboardLink = `${baseUrl}/admin/member`;

                // Email content for admin (HTML formatted)
                const adminEmailContent = `
                    <p>New membership form submitted:</p>
                    <hr/>
                    <p><strong>Title:</strong> ${body.title}</p>
                    <p><strong>First Name:</strong> ${body.person?.firstName}</p>
                    <p><strong>Last Name:</strong> ${body.person?.surname}</p>
                    <p><strong>Email:</strong> ${body.person?.email}</p>
                    <p><strong>Mobile:</strong> ${body.person?.phoneNumber}</p>
                    <p><strong>Home Phone:</strong> ${body.person?.homeNumber}</p>
                    <p><strong>Occupation:</strong> ${body.person?.occupation}</p>
                    <p><strong>Apartment:</strong> ${body.person?.address?.apartment || 'N/A'}</p>
                    <p><strong>Address:</strong> ${body.person?.address?.streetAddress}</p>
                    <p><strong>Suburb:</strong> ${body.person?.address?.suburb}</p>
                    <p><strong>State:</strong> ${body.person?.address?.state}</p>
                    <p><strong>Postcode:</strong> ${body.person?.address?.postcode}</p>
                    <hr/>
                    <p>Please review the submission details above.</p>
                    <a href="${adminDashboardLink}">View all membership enquiries here</a>
                `;

                // Email content for client (HTML formatted)
                const clientEmailContent = `
                    <p>Dear ${body.person?.firstName},</p>
                    <p>Thank you for submitting your membership form to the Langwarrin Community Centre.</p>
                    <p>Here are the details you submitted:</p>
                    <hr/>
                    <p><strong>Title:</strong> ${body.title}</p>
                    <p><strong>First Name:</strong> ${body.person?.firstName}</p>
                    <p><strong>Last Name:</strong> ${body.person?.surname}</p>
                    <p><strong>Email:</strong> ${body.person?.email}</p>
                    <p><strong>Mobile:</strong> ${body.person?.phoneNumber}</p>
                    <p><strong>Home Phone:</strong> ${body.person?.homeNumber}</p>
                    <p><strong>Occupation:</strong> ${body.person?.occupation}</p>
                    <p><strong>Apartment:</strong> ${body.person?.address?.apartment || 'N/A'}</p>
                    <p><strong>Address:</strong> ${body.person?.address?.streetAddress}</p>
                    <p><strong>Suburb:</strong> ${body.person?.address?.suburb}</p>
                    <p><strong>State:</strong> ${body.person?.address?.state}</p>
                    <p><strong>Postcode:</strong> ${body.person?.address?.postcode}</p>
                    <hr/>
                    <p>We will review your submission and get back to you soon.</p>
                    <p>This mailbox is unmonitored. If in doubt, please contact <strong>(03) 9789 7653</strong> or <strong>reception@langwarrincc.org.au.</strong></p>
                    <p>Best regards,<br/>Langwarrin Community Centre</p>
                `;

                // Send email to admin
                await emailService.sendEmail(
                    adminEmail,
                    'New Membership Form Submission',
                    adminEmailContent // HTML content
                );

                // Send confirmation email to the user
                await emailService.sendEmail(
                    userEmail,
                    'Thank you for your membership form submission',
                    clientEmailContent // HTML content
                );

                console.log('Emails sent successfully');
            } catch (emailError) {
                console.error('Error sending emails:', emailError);
            }

            return new Response(
                JSON.stringify(data),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to process request' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
