import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'TradePro 360 – AI-Powered Smart Booking & Dispatch Platform for UK Tradesmen',
  description:
    'Enterprise SaaS platform for UK trade businesses. Features AI engineer dispatching, Google Business Profile integration, live GPS tracking, PDF invoices, and Stripe payments.',
  keywords: 'UK Tradesmen, AI Dispatch, Smart Booking, Plumbing SaaS, Electrician Software, Live GPS Tracking',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className={`${jakarta.className} antialiased min-h-screen selection:bg-sky-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
