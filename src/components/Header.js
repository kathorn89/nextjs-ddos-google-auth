"use client";

import { signOut, useSession } from "next-auth/react";
import { DownOutlined, RocketOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import userImg from "@/assets/userImg.svg";
import "@ant-design/v5-patch-for-react-19";
import { Dropdown, Menu, Avatar, Space, Badge } from "antd";

export default function Header() {
  // Access session data
  const { data: session } = useSession();

  // Extract user data from the session
  const name = session?.user?.name || "Guest";
  const img = session?.user?.image || null;

  return (
    <header className="z-99">
      <nav className="fixed top-0 justify-between w-screen pl-6 sm:pr-[10vw]  md:pr-[7vw] py-3 overflow-x-hidden bg-white z-1000 lg:flex-wrap lg:justify-start">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex space-x-1">
              <RocketOutlined style={{ color: "#E64A51" }} />
              <h1 className={`text-xl font-semibold text-navy`}>
                DDOS Simulation
              </h1>
            </div>
          </Link>
          <div className="flex flex-row items-center gap-2">
            {/* <Image
              src={userImg}
              width={36}
              height={36}
              id="Avatar user"
              className="rounded-full aspect-square object-cover"
            /> */}
            <Avatar size={36} src={img} />

            <div className="flex flex-col">
              <h3 className="text-navy font-semibold text-sm">{name}</h3>
              <p
                onClick={() => signOut()}
                className="text-xs text-gray-500 cursor-pointer hover:text-red"
              >
                Sign out
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
