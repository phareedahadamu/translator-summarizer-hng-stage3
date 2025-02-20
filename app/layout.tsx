import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Head } from "next/head";

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
          content="AtiklNgJkoIGXstgg+ZsOS2JN/e3pGLhZnLJoOpatbyDdy1d8YqOIswvCd/MagragZSHXbig7XhyCH4jUKhQNgUAAAB+eyJvcmlnaW4iOiJodHRwczovL3BoYXJlZWRhaGFkYW11LXN1bW1hcml6ZXItdHJhbnNsYXRvci5uZXRsaWZ5LmFwcDo0NDMiLCJmZWF0dXJlIjoiTGFuZ3VhZ2VEZXRlY3Rpb25BUEkiLCJleHBpcnkiOjE3NDk1OTk5OTl9"
        />

        {/* Origin Trial Token for AI Translator */}
        <meta
          httpEquiv="Origin-Trial"
          content="AvqeNOiAF964R6O647XbWppy+tmOiff1Vaz2lsGVjE1ul9nuaDhgF4XXO11V6O0GTsugwlVDS01OvSdTM0nGyQoAAAB4eyJvcmlnaW4iOiJodHRwczovL3BoYXJlZWRhaGFkYW11LXN1bW1hcml6ZXItdHJhbnNsYXRvci5uZXRsaWZ5LmFwcDo0NDMiLCJmZWF0dXJlIjoiVHJhbnNsYXRpb25BUEkiLCJleHBpcnkiOjE3NTMxNDI0MDB9"
        />

        {/* Origin Trial Token for AI Summarizer */}
        <meta
          httpEquiv="Origin-Trial"
          content="AhPwzm+mBkYX5MDJ6CxFLTx32qJgQMewSZGNICBaT6Qr5xKzPGq48lRFqSFMg8pDktIbsS3bh+Jo4mqTiqT2RgEAAAB8eyJvcmlnaW4iOiJodHRwczovL3BoYXJlZWRhaGFkYW11LXN1bW1hcml6ZXItdHJhbnNsYXRvci5uZXRsaWZ5LmFwcDo0NDMiLCJmZWF0dXJlIjoiQUlTdW1tYXJpemF0aW9uQVBJIiwiZXhwaXJ5IjoxNzUzMTQyNDAwfQ=="
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
