/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://justbuytravel.com/',
        permanent: true,
      },
      {
        source: '/book-hotel',
        destination: 'https://justbuytravel.com/book-hotels-online/',
        permanent: true,
      },
      {
        source: '/book-hotel/denmark',
        destination: 'https://justbuytravel.com/hotels-in-denmark/',
        permanent: true,
      },
      {
        source: '/book-hotel/glasgow/',
        destination: 'https://justbuytravel.com/hotels-in-glasgow/',
        permanent: true,
      },
      {
        source: '/book-hotel/goa/',
        destination: 'https://justbuytravel.com/hotels-in-goa/',
        permanent: true,
      },
      {
        source: '/book-hotel/new-york',
        destination: 'https://justbuytravel.com/hotels-in-new-york/',
        permanent: true,
      },
      {
        source: '/book-hotel/ireland/',
        destination: 'https://justbuytravel.com/hotels-in-ireland/',
        permanent: true,
      },
      {
        source: '/book-hotel/manchester/',
        destination: 'https://justbuytravel.com/hotels-in-manchester/',
        permanent: true,
      },
      {
        source: '/book-hotel/paris/',
        destination: 'https://justbuytravel.com/hotels-in-paris/',
        permanent: true,
      },
      {
        source: '/book-hotel/san-francisco/',
        destination: 'https://justbuytravel.com/hotels-in-san-francisco/',
        permanent: true,
      },
      {
        source: '/book-hotel/united-kingdom/',
        destination: 'https://justbuytravel.com/hotels-in-uk/',
        permanent: true,
      },
      {
        source: '/book-flights/',
        destination: 'https://justbuytravel.com/flights/',
        permanent: true,
      },
      
    ];
  },
};

export default nextConfig;