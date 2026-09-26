import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nnavber from "./components/shear/Nnavber";
import Footer from "./components/shear/Footer";
import EsxProvaider from "@/context/ExsContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0e14] text-white">
        <EsxProvaider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#181e29",
                color: "#ffffff",
                border: "1px solid #2d3748",
              },
            }}
          />
          <Nnavber />
          <main className="flex-grow">{children}</main>
          <Footer />
        </EsxProvaider>
      </body>
    </html>
  );
}