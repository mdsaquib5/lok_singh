import React from "react";
import { outfit, montserrat } from "../fonts/font";
import "./globals.css";
import "./layout.css";
import "./responsive.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Lok_Singh | Journalist",
  description: "Portfolio of Lok_Singh Journalist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${outfit.variable} ${montserrat.variable} ${outfit.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}