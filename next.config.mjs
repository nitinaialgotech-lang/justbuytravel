/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensures static assets (images, favicon, etc.) are served from the correct path when deployed to a subpath
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
