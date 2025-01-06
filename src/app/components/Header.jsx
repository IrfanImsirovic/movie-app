"use client";

import Link from "next/link";
import MenuItem from "./MenuItem";
import { AiFillHome, AiFillInfoCircle } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Header() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setUser(data?.session?.user || null);
      }
    }

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null); // Update the user state based on session
      }
    );

    getSession();

    return () => {
      subscription?.unsubscribe(); // Cleanup subscription on unmount
    };
  }, []);

  return (
    <div className="flex justify-between mx-2 max-w-6xl sm:mx-auto items-center py-6">
      {/* Left section with menu items */}
      <div className="flex">
        <MenuItem title="Home" address="/" Icon={AiFillHome} />
        <MenuItem title="About" address="/about" Icon={AiFillInfoCircle} />
        <MenuItem
          title={user ? user.email : "Login"}
          const
          address="/login"
          Icon={FaUser}
        />
      </div>

      {/* Right section with dark mode switch and branding */}
      <div className="flex items-center space-x-5">
        <DarkModeSwitch />

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
