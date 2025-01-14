import { getServerSession } from "next-auth";
import Header from "@/components/Header";
import DashboardCanvas from "@/components/DashboardCanvas";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }
  return (
    <>
      <main className="flex px-0 ">
        <div className="overflow-x-hidden">
          <Header name={session.user.email} img={session.user.image} />
        </div>

        <div className="px-6 -z-999">
          <DashboardCanvas />
        </div>
      </main>
    </>
  );
}
