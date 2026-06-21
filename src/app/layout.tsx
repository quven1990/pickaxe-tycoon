import type { Metadata } from 'next';
import { getGameConfig } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleAdSense from '@/components/GoogleAdSense';
import PlausibleAnalytics from '@/components/PlausibleAnalytics';
import MicrosoftClarity from '@/components/MicrosoftClarity';
import './globals.css';

const config = getGameConfig();

export const metadata: Metadata = {
  title: {
    default: config.seo.siteTitle,
    template: `%s | Pickaxe Tycoon Guide`,
  },
  description: config.seo.siteDescription,
  keywords: [...config.seo.primaryKeywords, ...config.seo.secondaryKeywords],
  alternates: {
    canonical: `${config.seo.baseUrl}/`,
  },
  openGraph: {
    title: config.seo.siteTitle,
    description: config.seo.siteDescription,
    url: `${config.seo.baseUrl}/`,
    siteName: config.game.name,
    locale: 'en_US',
    images: [{
      url: `${config.seo.baseUrl}/og-default.jpg`,
      width: 1200,
      height: 630,
      alt: config.seo.siteTitle,
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: config.seo.siteTitle,
    description: config.seo.siteDescription,
    images: [`${config.seo.baseUrl}/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
      </head>
      <body className="min-h-screen font-sans">
        <Header />
        <main className="min-h-[calc(100vh-180px)]">{children}</main>
        <Footer />
        <GoogleAdSense />
        <GoogleAnalytics />
        <PlausibleAnalytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
