import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeaderComponent from "@/components/Header/MainHeader/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Complete Next.js Tour",
  description: "Uma implementação das principais ferramentas e funcionalidades do Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        
        <MainHeaderComponent />
        {children}
      </body>
    </html>
  );
}
