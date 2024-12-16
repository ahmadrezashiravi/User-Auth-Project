'use client';

import { useForm } from 'react-hook-form'; // React Hook Form for managing form state and validation
import { useState } from 'react';
import { signIn } from "next-auth/react"; // NextAuth for authentication
import { useRouter } from "next/navigation"; // Next.js router for navigation

import axios from 'axios'; // Axios for HTTP requests (not used in this component but imported)
import { Alert, Dropdown, DarkThemeToggle, Flowbite } from "flowbite-react";
import { Button, Checkbox, Label, TextInput, Select, HelperText } from "flowbite-react";
import { toast } from "react-toastify"; // Toast for displaying notifications
import { handleToast } from "@/utils/toastHandler"; // Custom toast handler utility

// Type definition for form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

function Login(): JSX.Element {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormInputs>(); // Adding type support for form inputs
  const [errorMessage, setErrorMessage] = useState<string>(''); // State to store error messages

  /**
   * Handles form submission for user login
   * @param data - Form data containing email and password
   */
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // Attempt to sign in using NextAuth credentials provider
      const response = await signIn('credentials', {
        redirect: false, // Prevent automatic redirection after sign-in
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });

      if (response && response.ok) {
        handleToast({ status: 200, message: "Logged in successfully!" });
        reset(); // Reset form fields on successful login
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        // Handle failed login attempts with appropriate error messages
        setErrorMessage(response?.error || "Invalid credentials. Please try again.");
        toast.error(response?.error || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unexpected error occurred. Please try again later.");
    }
  };

  /**
   * Handles Google OAuth login
   */
  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/dashboard" }); // Redirect to dashboard after Google sign-in
  };

  return (
    <div className="mt-12 flex flex-col items-center">
      <h1 className="text-2xl xl:text-3xl font-extrabold">
        Login
      </h1>
      <div className="w-full flex-1 mt-8">
        <div className="flex flex-col items-center">
          {/* Google Sign-In Button */}
          <button onClick={handleGoogleSignUp}
            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
            <div className="bg-white p-2 rounded-full">
              {/* Google Icon */}
              <svg className="w-4" viewBox="0 0 533.5 544.3">
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  fill="#4285f4" />
                <path
                  d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  fill="#34a853" />
                <path
                  d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  fill="#fbbc04" />
                <path
                  d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  fill="#ea4335" />
              </svg>
            </div>
            <span className="ml-4">
              Login with Google
            </span>
          </button>

          {/* GitHub Sign-In Button */}
          <button
            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
            <div className="bg-white p-1 rounded-full">
              {/* GitHub Icon */}
              <svg className="w-6" viewBox="0 0 32 32">
                <path fillRule="evenodd"
                  d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387..."
                />
              </svg>
            </div>
            <span className="ml-4">
              Login with GitHub
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="my-12 border-b text-center">
          <div
            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
            Or Login with e-mail
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto max-w-xs">
            {/* Email Input */}
            <div>
              {errors.email && (
                <Alert color="failure" className="my-2">
                  {errors.email.message}
                </Alert>
              )}
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput id="email1" type="email" placeholder="name@domain.com" required
                {...register('email', { required: "Email is required" })}
              />
            </div>

            {/* Password Input */}
            <div>
              {errors.password && (
                <Alert color="failure" className="my-2">
                  {errors.password.message}
                </Alert>
              )}
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" placeholder="Password" required shadow
                {...register('password', { required: "Password is required" })}
              />
            </div>

            {/* Submit Button */}
            <button
              className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">
                Login
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
