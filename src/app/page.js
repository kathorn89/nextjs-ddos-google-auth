"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import "./globals.css";

export const metadata = {
  title: "Dashboard",
  description: "DDos Dashboard by Playtorium",
};

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return redirect("/dashboard");
  }
  return redirect("/login");
}
