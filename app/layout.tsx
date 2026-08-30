import type {Metadata} from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://finova-calc.com'),
  title: {
    default: 'FinovaCalc | Free Financial Calculators',
    template: '%s | FinovaCalc',
  },
  description:
    'Free, fast, and accurate financial calculators for loans, mortgages, investing, savings, and retirement. Get instant results with clear breakdowns.',
  applicationName: 'FinovaCalc',
  keywords: [
    'financial calculator',
    'loan calculator',
    'mortgage calculator',
    'EMI calculator',
    'compound interest calculator',
    'investment calculator',
    'retirement calculator',
    'savings calculator',
    'personal finance tools',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'FinovaCalc',
    title: 'FinovaCalc | Free Financial Calculators',
    description:
      'Free, fast, and accurate financial calculators for loans, mortgages, investing, savings, and retirement.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinovaCalc | Free Financial Calculators',
    description:
      'Free, fast, and accurate financial calculators for loans, mortgages, investing, savings, and retirement.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finova-calc.com';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FinovaCalc',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/calculators?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://plain-eeur-prod-public.komododecks.com" />
        <meta
          name="google-site-verification"
          content="_m6Op80n1HgSPGyTcSme49yFpT4TFIi45SwKtnnFwUU"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F2L2W4WEZT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-F2L2W4WEZT');`}
        </Script>
      </head>
      <body className="font-sans antialiased text-slate-800 bg-slate-50 min-h-screen flex flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
