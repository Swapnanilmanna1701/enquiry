import type { Metadata } from "next";
//import localFont from "next/font/local";
import "./globals.css";



export const metadata: Metadata = {
  title: "SupportScribe - AI-Powered Customer Communication",
  description: "Effortlessly manage customer inquiries and generate email content with AI. Streamline your communication process and enhance customer satisfaction with SupportScribe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}