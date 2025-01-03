"use client";

import Link from "next/link";
import MenuItem from "./MenuItem";
import { AiFillHome, AiFillInfoCircle } from "react-icons/ai";
import DarkModeSwitch from "./DarkModeSwitch";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Header() {
  const { user } = useUser();

  return (
    <div className="flex justify-between mx-2 max-w-6xl sm:mx-auto items-center py-6">
      {/* Left section with menu items */}
      <div className="flex">
        <MenuItem title="Home" address="/" Icon={AiFillHome} />
        <MenuItem title="About" address="/about" Icon={AiFillInfoCircle} />
      </div>

      {/* Right section with dark mode switch, login, brand */}
      <div className="flex items-center space-x-5">
        <DarkModeSwitch />

        {/* If user is not logged in, show 'Login' button */}
        {!user && (
          <Link
            href="/api/auth/login"
            className="bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Login
          </Link>
        )}

        {/* If user is logged in, show the user's name or email leading to /profile */}
        {user && (
          <Link
            href="/profile"
            className="bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            {user.name || user.email}
          </Link>
        )}

        {/* Branding */}
        <Link href="/">
          <h2 className="text-2xl">
            <span className="font-bold bg-red-950 py-1 px-2 rounded-lg text-white">
              Movies
            </span>
            <span className="font-bold hidden sm:inline">App</span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
