import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Poppins } from "next/font/google";
import { wedding } from "@/data/wedding";
import { formatDate } from "@/lib/format";
import "lenis/dist/lenis.css";
import "./globals.css";

const script = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const sans = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

const title = `The Wedding of ${wedding.groom.nickname} & ${wedding.bride.nickname}`;
const description = `Undangan pernikahan ${wedding.groom.nickname} & ${wedding.bride.nickname} — ${formatDate(wedding.events[0].start)}`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [wedding.coverPhoto],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${script.variable} ${serif.variable} ${sans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
