# Langwarrin Community Centre Website
<img style="width:100%;" alt="image" src="https://github.com/user-attachments/assets/51655f79-3b9b-48d2-84d9-d6733f536ce7">

## Table of Contents
- [Langwarrin Community Centre Website](#langwarrin-community-centre-website)
- [🚀 Overview](#-overview)
- [🤝 Handover](#-handover)
- [💻 Website Live Demo](#-website-live-demo)
- [👩‍💼 Admin Portal Live Demo](#-admin-portal-live-demo)
- [🧱 Website Builder Live Demo (Builder.io Integration)](#-website-builder-live-demo-builderio-integration)
- [🧑‍💻 Tech Stack](#-tech-stack)
- [🧠 Architecture Diagram](#-architecture-diagram)
- [🥳 Front-End Design](#-front-end-design)
- [🤖 Back-End Design](#-back-end-design)
- [🧪 Testing](#-testing)
- [🚨 Deployment & Security](#-deployment--security)
- [✅ Functional Requirements](#-functional-requirements)
- [🤔 Non-Functional Requirements](#-non-functional-requirements)
- [👥 Team Roles](#-team-roles)
- [📦 Releases](#-releases)
- [⬇️ Development Setup](#️-development-setup)

# 🚀 Overview
This project aims to develop a full-stack website for Langwarrin community centre that enhances user experience, manages course enrollment, and facilitates room bookings, and is easy to use for the admin of the website.

**Our solution comprises three parts**:
- Website (Used by the website visitors)
- Admin Portal (Used by the admin to view form submissions)
- Website Builder (Used by the admin to customise the website)

![IT Project Final Presentation](https://github.com/user-attachments/assets/8dfa57d0-4318-483d-9fc3-0d334527e234)

## 🤝 Handover
- [Product Tutorial](https://www.canva.com/design/DAGVNNJI6rg/sKF9NLLJkmC8wiUzMUYgnQ/view?utm_content=DAGVNNJI6rg&utm_campaign=designshare&utm_medium=link&utm_source=editor): This document provides a collection of images and step-by-step instructions to guide users through the practical usage of the product from the Admin perspective.
- [Handover Document](https://docs.google.com/document/d/14hsPGMhCdz77sbyPgamyaoxIJI8SXBFpsNKLtdbS-5k/edit?tab=t.0): This document offers an in-depth overview of the project's technical setup and details, focusing on comprehensive technical explanations. (**Please request access if you would like to view the documentation**)

## 💻 [Website Live Demo](https://langwarrin-community-centre.vercel.app/)
Explore the main website, designed for ease of use and accessibility. This site includes interactive elements such as course enrollment, room bookings, and an event calendar to enhance the community's experience.

<img style="width:100%;" alt="image" src="https://github.com/user-attachments/assets/9c14e674-29fe-49c6-a347-11427e33c01d">

## 👩‍💼 [Admin Portal Live Demo](https://langwarrin-community-centre.vercel.app/admin)
The Admin Portal allows administrators to manage memberships, program enrollments, room bookings, and receive notifications. It offers search functionalities to simplify management tasks, and admin can download the records in the database as CSV file.

> 🔑 To log into the Admin Portal, you need to be signed into the admin Google account. Please contact a team member to request access to the linked Google account for authentication.

<img style="width:100%;" alt="image" src="https://github.com/user-attachments/assets/5539e60b-5276-403f-a891-308b9000c707">
<img style="width:100%;" alt="image" src="https://github.com/user-attachments/assets/c5ad6f66-a7fb-4e11-8b9b-8310570d79d9">

## 🧱 Website Builder Live Demo (Builder.io Integration)
Experience the Website Builder, an intuitive interface that enables content updates without requiring technical skills. Admins can customise sections, update events, and modify website content seamlessly.

> 🚨 To customise the website using Builder Integration, you need to run the website locally and log in to [Builder.io](https://www.builder.io/). Please refer to [⬇️ Development Setup](#️-development-setup) to set up the project locally. **Note: The Admin Portal is not customisable.**  

<img style="width:100%;" alt="image" src="https://github.com/user-attachments/assets/6950ccfd-22eb-49fe-b562-69eaa2107c2c">

# 🧑‍💻 [Tech Stack](https://comp30022.atlassian.net/wiki/spaces/SD/pages/950306/Tech+Stack)

![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAF)
![image](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![image](https://img.shields.io/badge/-Builder.io-4B0082?style=for-the-badge&logoColor=white)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![image](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![image](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![image](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)
![image](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

| Aspect               | Technology & Tools                                     |
|----------------------|--------------------------------------------------------|
| **Frontend Framework** | Next.js, React, TypeScript                           |
| **Backend**          | Next.js                                               |
| **Deployment**       | Vercel (for frontend and full-stack deployment)       |
| **Content Management** | Builder.io (for client to easily update website content) |
| **Database**         | Supabase (Relational Database for Form Submissions)   |
| **Email Integration** | MailHog & Gmail (for sending automated emails and notifications) |
| **CI/CD**            | GitHub and Vercel (for continuous integration and deployment) |
| **Testing**          | Jest (for unit testing)                               |
| **Design Tool**      | Figma                                                 |

## 🧠 Architecture Diagram
![20f980d2-7810-4335-b0d1-b9bed9267b93](https://github.com/user-attachments/assets/269a8628-4dd7-4d51-b17f-2434ef7f9944)

## 🥳 Front-End Design
- [Brand Kit](https://comp30022.atlassian.net/wiki/spaces/SD/pages/4587524/Mock-Ups)
- [Design Process](https://comp30022.atlassian.net/wiki/spaces/SD/pages/4620293/Design+Process)
- [Low-Fidelity Prototype: Website](https://www.figma.com/design/NXSs4vt6K9tN8JgtXZkPzm/Website?node-id=0-1&t=xl1fF8n3Ae4wXqDA-1 )
- [Low-Fidelity Prototype: Admin Portal](https://www.figma.com/design/BYfztuVn3uFsKQg6VOr3hX/Admin-Portal-Low-Fidelity-Prototype?m=auto&t=m4mTpZf5HZapf4iz-1  )
- [High-Fidelity Prototype: Website](https://www.figma.com/design/0gINGrpaIEv0aU9VbNDcmD/Sprint-1-Work-High-Fidelity-Website-(LINKED)?m=auto&t=T12Zu0MqSc42ivDX-1 )
- [High-Fidelity Prototype: Admin Portal](https://www.figma.com/design/gX1ejB2utoWcNmtmZp3NUP/Admin-Portal?t=8jpXgYDusC8T8oRN-0)

## 🤖 Back-End Design
- [Technical Decisions](https://comp30022.atlassian.net/wiki/spaces/SD/pages/47939640/Technical+Decisions)
- [API Documentation](https://comp30022.atlassian.net/wiki/spaces/SD/pages/4128837/API+Documentation)
- [API Technical Architecture](https://comp30022.atlassian.net/wiki/spaces/SD/pages/46727173/API+Technical+Architecture)
- [Database Setup](https://comp30022.atlassian.net/wiki/spaces/SD/pages/3965018/Databases)

## 🧪 Testing
- [Testing Framework](https://comp30022.atlassian.net/wiki/spaces/SD/pages/491532/Testing)
- [Testing Plan](https://comp30022.atlassian.net/wiki/spaces/SD/pages/46661701/Testing+Plan)
- [Integration Testing](https://comp30022.atlassian.net/wiki/spaces/SD/pages/4096023/Integration+Testing)
- [API Testing](https://comp30022.atlassian.net/wiki/spaces/SD/pages/4521996/API+Tests+-+Overview)
- [Postman API Testing](https://comp30022.atlassian.net/wiki/spaces/SD/pages/46235650/Manual+Tests)
- [Accessibility Testing](https://comp30022.atlassian.net/wiki/spaces/SD/pages/52494338/Accessibility+Testing)
- [UX and Usability Testing](https://comp30022.atlassian.net/wiki/spaces/SD/pages/4161538/UX+and+Usability+Testing)
- [Unit Testing](https://comp30022.atlassian.net/wiki/spaces/SD/pages/4587580/Unit+Testing)
- [Traceability Matrix](https://comp30022.atlassian.net/wiki/spaces/SD/pages/92438539/Traceability+Matrix)

## 🚨 Deployment & Security
- [Deployment](https://comp30022.atlassian.net/wiki/spaces/SD/pages/12943362/Deployment)
- [Security](https://comp30022.atlassian.net/wiki/spaces/SD/pages/5570617/Security)

### Deployment Diagram
![Deployment Diagram](https://github.com/user-attachments/assets/cb16d3bc-bb8a-4de3-944e-4d30b67910ea)


## ✅ [Functional Requirements](https://comp30022.atlassian.net/wiki/spaces/SD/pages/24903681/Functional+Requirements)
- **User Experience:**
  - [x] Migrate all content from the old website.
  - [x] Implement a slideshow or list of upcoming events.
  
- **Course and Class Enrollment:**
  - [x] Digital membership signup form.
  - [x] Admin notifications for new submissions.
  - [x] Email automation for event notifications.

- **Membership System:**
  - [x] Admin dashboard for member management with search functionalities.
  - [x] Admin is able to download the Membership database as CSV file for future use, email sending.

- **Room Hire System:**
  - [x] Online booking requests with email notifications.
  - [x] Confirmation emails for bookings.

## 🤔 [Non-Functional Requirements](https://comp30022.atlassian.net/wiki/spaces/SD/pages/24051725/Non-Functional+Requirements)
  - Ensure easy navigation and engaging, interactive design.
  - Make the website appealing to all age groups.
  - Enable easy content management for the client.

## 👥 [Team Roles](https://comp30022.atlassian.net/wiki/spaces/SD/pages/426021/Team+Managment)
| Team Member     | Role(s)                        |
|-----------------|--------------------------------|
| **Zhen Liu**    | Product Owner, Backend Engineer|
| **Cinque Howells** | Scrum Master, DevOps Engineer |
| **Aarushi Dua** | UX Designer, Database Admin     |
| **Cindy Shi**   | UI Designer, Frontend Engineer  |
| **Noel Abraham**| UX Designer, Frontend Engineer  |

# 📦 Releases 
- [Release](https://github.com/cinqueh/langwarrin-community-centre/releases)
- [CI Pipeline](https://github.com/cinqueh/langwarrin-community-centre/actions/workflows/ci.yml)
- [CD Pipeline](https://github.com/cinqueh/langwarrin-community-centre/actions/workflows/deploy.yml)

# ⬇️ Development Setup

> ☁️ This project uses **Next.js**, a full-stack framework, which means the front-end and back-end are seamlessly integrated and do not require separate initialisation. Additionally, we are using **Supabase**, a cloud-hosted, open-source database, so there is no need to run a local SQL database server.

### Prerequisites
1. Ensure you have **Node.js** and **npm** installed on your machine.  
   - [Download Node.js](https://nodejs.org/)
   - [Download npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/cinqueh/langwarrin-community-centre.git
   cd langwarrin-community-centre
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   - Create a `.env.local` file in the project root.
   - Request necessary environment values from a team member to fill this file.

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   - This command starts the development server, making the app available **locally**.

5. **Build the Project for Production:**
   ```bash
   npm run build
   ```

6. **Start the Production Server:**
   ```bash
   npm run start
   ```
   - This will launch the production build.
