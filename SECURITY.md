# Security Policy

## Security Practices Overview

### Authentication and Authorization

- **Authentication Mechanism**: Authentication is performed through the Auth.js library, using the OAuth 2.0 protocol. An admin authenticates with a trusted identity provider, Google, issuing a JSON Web Token (JWT) for their session. 
- **Protection**: JSON Web Tokens (JWTs) are issued with an expiry time of 30 minutes to limit misuse if compromised.
- **Authorization**: Access controls are role-based, and currently, only one role exists through provided Gmail credentials. 
- **Access Control**: Strict access routes ensure only authenticated admins can perform CRUD operations, aligning with the least privilege principle.

### Data Protection

- **Sensitive Information**: The platform handles sensitive data such as personal names, emails, contact phone numbers, addresses, and children’s details.
- **Encryption**: Our website does not handle encryption as no sensitive data is stored in the system.
- **Environment Variables**: API keys and other sensitive information are stored in environment variables, not hard-coded, and distributed to developers on a need-to-know basis.
- **Dependencies**: External libraries are listed in the `package.json` file, and `npm audit` is regularly used to check for vulnerabilities.

### Secure Communication

- **SSL Encryption**: All data is secured through SSL encryption provided by Vercel, ensuring HTTPS for secure data transmission.
- **Rate Limiting**: Form submissions are limited to 10 requests per minute to prevent abuse.
- **DDoS Protection**: Vercel's automatic DDoS mitigation protects against abnormal traffic and suspicious request levels.
- **API Security**: All API requests and responses are conducted over HTTPS to ensure secure communication.

### Code Integrity and Reviews

- **Review Process**: Every pull request is reviewed by at least one team member to maintain code quality and prevent malicious code injections.
- **Deployment Security**: Only developers have access to the deployment pipeline to ensure controlled and secure deployments.
- **Transparency**: Code readability and maintainability are prioritized, with regular reviews and meaningful comments to avoid complexity and future issues.

### Logging and Monitoring

- **Logging**: Basic logging and monitoring are provided by Vercel during deployments to help track activity and detect any potential security issues.

### API Security

- **XSS Prevention**: User inputs are sanitized with an XSS library to prevent injection vulnerabilities.
- **SQL Injection Prevention**: The Supabase client enforces parameterized queries, minimizing SQL injection risks.

## Future Considerations

- **Two-Factor Authentication (2FA)**: Implementing 2FA for admins as an additional layer of security.
- **Detailed Logging**: Enhanced monitoring for critical events and integration with alert services such as Opsgenie.
- **Regular Security Audits**: Periodic penetration testing and security audits to address emerging threats.

## Reporting a Vulnerability

We take the security of our application seriously and appreciate the responsible disclosure of potential vulnerabilities. If you discover a security issue, please follow the guidelines below to report it:

### Reporting Process

- **GitHub Issue**: Report vulnerabilities by creating a new issue in our GitHub repository. Prefix the issue title with “[Security]” for clear identification.
- **Confidentiality**: Please do not publicly disclose the vulnerability until we have had a chance to investigate and address it.
- **Provide Details**: Include comprehensive details such as steps to reproduce the vulnerability, potential impact, and any relevant information.

Note: Please understand that not all reported issues may be valid vulnerabilities, but we appreciate your effort in bringing them to our attention.
