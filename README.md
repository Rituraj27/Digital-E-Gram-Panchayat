# Project Report: Digital Panchayat

## 1. Introduction

Digital Gram Panchayat is a web-based platform designed to streamline the application and resolution process for government schemes and grievances. This platform enables users to register, apply for schemes or file grievances, track their status, and receive real-time notifications at every stage. The project also includes a robust administrative module, where the admin can manage schemes, announcements, and monitor employee performance through visual analytics.

This report provides a detailed explanation of the system, its features, workflow, and the technology stack used. The project aims to ensure transparency, efficiency, and seamless communication between users, employees, and administrators.

## 2. Objectives

- **User Accessibility**: Provide an easy-to-use platform for users to apply for government schemes or file grievances and monitor their status.
- **Efficient Ticket Management**: Automatically assign applications to employees, ensuring fair distribution of workloads.
- **Real-time Notifications**: Keep users and employees updated with real-time status changes and notifications.
- **Admin Oversight**: Offer comprehensive tools for the admin to manage schemes, view employee performance, track open and closed tickets, and ensure efficient grievance redressal.
- **Downloadable Applications**: Allow users to download their submitted applications in PDF format using jsPDF.

## 3. Technology Stack

### Frontend:

- **React.js**: For building the dynamic and interactive user interface.
- **Tailwind CSS**: Used for styling, providing rapid UI development with utility-first classes.
- **ShadCN**: Component library used to style and structure components efficiently.
- **Vite**: Frontend build tool that ensures fast development and optimized production builds.
- **Deployment Platform**: The frontend is deployed using Vercel for serverless hosting.

### Backend:

- **Node.js**: A powerful runtime environment used for handling backend logic and server-side processes.
- **Express.js**: A lightweight and flexible framework for handling routing and HTTP requests.
- **MongoDB**: NoSQL database to store and manage data related to users, employees, schemes, grievances, and notifications.
- **JWT (JSON Web Token)**: For secure user and employee authentication.
- **bcrypt**: Used for hashing passwords to ensure the security of stored credentials.
- **Twilio**: Integrated to send SMS notifications at different stages of the application process.
- **Deployment Platform**: The backend is deployed on Render, providing robust server hosting and API management.

### Version Control and Collaboration:

- **GitHub**: The codebase is maintained on GitHub for version control and team collaboration.

### Libraries:

- **jsPDF**: For generating downloadable PDFs of user-submitted forms for schemes and grievances.

## 4. Features

- User Registration and Authentication
- Scheme and Grievance Application
- Automatic Ticket Assignment
- Real-time Status Updates
- Admin Dashboard
- Communication Between Employees and Admin
- Graphical Insights
- Notification System

## 5. Workflow

- User Registration & Login
- Application Process
- Employee Actions
- Admin Actions
- Employee Performance Tracking
- Communication System
- Notifications

## 6. Security and Privacy

- Authentication and Authorization: The platform employs JWT to secure authentication processes. This ensures that only authorized users can access the system.
- Data Encryption: Passwords are stored securely using bcrypt, and sensitive communication between the frontend and backend is encrypted.
- Role-Based Access: Different roles (user, employee, admin) have different levels of access, ensuring data protection and integrity.

## 7. Deployment

- The frontend of the application is deployed on Vercel, ensuring high performance and quick loading times for users.
- The backend is hosted on Render, which provides reliable and scalable server infrastructure to handle API requests.
- The entire project is maintained on GitHub, allowing seamless collaboration, code management, and version control.

## 8. Challenges and Solutions

- Efficient Ticket Assignment: To ensure balanced workloads for employees, the random assignment algorithm was optimized to distribute tickets fairly.
- Real-time Notifications: Integrating Twilio for real-time notifications helped keep all stakeholders informed at every stage, enhancing user experience.
- PDF Generation: Implementing jsPDF allowed users to download forms in PDF format, ensuring they have a record of their applications.

## 9. Conclusion

This Digtal Gram Panchayat serves as a reliable, scalable solution for managing government schemes and grievances. It provides a streamlined process for users to apply, employees to manage tickets, and admins to monitor operations. With real-time notifications, performance tracking, and a robust admin dashboard, the system is designed to enhance transparency, communication, and efficiency in handling applications and grievances.

Future enhancements could include multi-language support, AI-based ticket prioritization, and integration with additional government services.

##HomePage

![user-homepage](https://github.com/user-attachments/assets/d26210c9-a0f5-4556-bec0-6987aeb1e537)

##Admin Dashboard

![admin dashboard](https://github.com/user-attachments/assets/c29e68ca-e6cb-434e-abc9-f065effa3cce)
