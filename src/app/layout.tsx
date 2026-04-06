import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ReduxStoreProvider from "@/store/storeProvider";
import AuthWrapper from "@/components/auth/authWrapper";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coders Forum",
  description: "A community for developers to share knowledge and connect",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-slate-100 antialiased`}
      >
        <ReduxStoreProvider>
          <AuthWrapper>
            <Navbar />
            {children}
          </AuthWrapper>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
