'use client';
import React from 'react';
  // import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header/Header"; 
// import { ThemeProvider } from 'next-themes'; 
import CreateProdComponent from "@/components/CreateProdComponent/CreateProdComponent";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Bosta's App",
//   description: "Developed by Eman Ouda",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <ThemeProvider> */}
          <Header />
          {/* <CreateProdComponent /> */}

          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
