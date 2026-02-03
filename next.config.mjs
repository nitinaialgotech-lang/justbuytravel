/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  basePath,
  // Redirect so /book-hotels-online (used in nav/footer) resolves to the hotels page
  async redirects() {
    const redirects = [
      { source: "/book-hotels-online", destination: "/hotels", permanent: true },
    ];
    return redirects;
  },
};

export default nextConfig;
