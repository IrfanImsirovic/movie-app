// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    // Redirect the user to Auth0's Universal Login
    router.push("/api/auth/login");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Login Card */}
      <div className="w-11/12 max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-gray-100 text-gray-950">
          Log in to Your Account
        </h1>
        <button
          onClick={handleLogin}
          className="w-full px-6 py-2 text-white bg-red-950 rounded-md hover:bg-red-800 transition-colors"
        >
          Login with Auth0
        </button>
      </div>
    </main>
  );
}
