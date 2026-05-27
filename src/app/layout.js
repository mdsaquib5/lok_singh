import React from "react";
import { outfit, jost } from "../fonts/font";
import "./layout.css";
import "./globals.css";
import "./responsive.css";

export const metadata = {
  title: "Lok_Singh | Journalist",
  description: "Portfolio of Lok_Singh Journalist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${outfit.variable} ${jost.variable} ${outfit.className}`}>
        {children}
      </body>
    </html>
  );
}