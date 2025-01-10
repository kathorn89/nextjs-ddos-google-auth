"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "antd";
import logoGoogle from "@/assets/logoGoogle.png";
import Image from "next/image";
import { Text } from "./Text";

export default function GoogleBtn() {
  return (
    <Button
      type="default"
      shape="round"
      onClick={() => signIn("google")}
      className="w-80 h-10 border-grey"
    >
      <Image src={logoGoogle} alt="Google logo" width={20} height={20} />
      <Text button sub2 className="text-grey">
        Sign in with google
      </Text>
    </Button>
  );
}
