# Langwarrin Community Centre Website

## Overview
This project aims to develop a full-stack website for Langwarrin community centre that enhances user experience, manages course enrollment, and facilitates room bookings, and is easy to use for the admin of the website.

## [Tech Stack](https://comp30022.atlassian.net/wiki/spaces/SD/pages/950306/Tech+Stack)

![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAF)
![image](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

- **Frontend Framework:** Next.js, React, TypeScript
- **Backend:** Next.js
- **Deployment:** Vercel (for frontend and full-stack deployment)
- **Content Management:** Builder.io (for client to easily update website content)
- **Database:** Supabase (Relational Database for Form Submissions)
- **Email Integration:** MailHog & Gmail (for sending automated emails and notifications)
- **CI/CD:** GitHub and Vercel (for continuous integration and deployment)
- **Testing:** Jest (for unit testing)
- **Design Tool:** Figma

### Architecture Diagram
![Screen Shot 2024-09-24 at 8 52 06 PM](https://github.com/user-attachments/assets/7a2e43dc-4d83-4f28-aad5-b508c4071e42)

### Front-End Design
- [Brand Kit](https://comp30022.atlassian.net/wiki/spaces/SD/pages/4587524/Mock-Ups)
- [Design Process](https://comp30022.atlassian.net/wiki/spaces/SD/pages/4620293/Design+Process)
- [Low-Fidelity Prototype](https://www.figma.com/design/NXSs4vt6K9tN8JgtXZkPzm/Sprint-1-Work-Low-Fidelity-Website?m=auto&t=BWesKCaJdcb3KWLp-1)
- [High-Fidelity Prototype](https://www.figma.com/design/5aMnpCbpzZ51NunJXBhhFs/Sprint-1-Work-High-Fidelity-Website?m=auto&t=BWesKCaJdcb3KWLp-1)

### Back-End Design
- [Technical Decisions](https://comp30022.atlassian.net/wiki/spaces/SD/pages/47939640/Technical+Decisions)
- [API Documentation](https://comp30022.atlassian.net/wiki/spaces/SD/pages/4128837/API+Documentation)
- [API Technical Architecture](https://comp30022.atlassian.net/wiki/spaces/SD/pages/46727173/API+Technical+Architecture)
- [Database Setup](https://comp30022.atlassian.net/wiki/spaces/SD/pages/3965018/Databases)


## [Team Roles](https://comp30022.atlassian.net/wiki/spaces/SD/pages/426021/Team+Managment)
- **Zhen Liu:** Backend Developer, Product Owner
- **Cinque Howells:** Backend Lead, Scrum Master
- **Aarushi Dua:** Lead Designer, Backend Developer
- **Cindy Shi:** Designer, Frontend Lead
- **Noel Abraham:** Designer, Frontend Developer, Minute Taker

## Getting Started
1. Ensure you have Node.js and npm installed.
2. Clone the repository:
   ```bash
   git clone https://github.com/cinqueh/langwarrin-community-centre.git
   cd langwarrin-community-centre
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file in the repository root and request the necessary values from a team member.
5. To run the development server, use:
   ```bash
   npm run dev
   ```

## [Functional Requirements](https://comp30022.atlassian.net/wiki/spaces/SD/pages/24903681/Functional+Requirements)
- **User Experience:**
  - Migrate all content from the old website.
  - Implement a slideshow or list of upcoming events.
  
- **Course and Class Enrollment:**
  - Digital membership signup form.
  - Admin notifications for new submissions.
  - Email automation for event notifications.

- **Membership System:**
  - Admin dashboard for member management with search and filter functionalities.

- **Room Hire System:**
  - Online booking requests with email notifications.
  - Confirmation emails for bookings.

## [Non-Functional Requirements](https://comp30022.atlassian.net/wiki/spaces/SD/pages/24051725/Non-Functional+Requirements)
  - Ensure easy navigation and engaging, interactive design.
  - Make the website appealing to all age groups.
  - Enable easy content management for the client.
