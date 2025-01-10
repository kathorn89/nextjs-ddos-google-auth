"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "antd/lib/form/Form";
import "./globals.css";

export default async function Page() {
  const [form] = useForm();

  const { data: session, status } = useSession();
  if (status === "loading") return <h1> loading... please wait</h1>;

  if (status === "authenticated") {
    return (
      <div className="flex flex-col justify-items-center items-center ">
        Sign in as {session.user.email}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
}