import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import SessionProvider from "@/components/ui/sessionProvider";
import "react-toastify/dist/ReactToastify.css";
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
        <SessionProvider>
              <ToastContainer
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick
              ></ToastContainer>
              {children}
        </SessionProvider>
      </body>
    </html>
  );
}
