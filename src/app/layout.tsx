import type { Metadata } from "next";
import "./globals.css";
import MainHeaderComponent from "@/components/Header/MainHeader/Header";
import FooterComponent from "@/components/Footer/Footer";

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
        <FooterComponent />
      </body>
    </html>
  );
}
