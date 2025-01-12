"use client";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import "./globals.css";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/dashboard");
  }
  return redirect("/login");
}
