"use client";
import { MdLightMode } from "react-icons/md";
import { BsFillMoonFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures that the component only renders on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // If it's not mounted yet, render nothing to avoid hydration mismatch
  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {mounted &&
        (currentTheme === "dark" ? (
          <MdLightMode
            className="text-xl cursor-pointer hover:text-red-950"
            onClick={() => setTheme("light")}
          />
        ) : (
          <BsFillMoonFill
            className="text-xl cursor-pointer hover:text-red-950"
            onClick={() => setTheme("dark")}
          />
        ))}
    </>
  );
}
