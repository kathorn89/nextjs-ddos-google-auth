/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://3c16t1t8l22k0u8p15b17k0z21p19h22l3t16k22u8p15t27.com:3777;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
