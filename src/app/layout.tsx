import type { Metadata, Viewport } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://warungcoding.tv';
const siteName = 'Warung Coding TV';
const siteDescription =
  'Undangan pernikahan digital yang indah, personal, dan mudah dibagikan. Pilih dari 50+ desain eksklusif, kirim ke tamu via WhatsApp, dan pantau RSVP secara real-time.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Undangan Digital Pernikahan Premium`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'undangan pernikahan digital',
    'undangan online',
    'undangan nikah online',
    'undangan digital premium',
    'RSVP online',
    'WhatsApp blast undangan',
  ],
  authors: [{ name: siteName }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName,
    title: `${siteName} — Undangan Digital Pernikahan Premium`,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Undangan Digital Pernikahan Premium`,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d1b2a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
