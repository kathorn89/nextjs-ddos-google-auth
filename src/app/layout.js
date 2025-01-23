"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import { Figtree } from "next/font/google";
import { NextAuthProvider } from "./Providers";
import Header from "@/components/Header";
import Navbar from "@/components/SideNav";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const figtree = Figtree({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <html lang="en">
      <link rel="icon" href="/icon.png" sizes="any" />
      <body className={figtree.className}>
        <NextAuthProvider>
          <div className="relative flex -z-1">
            {/* <Header /> */}
            <div className="w-full overflow-x-auto">
              <div className="h-calc(-48px + 100vh) overflow-auto ">
                {children}
              </div>
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
