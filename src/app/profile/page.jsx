"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function ProfilePage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-800 dark:text-gray-200">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400">Error: {error.message}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-800 dark:text-gray-200">
          You need to{" "}
          <Link href="/api/auth/login" className="text-blue-500 underline">
            login
          </Link>{" "}
          to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        {user.picture && (
          <div className="flex justify-center">
            <img
              src={user.picture}
              alt={"No Picture"}
              className="rounded-full w-24 h-24 mb-4"
            />
          </div>
        )}

        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
          Hello{user.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Welcome to your profile page.
        </p>

        {/* Display only the user name and email in a formatted code block style */}
        <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md text-sm text-gray-800 dark:text-gray-100 overflow-auto">
          {`Username: ${user.name}
Email: ${user.email}`}
        </pre>

        <div className="flex justify-center mt-6">
          <Link
            href="/api/auth/logout"
            className="inline-block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
