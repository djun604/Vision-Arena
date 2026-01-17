import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vision Arena Leaderboard",
  description: "Leaderboard for Vision Arena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundColor: '#ffffff',
      }}>
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          <Sidebar />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
            <Header />
            <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
