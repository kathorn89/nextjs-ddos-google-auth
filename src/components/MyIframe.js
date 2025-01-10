"use client";

import React from "react";

const MyIframe = ({ src, width = "100%", height = "100%", id }) => {
  return (
    <div className="border rounded-xl border-gray_3">
      <iframe
        src={src}
        width={width}
        height={height}
        id={id}
        loading="lazy"
        className="rounded-xl "
        seamless
      ></iframe>
    </div>
  );
};

export default MyIframe;
