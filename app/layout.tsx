import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataCenterAIOps",
  description: "Open-source AIOps control center for logs, metrics, traces, and incidents."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
