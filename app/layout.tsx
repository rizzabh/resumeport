import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rishabh Pandey - Product Designer & Developer",
  description:
    "Design Engineer crafting intuitive, scalable digital experiences at the intersection of design and code.",
  keywords: ["Product Designer", "Developer", "UX Designer", "Frontend Developer", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Rishabh Pandey" }],
  creator: "Rishabh Pandey",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rizzabh.dev",
    title: "Rishabh Pandey - Product Designer & Developer",
    description:
      "Design Engineer crafting intuitive, scalable digital experiences at the intersection of design and code.",
    siteName: "Rishabh Pandey Portfolio",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Rishabh Pandey - Product Designer & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Pandey - Product Designer & Developer",
    description:
      "Design Engineer crafting intuitive, scalable digital experiences at the intersection of design and code.",
    images: ["/og-preview.png"],
    creator: "@rizz_abh",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={jetBrainsMono.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
