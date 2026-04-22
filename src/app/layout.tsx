import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import AdSense from "@/components/AdSense";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { NewsletterProvider } from "@/context/NewsletterContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ethicalcrypto.com"),
  title: "Ethical Crypto: Decentralized Intelligence & Wealthspan Optimization",
  description: "Master the digital frontier with data-driven crypto insights. Expert analysis on DeFi, protocol engineering, and cold storage security for the next cycle.",
  openGraph: {
    title: "Ethical Crypto: Decentralized Intelligence & Wealthspan Optimization",
    description: "Master the digital frontier with data-driven crypto insights. Expert analysis on DeFi, protocol engineering, and cold storage security for the next cycle.",
    url: "https://ethicalcrypto.com",
    siteName: "Ethical Crypto",
    images: [
      {
        url: "/images/ethical-crypto.png",
        width: 1200,
        height: 1200,
        alt: "Ethical Crypto Protocol Operations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethical Crypto: Decentralized Intelligence & Wealthspan Optimization",
    description: "Master the digital frontier with data-driven crypto insights. Expert analysis on DeFi and protocol engineering.",
    site: "@ethicalcrypto",
    creator: "@ethicalcrypto",
    images: ["/images/ethical-crypto.png"],
  },
  icons: {
    icon: [
      { url: "/brand-icon.png", sizes: "48x48", type: "image/png" },
      { url: "/brand-icon.png", sizes: "96x96", type: "image/png" },
      { url: "/brand-icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/brand-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  applicationName: "Ethical Crypto",
  appleWebApp: {
    title: "Ethical Crypto",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  keywords: ["Crypto", "Ethical Crypto", "DeFi", "Blockchain", "Staking", "Protocol Engineering", "Cold Storage", "Wealthspan"],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ethical Crypto',
              alternateName: 'EthicalCrypto',
              legalName: 'Ethical Crypto',
              url: 'https://ethicalcrypto.com',
              logo: 'https://ethicalcrypto.com/brand/logo.png',
              about: {
                '@type': 'Thing',
                name: 'Cryptocurrency',
                description: 'The practice of utilizing decentralized technologies and protocols to optimize financial autonomy and digital security.'
              },
              sameAs: [
                'https://x.com/ethicalcrypto',
                'https://www.linkedin.com/company/ethicalcrypto/'
              ]
            })
          }}
        />

      </head>
      <body className="font-sans min-h-full flex flex-col selection:bg-black selection:text-white">
        <NewsletterProvider>
          <Navbar />
          <main className="flex-grow pt-16 md:pt-24 lg:pt-32">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          <AdSense />
          <GoogleAnalytics gaId="G-H1BZS390ZD" />
        </NewsletterProvider>
      </body>
    </html>
  );
}
