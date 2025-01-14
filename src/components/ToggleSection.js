"use client";

import { useState } from "react";
import { DownOutlined, SyncOutlined } from "@ant-design/icons";

export default function ToggleSection({ title, children }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex flex-row items-center justify-between px-2">
        <div className="flex flex-row items-center gap-1 justify-items-center">
          <h1 className="text-2xl font-bold text-navy">{title}</h1>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="mt-1 text-md"
          >
            {isVisible ? <DownOutlined /> : <DownOutlined />}
          </button>
        </div>

        <SyncOutlined style={{ fontSize: "16px", color: "#E64A51" }} spin />
      </div>

      {isVisible && <div className="flex flex-col gap-3 px-2">{children}</div>}
    </div>
  );
}
