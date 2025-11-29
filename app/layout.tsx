import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goosestagram",
  description: "It's Instagram, but for Geese!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
