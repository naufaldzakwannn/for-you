import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Untuk Kamu Sayang 💕",
  description: "Sebuah halaman kecil yang penuh cinta untukmu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
