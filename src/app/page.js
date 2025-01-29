import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/dashboard");
  }
  return redirect("/login");
}
