"use client";

import { Inter } from "next/font/google";
import { Figtree } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const figtree = Figtree({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <div className="relative flex -z-1">
          <SideNav />

          <Header />
          <div className="w-full overflow-x-auto">
            <div className="h-calc(-48px + 100vh) overflow-auto ">
              <div className="relative flex justify-center w-full h-full mx-auto overflow-x-hidden overflow-y-scroll">
                <div className="w-full">
                  <SessionProvider>{children}</SessionProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
