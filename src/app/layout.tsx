import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vision Arena Leaderboard",
  description: "Leaderboard for Vision Arena",
  // SEO 최적화
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Open Graph 및 기타 메타 태그
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://4201c4d6.vision-arena.pages.dev',
    siteName: 'Vision Arena',
  },
  // Google AdSense 확인 메타 태그
  other: {
    'google-adsense-account': 'ca-pub-9356840362376703',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ 
        margin: 0,
        padding: 0,
        backgroundColor: '#ffffff',
        overflow: 'hidden', // body 스크롤 비활성화
      }}>
        {/* Google AdSense 스크립트 */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-9356840362376703",
                enable_page_level_ads: true
              });
            `,
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9356840362376703"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Sidebar />
        <Header />
        <main style={{ 
          position: 'fixed',
          top: '40px',
          left: '260px',
          right: 0,
          bottom: 0,
          padding: '2rem',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}
