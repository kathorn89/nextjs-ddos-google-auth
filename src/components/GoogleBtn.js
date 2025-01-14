"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "antd";
import logoGoogle from "@/assets/logoGoogle.png";
import Image from "next/image";
import { Figtree } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"] });

export default function GoogleBtn() {
  return (
    <Button
      type="default"
      shape="round"
      onClick={() => signIn("google")}
      className="w-80 h-10 border-grey"
    >
      <Image src={logoGoogle} alt="Google logo" width={20} height={20} />
      <div className={figtree.className}>
        <h3 className="text-base">Sign in with google</h3>
      </div>
    </Button>
  );
}
