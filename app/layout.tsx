import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rishabh Pandey - Portfolio",
  description: "Product Designer & Developer",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Rishabh Pandey - Portfolio",
    description: "Product Designer & Developer",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Rishabh Pandey - Product Designer & Developer",
      },
    ],
    type: "website",
    siteName: "Rishabh Pandey Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Pandey - Portfolio",
    description: "Product Designer & Developer",
    images: ["/og-preview.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  )
}
