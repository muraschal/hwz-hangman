import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HWZ Hangman | Executive MBA Edition",
  description: "Ein modernes Hangman-Spiel mit Glassmorphism-Design, speziell entwickelt für den Executive MBA der HWZ. Errate die Business-Buzzwords und verbessere dein EMBA-Vokabular!",
  keywords: ["HWZ", "Hangman", "Executive MBA", "Business Game", "Buzzwords", "Glassmorphism", "EMBA", "Hochschule für Wirtschaft Zürich"],
  authors: [{ name: "Marcel Rapold" }],
  creator: "Marcel Rapold",
  publisher: "HWZ - Hochschule für Wirtschaft Zürich",
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://hwz-hangman.vercel.app",
    title: "HWZ Hangman | Executive MBA Edition",
    description: "Errate die EMBA-Buzzwords im modernen Glassmorphism-Design",
    siteName: "HWZ Hangman",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "HWZ Hangman Game Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HWZ Hangman | Executive MBA Edition",
    description: "Errate die EMBA-Buzzwords im modernen Glassmorphism-Design",
    images: ["/og-image.svg"]
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" }
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
