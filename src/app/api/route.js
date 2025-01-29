import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (session && session.accessToken) {
      return res.status(200).send("Authenticated");
    }

    return res.status(401).send("Unauthorized");
  } catch (error) {
    console.error("Validation error:", error);
    return res.status(500).send("Internal Server Error");
  }
}
