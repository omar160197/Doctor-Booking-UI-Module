import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <html lang="en">
        <body cz-shortcut-listen="true">{children}</body>
      </html>
    </>
  );
}
