import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

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
      <body
        className={`${monty.variable} antialiased px-[24px] h-[100dvh] flex justify-center items-start w-[100%]`}
      >
        {children}
      </body>
    </html>
  );
}
