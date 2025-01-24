"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return redirect("/dashboard");
  }
  return redirect("/login");
}
