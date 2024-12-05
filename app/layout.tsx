import type { Metadata } from "next";
import {Outfit} from "next/font/google";
import "./globals.css";

const outfitFont = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genuka test todo",
  description: "Genuka test todo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfitFont.className} bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
