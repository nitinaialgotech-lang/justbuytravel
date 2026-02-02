
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { QueryClientProviderWrapper } from "./QueryClientProvider";
import RouteChangeLoader from "@/component/RouteChangeLoader";
import ReduxProvider from "./ReduxProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com';



export default function RootLayout({ children }) {
  const layoutBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Just Buy Travel",
    "url": siteUrl,
    "logo": `${layoutBasePath}/logo/Fav.webp`,
    "description": "Travel made easy with Just Buy Travel. Explore honest reviews, best hotel offers, tours, attractions & dining deals—all in one place.",
    "sameAs": [
      // Add your social media links here
      // "https://www.facebook.com/justbuytravel",
      // "https://www.twitter.com/justbuytravel",
      // "https://www.instagram.com/justbuytravel"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": "English"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Just Buy Travel",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ReduxProvider>
          {children}
        </ReduxProvider>

      </body>

    </html>
  );
}
