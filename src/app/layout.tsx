import type { Metadata } from "next";
import {  Archivo_Black  } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'


const archivo_black = Archivo_Black({
  subsets: ["latin"],
  weight: "400"
});
const gallery_modern = localFont({
  src: "./fonts/gallerymodern-webfont.ttf",
  variable:"--gallery-modern",
});

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Mélange",
    template: "%s | Mélange",
  },
  description: "Mélange is an music app",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(archivo_black.className,gallery_modern.variable)}>{children}</body>
    </html>
  );
}
