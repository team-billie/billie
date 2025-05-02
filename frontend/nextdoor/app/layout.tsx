import type { Metadata } from "next";
import "./globals.css";

export const viewport = {
  themeColor: "#ffffff",
};


export const metadata: Metadata = {
  title: {
    template: "%s | 옆집물건",
    default: "옆집물건",
  },
  description: "필요한 물건을 주위에서 빌려보세요",
  manifest: "/manifest.json",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen max-w-md mx-auto bg-white">{children}</body>
    </html>
  );
}
