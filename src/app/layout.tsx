import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cultura Chile | NewCooltura Informada",
  description: "Centros culturales, museos, bibliotecas, fondos concursables y patrimonio en Chile",
  keywords: ["cultura Chile", "museos", "bibliotecas", "fondos concursables", "patrimonio cultural"],
  openGraph: {
    title: "Cultura Chile - NewCooltura Informada",
    description: "Museos, bibliotecas y fondos culturales",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
