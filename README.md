# User-auth-Project

A full-stack user authentication system built with **Next.js**, **Prisma**, **PostgreSQL**, and **NextAuth.js**. The project allows users to register, log in (both via email/password and Google), and reset their passwords. It also includes email verification for password reset and token-based authentication.

## Features

- **Email/Password Authentication**: Users can register and log in with their email and password.
- **Google Authentication**: Users can sign up and log in using their Google account.
- **Password Reset**: Users can reset their password by receiving a reset link via email.
- **JWT Tokens**: Authentication is handled via JSON Web Tokens (JWT) for session management.
- **Prisma ORM**: Prisma is used to manage database interactions with PostgreSQL.

## Technologies & Tools

- **Next.js**: A React framework for building web applications with server-side rendering and static site generation.
- **NextAuth.js**: Authentication for Next.js applications with various providers (Google, Email).
- **Prisma**: ORM (Object-Relational Mapping) tool for database management.
- **PostgreSQL**: Relational database used to store user data.
- **Flowbite**: A UI kit for building web interfaces with Tailwind CSS.
- **React Hook Form**: A form library for handling form submissions with ease.
- **Toastify**: A library for displaying toast notifications.
- **NodeMailer**: For sending password reset emails.

## Setup & Installation

Follow these steps to get your local copy of the project up and running.

### 1. Install dependencies
    - ** Navigate to the project directory and run:
```bash
cd User-auth-Project
npm install
```

3. Set up environment variables
Create a .env.local file at the root of the project and configure the following environment variables:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SENDGRID_API_KEY=your-sendgrid-api-key

```
Replace your-secret-key with a randomly generated secret key for JWT.
Replace your-google-client-id and your-google-client-secret with credentials from your Google Developer Console.
Replace your-sendgrid-api-key with your SendGrid API key for sending password reset emails.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## How It Works
1. User Registration & Login
Users can register with their email and password, or they can log in using their Google account. When logging in with email/password, the system uses JWT tokens to manage sessions.

2. Password Reset
If a user forgets their password, they can request a password reset link. The system generates a token and sends it to the user's email. Clicking the link allows the user to set a new password.

3. Google Authentication
Google authentication is handled using NextAuth.js, which simplifies the integration of third-party authentication providers.

4. Prisma ORM
Prisma is used to interact with the PostgreSQL database. The schema is defined in the /prisma/schema.prisma file, and migrations are handled with Prisma's CLI.
Testing the Application
You can run the tests (if any) using the following command:

```bash
npm run test

```

Contribution
If you want to contribute to the project, feel free to fork the repository, make your changes, and submit a pull request.



