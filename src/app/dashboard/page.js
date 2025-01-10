"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "@/components/Header";
import DashboardCanvas from "@/components/DashboardCanvas";

export default function Page() {
  const { data: session, status } = useSession();
  if (status === "loading") return <h1> loading... please wait</h1>;

  if (status === "authenticated") {
    return (
      <>
        <main className="flex px-0 ">
          <div className="overflow-x-hidden">
            <Header
              name={session.user.email}
              img={session.user.image}
              logout={() => signOut()}
            />
          </div>

          <div className="px-6 -z-999">
            <DashboardCanvas />
          </div>
        </main>
      </>
    );
  }
}
