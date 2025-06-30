"use client"

import { CartProvider } from "@/app/context/CartContext";
import { ModalProvider } from "@/app/context/ModalContext";
import Modal from "@/components/ui/Modal";
import Cart from "@/components/ui/Cart";
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

// export const metadata: Metadata = {
//   title: "BLOCKSTAR",
//   description: "BLOCKSTAR",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>BLOCKSTAR</title>
        <meta name="description" content="BLOCKSTAR" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${helveticaLTStd.variable} ${MonumentGrotesk.variable} antialiased bg-black text-white`}
      >
        <ModalProvider>
          <CartProvider>
            <Modal />
            <Cart />
            {children}
          </CartProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
