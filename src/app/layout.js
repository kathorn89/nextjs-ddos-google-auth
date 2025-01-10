"use client";

import { Inter } from "next/font/google";
import { Figtree } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const figtree = Figtree({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
