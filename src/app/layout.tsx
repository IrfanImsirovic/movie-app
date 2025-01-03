import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Providers from "./Providers"; // Ensure the import is correct
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieApp", // Fixed typo in title (was "MoiveApp")
  description: "This is the best movie app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* Metadata, title, links, etc. */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <Navbar />
          <SearchBox />
          {children}
        </Providers>
      </body>
    </html>
  );
}
