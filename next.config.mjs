/** @type {import('next').NextConfig} */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH || "/justbuytravel_next/demo";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: '/justbuytravel_next/demo',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
