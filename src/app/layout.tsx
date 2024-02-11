import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/_index";
import RQProvider from "../components/RQProvider";
import { NextAuthProvider } from "@/contexts/_index";

export const metadata: Metadata = {
  title: "Essentia",
  description: "향수 중고거래 플랫폼",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kor">
      <body>
        <NextAuthProvider>
          <RQProvider>
            <Header />
            {children}
            <div id="portal"></div>
            <Footer />
          </RQProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
