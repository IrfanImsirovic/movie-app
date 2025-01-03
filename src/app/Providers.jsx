"use client";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <div>
      <ThemeProvider enableSystem={true} attribute="class">
        <div className=" dark:text-gray-100  text-gray-950 transition-colors duration-300 min-h select-none">
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
}
