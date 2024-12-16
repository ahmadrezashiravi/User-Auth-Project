import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

// Initialize PrismaClient to interact with the database
const prisma = new PrismaClient();

// Define NextAuth options with TypeScript
const authOptions: NextAuthOptions = {
  // Configure authentication providers, including Google and Credentials
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Find the user by email in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        // Verify the provided password matches the stored hashed password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Google Client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Google Client Secret from environment variables
    }),
  ],

  // Use PrismaAdapter for database integration
  adapter: PrismaAdapter(prisma),

  // Define a secret key for session encryption
  secret: process.env.NEXTAUTH_SECRET!,

  // Define callbacks to customize behavior for signIn, session, and JWT
  callbacks: {
    async signIn({ user, account }) {
      console.log("User object in signIn callback:", user); // Debugging user object

      // Only proceed for Google accounts
      if (account?.provider === "google") {
        if (!user?.email) {
          console.error("No email found in user object");
          return false;
        }

        try {
          // Check if the user already exists in the database
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            console.log("User not found, creating new user...");

            // Additional logic for user creation can be added here

            console.log("New user created");
          } else {
            console.log("User already exists:", existingUser);
          }
        } catch (error) {
          console.error("Error during sign-in process:", error);
          return false;
        }
      }

      return true; // Allow sign-in
    },

    async session({ session, user }) {
      // Extend the session object with additional user information
      session.user = {
        ...session.user,
        id: user.id,
        email: user.email,
      };
      return session;
    },

    async jwt({ token, user }) {
      // Add user-specific information to the JWT token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },

  // Define custom pages for sign-in and error handling
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error",   // Custom error page
  },
};

// Export the NextAuth handler for GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
