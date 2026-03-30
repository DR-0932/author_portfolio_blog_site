import type { Metadata } from "next";
import { Poppins, Roboto_Mono, Great_Vibes, Caveat, Playwrite_IE, Fjalla_One } from "next/font/google";
import ClientRoot from "@/component/layout/ClientRoot";
import "./globals.css";
import React from "react";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const playwriteIE = Playwrite_IE({
  variable: "--font-playwrite",
  weight: ["100", "200", "300", "400"],
});

const fjallaOne = Fjalla_One({
  variable: "--font-fjalla",
  weight: "400",
  subsets: ["latin"],
});

const BASE_URL = "https://author-portfolio-blog-site.vercel.app";
const OG_IMAGE = `${BASE_URL}/image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Palak Agarwal | Writer, Ghostwriter & Editor",
    template: "%s | Palak Agarwal",
  },
  description:
    "Palak Agarwal is a freelance writer, ghostwriter, and editor with 3+ years of experience across long-form content, book editing, fiction, and brand voice. 200k+ words written, 50+ projects delivered.",
  keywords: [
    "Palak Agarwal",
    "ghostwriter",
    "freelance writer",
    "book editor",
    "content writer",
    "long-form content",
    "fiction writer",
    "brand voice",
    "content strategy",
  ],
  authors: [{ name: "Palak Agarwal", url: BASE_URL }],
  creator: "Palak Agarwal",
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Palak Agarwal",
    title: "Palak Agarwal | Writer, Ghostwriter & Editor",
    description:
      "Freelance writer and editor specialising in ghostwriting, book editing, long-form content, and brand voice.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Palak Agarwal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palak Agarwal | Writer, Ghostwriter & Editor",
    description:
      "Freelance writer and editor specialising in ghostwriting, book editing, long-form content, and brand voice.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Palak Agarwal",
    url: BASE_URL,
    image: OG_IMAGE,
    jobTitle: "Writer, Ghostwriter & Editor",
    description:
      "Freelance writer and editor specialising in ghostwriting, book editing, long-form content, and brand voice.",
    knowsAbout: [
      "Ghostwriting",
      "Book Editing",
      "Content Writing",
      "Fiction",
      "Long-Form Content",
      "Brand Voice",
      "Content Strategy",
    ],
    offers: {
      "@type": "Offer",
      itemOffered: [
        { "@type": "Service", name: "Ghostwriting" },
        { "@type": "Service", name: "Book Editing" },
        { "@type": "Service", name: "Content Writing" },
      ],
    },
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${robotoMono.variable} ${greatVibes.variable} ${caveat.variable} ${playwriteIE.variable} ${fjallaOne.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
