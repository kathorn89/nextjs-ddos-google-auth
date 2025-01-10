"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Page() {
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

  return (
    <div className="flex flex-col justify-items-center items-center ">
      <p className="mt-4">Not Signed in</p> <br />
      <button
        className="border-2  px-8 py-2 rounded-3xl"
        onClick={() => signIn("google")}
      >
        Sign in with google
      </button>
    </div>
  );
}
