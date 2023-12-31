import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/_index";

export const metadata: Metadata = {
  title: "ONYX",
  description: "향수 중고거래 플랫폼",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kor">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
