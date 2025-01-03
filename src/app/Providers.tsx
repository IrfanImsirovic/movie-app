"use client";

import { ThemeProvider } from "next-themes";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        <div className="dark:text-gray-100 text-gray-950 transition-colors duration-300 min-h select-none">
          {children}
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}
