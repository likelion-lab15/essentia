import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/_index";
import RQProvider from "../components/RQProvider";

export const metadata: Metadata = {
  title: "Essentia",
  description: "향수 중고거래 플랫폼",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kor">
      <body>
        <RQProvider>
          <Header />
          {children}
          <div id="portal"></div>
          <Footer />
        </RQProvider>
      </body>
    </html>
  );
}
