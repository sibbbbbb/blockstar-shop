import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helveticaLTStd = localFont({
  src: "./../public/fonts/Helvetica LT Std Fractions.otf",
  variable: "--font-helvetica-lt-std",
  weight: "400 700",
});

export const metadata: Metadata = {
  title: "Blockstar",
  description: "Blockstar Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaLTStd.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
