"use client";

import { DownOutlined, RocketOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import userImg from "@/assets/userImg.svg";
import { Dropdown, Menu, Avatar, Space, Badge } from "antd";

import { Text } from "./Text";

export default function Header({ name, img, logout }) {
  return (
    <header className="z-99">
      <nav className="fixed top-0 justify-between w-[96vw] pl-6 pr-10 py-3 overflow-x-hidden bg-white z-1000 lg:flex-wrap lg:justify-start">
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
              <Text sub3 className="text-navy">
                {name}
              </Text>
              <Text small12 onClick={logout}>
                Sign out
              </Text>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
