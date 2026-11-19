/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/models/:path*.usdz",
        headers: [
          { key: "Content-Type", value: "model/vnd.usdz+zip" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
      {
        source: "/models/:path*.reality",
        headers: [
          { key: "Content-Type", value: "model/vnd.reality" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
