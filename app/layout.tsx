import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "Aladgold Dynamic Company Limited - Engineering, Construction & Infrastructure",
    template: "%s | Aladgold Dynamic",
  },
  description:
    "Leading Nigerian engineering and construction firm. Delivering integrated engineering, construction, solar energy, water resources, electrical systems and procurement solutions for government, corporate and development partners since 2017.",
  keywords: [
    "engineering",
    "construction",
    "infrastructure",
    "solar energy",
    "borehole drilling",
    "road construction",
    "electrical installation",
    "Nigeria",
    "Abuja",
    "Aladgold Dynamic Company Limited",
    "civil engineering",
    "renewable energy",
    "water resources",
    "government contractor",
    "procurement",
  ],
  authors: [{ name: "Aladgold Dynamic Company Limited", url: "https://aladgolddynamic.com.ng" }],
  creator: "Aladgold Dynamic Company Limited",
  publisher: "Aladgold Dynamic Company Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://aladgolddynamic.com.ng",
    siteName: "Aladgold Dynamic Company Limited",
    title: "Aladgold Dynamic Company Limited - Engineering & Construction Excellence",
    description:
      "Leading Nigerian engineering and construction firm. Delivering integrated engineering, construction, solar energy, water resources, electrical systems and procurement solutions for government, corporate and development partners since 2017.",
    images: [
      {
        url: "/images/untitled-20design.png",
        width: 1200,
        height: 630,
        alt: "Aladgold Dynamic Company Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aladgold Dynamic Company Limited",
    description: "Leading Nigerian engineering and construction firm delivering excellence across all sectors.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-id", // Add actual ID if available
  },
  generator: "Aladgold Dynamic Systems",
  metadataBase: new URL("https://aladgolddynamic.com.ng"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/images/untitled-20design.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/untitled-20design.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/images/untitled-20design.png",
        type: "image/png",
      },
    ],
    apple: "/images/untitled-20design.png",
  },
}

import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aladgold Dynamic Company Limited",
              "url": "https://aladgolddynamic.com.ng",
              "logo": "https://aladgolddynamic.com.ng/images/aladgold-20logo.png",
              "image": "https://aladgolddynamic.com.ng/images/untitled-20design.png",
              "description": "Leading Nigerian engineering and construction firm delivering excellence across all sectors.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "No. 69 Abidja Street, Wuse Zone 3",
                "addressLocality": "Abuja",
                "addressRegion": "FCT",
                "postalCode": "900281",
                "addressCountry": "NG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 9.0612,
                "longitude": 7.4629
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+234-807-265-3178",
                "contactType": "customer service",
                "email": "info@aladgolddynamic.com.ng",
                "areaServed": "NG",
                "availableLanguage": "en"
              },
              "sameAs": [
                "https://web.facebook.com/profile.php?id=61585197586795",
                "https://x.com/aladgolddynamic",
                "https://www.instagram.com/aladgold_dynamic/",
                "https://www.linkedin.com/company/aladgolddynamic"
              ]
            })
          }}
        />
      </body>
    </html>
  )
}
