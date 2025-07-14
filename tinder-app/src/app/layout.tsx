import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://loveswipe.app'),
  title: "LoveSwipe - Find Your Perfect Match",
  description: "Meet new people, swipe to connect, and find meaningful relationships on LoveSwipe - the modern dating app.",
  keywords: "dating, swipe, match, relationships, love, connection",
  authors: [{ name: "LoveSwipe Team" }],
  creator: "LoveSwipe",
  publisher: "LoveSwipe",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://loveswipe.app",
    title: "LoveSwipe - Find Your Perfect Match",
    description: "Meet new people, swipe to connect, and find meaningful relationships on LoveSwipe.",
    siteName: "LoveSwipe",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LoveSwipe - Dating App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LoveSwipe - Find Your Perfect Match",
    description: "Meet new people, swipe to connect, and find meaningful relationships.",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ec4899" },
    { media: "(prefers-color-scheme: dark)", color: "#ec4899" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LoveSwipe" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900 overflow-hidden`}>
        <div id="app-container" className="h-screen w-full relative">
          {children}
        </div>
      </body>
    </html>
  );
}
