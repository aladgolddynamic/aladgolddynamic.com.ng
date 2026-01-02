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
    "engineering Nigeria",
    "Aladgold Dynamic Company Limited",
    "construction company Nigeria",
    "solar energy Nigeria",
    "borehole drilling Nigeria",
    "road construction Abuja",
    "electrical installation Nigeria",
    "government contractor Nigeria",
    "water resources",
    "infrastructure development",
  ],
  authors: [{ name: "Aladgold Dynamic Company Limited" }],
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
    siteName: "Aladgold Dynamic Company Limited",
    title: "Aladgold Dynamic Company Limited - Engineering & Construction Excellence",
    description:
      "A trusted partner in achieving business growth and sustainable development across Nigeria. Comprehensive engineering, construction, and infrastructure solutions.",
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
  generator: "Aladgold Dynamic Systems",
  metadataBase: new URL("https://aladgolddynamic.com"),
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
      </body>
    </html>
  )
}
