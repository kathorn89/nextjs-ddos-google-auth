"use client";

import { LogoutOutlined, RocketOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function Header() {
  return (
    <header className="z-1000">
      <nav className="fixed top-0 items-center justify-around w-screen px-6 py-4 overflow-x-hidden bg-white z-1000 lg:flex-wrap lg:justify-start">
        <div className="flex">
          <Link href="/">
            <div className="flex space-x-1">
              <RocketOutlined style={{ color: "#E64A51" }} />
              <h1 className={`text-xl font-semibold text-navy`}>
                DDOS Simulation
              </h1>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
