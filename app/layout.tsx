import type { Metadata, Viewport } from "next";
//import { Inter } from "next/font/google";
import "./globals.css";
import Container from '@/components/global/Container';
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'PnP App',
  description: 'Charakterverwaltung mit Next.js',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>
        <Navbar />
        <Container className='py-20'>{children}</Container>
        <Toaster />
        </Providers>
      </body>
    </html>
  );
}