import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helveticaLTStd = localFont({
  src: "./../public/fonts/Helvetica LT Std Fractions.otf",
  variable: "--font-helvetica-lt-std",
  weight: "400 700",
});

const MonumentGrotesk = localFont({
  src: "./../public/fonts/ABCMonumentGroteskSemi-Mono-Medium.otf",
  variable: "--font-monument-grotesk",
  weight: "400 700",
});

export const metadata: Metadata = {
  title: "BLOCKSTAR",
  description: "BLOCKSTAR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaLTStd.variable} ${MonumentGrotesk.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
