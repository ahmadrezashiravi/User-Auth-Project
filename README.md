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

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/User-auth-Project.git

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
