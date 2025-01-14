"use client";

import { NextAuthProvider } from "../Providers";
import Navbar from "@/components/SideNav";
import Header from "@/components/Header";

export default function Layout({ children }) {
  return (
    <NextAuthProvider>
      <div className="relative flex -z-1">
        <Navbar />
        <Header />
        <div className="w-full overflow-x-auto">
          <div className="h-calc(-48px + 100vh) overflow-auto ">
            <div className="relative flex justify-center w-full h-full mx-auto overflow-x-hidden overflow-y-scroll">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </NextAuthProvider>
  );
}
