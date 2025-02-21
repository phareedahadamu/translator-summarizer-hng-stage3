import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const monty = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TextAI",
  description: "AI backed text translator and summarizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Origin Trial Token for AI LanguageDetector */}
        <meta
          httpEquiv="Origin-Trial"
          content="AkhtP5xAdMPJDPlhHQpSN2EpKRUETOULCsuKULX9sZoGjBYQwUG9KGUN81wte8t9wOIytRh1bm7of1fPsI1KmQoAAACReyJvcmlnaW4iOiJodHRwczovL3BoYXJlZWRhaGFkYW11LXN1bW1hcml6ZXItdHJhbnNsYXRvci5uZXRsaWZ5LmFwcDo0NDMiLCJmZWF0dXJlIjoiTGFuZ3VhZ2VEZXRlY3Rpb25BUEkiLCJleHBpcnkiOjE3NDk1OTk5OTksImlzU3ViZG9tYWluIjp0cnVlfQ=="
        />

        {/* Origin Trial Token for AI Translator */}
        <meta
          httpEquiv="Origin-Trial"
          content="AuTbatY1CvPpcQgXcxNti0e7jCk/4ryzA9ldCX6EPKQK9I95mu2WE50+lyvuzmBVhSUSOrr0QmcltZUWDSKXKggAAACLeyJvcmlnaW4iOiJodHRwczovL3BoYXJlZWRhaGFkYW11LXN1bW1hcml6ZXItdHJhbnNsYXRvci5uZXRsaWZ5LmFwcDo0NDMiLCJmZWF0dXJlIjoiVHJhbnNsYXRpb25BUEkiLCJleHBpcnkiOjE3NTMxNDI0MDAsImlzU3ViZG9tYWluIjp0cnVlfQ=="
        />

        {/* Origin Trial Token for AI Summarizer */}
        <meta
          httpEquiv="Origin-Trial"
          content="AvENn/7//IswDtswsFct8KsuCoNJKA+3VPjbiFLMTz/VQhrkaREDN/Cas1zV/pnICbl2fhnnV31UcPWur+ijbwUAAACPeyJvcmlnaW4iOiJodHRwczovL3BoYXJlZWRhaGFkYW11LXN1bW1hcml6ZXItdHJhbnNsYXRvci5uZXRsaWZ5LmFwcDo0NDMiLCJmZWF0dXJlIjoiQUlTdW1tYXJpemF0aW9uQVBJIiwiZXhwaXJ5IjoxNzUzMTQyNDAwLCJpc1N1YmRvbWFpbiI6dHJ1ZX0="
        />
      </Head>
      <body
        className={`${monty.variable} antialiased px-[24px] h-[100dvh] flex justify-center items-start w-[100%]`}
      >
        {children}
      </body>
    </html>
  );
}
