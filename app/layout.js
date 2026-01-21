
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { QueryClientProviderWrapper } from "./QueryClientProvider";
import RouteChangeLoader from "@/component/RouteChangeLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/justbuytravel_next/demo';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Just Buy Travel: Trusted Reviews, Travel Deals & Destination Ideas",
    template: "%s | Just Buy Travel"
  },
  description: "Travel made easy with Just Buy Travel. Explore honest reviews, best hotel offers, tours, attractions & dining deals—all in one place. Find the best travel deals and book your perfect vacation.",
  keywords: [
    "travel deals",
    "hotel reviews",
    "travel booking",
    "vacation packages",
    "destination guides",
    "travel tips",
    "hotel comparison",
    "travel offers",
    "cheap flights",
    "travel destinations"
  ],
  authors: [{ name: "Just Buy Travel" }],
  creator: "Just Buy Travel",
  publisher: "Just Buy Travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: `/justbuytravel_next/demo/logo/cropped-Frame.png`,
    shortcut: `/justbuytravel_next/demo/logo/cropped-Frame.png`,
    apple: `/justbuytravel_next/demo/logo/cropped-Frame.png`,
  },
  manifest: `${basePath}/manifest.json`,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Just Buy Travel",
    title: "Just Buy Travel: Trusted Reviews, Travel Deals & Destination Ideas",
    description: "Travel made easy with Just Buy Travel. Explore honest reviews, best hotel offers, tours, attractions & dining deals—all in one place.",
    images: [
      {
        url: `/justbuytravel_next/demo/logo/cropped-Frame.png`,
        width: 1200,
        height: 630,
        alt: "Just Buy Travel - Your Trusted Travel Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Buy Travel: Trusted Reviews, Travel Deals & Destination Ideas",
    description: "Travel made easy with Just Buy Travel. Explore honest reviews, best hotel offers, tours, attractions & dining deals—all in one place.",
    images: [`/justbuytravel_next/demo/logo/cropped-Frame.png`],
    creator: "@justbuytravel",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Travel",
};

export default function RootLayout({ children }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/justbuytravel_next/demo';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Just Buy Travel",
    "url": siteUrl,
    "logo": `/justbuytravel_next/demo/logo/cropped-Frame.png`,
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
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
        <QueryClientProviderWrapper>
          <Suspense fallback={null}>
            <RouteChangeLoader />
          </Suspense>
          {children}
        </QueryClientProviderWrapper>
      </body>

    </html>
  );
}
