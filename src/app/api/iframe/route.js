import { NextResponse } from "next/server";
import { decryptURL } from "@/lib/encryption";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const iframeURL = decryptURL(token);

    // Validate allowed domains
    const allowedDomains = [
      "3c16t1t8l22k0u8p15b17k0z21p19h22l3t16k22u8p15t27.com",
      "localhost",
    ];
    const parsedURL = new URL(iframeURL);

    if (!allowedDomains.includes(parsedURL.hostname)) {
      return NextResponse.json({ error: "Unauthorized URL" }, { status: 403 });
    }

    return NextResponse.redirect(iframeURL);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 500 }
    );
  }
}
