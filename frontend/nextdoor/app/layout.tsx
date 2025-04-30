import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | 옆집물건",
    default: "옆집물건",
  },
  description: "필요한 물건을 주위에서 빌려보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`max-w-screen-sm mx-auto`}>{children}</body>
    </html>
  );
}
