import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alpinistas.io",
  description: "Aspinistas cybersegurança",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
