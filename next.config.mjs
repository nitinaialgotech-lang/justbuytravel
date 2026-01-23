/** @type {import('next').NextConfig} */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NODE_ENV === "production" ? "/justbuytravel_next/demo" : "");

const nextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async rewrites() {
    if (basePath) {
      return [];
    }
    return [
      {
        source: "/justbuytravel_next/demo/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
