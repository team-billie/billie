// app/layout.tsx
import { ReactNode } from "react";
import SafeDealNavbar from "@/components/reservations/safe-deal/SafeDealNavbar";

export const metadata = {
  title: "AI 안심거래",
  description: "AI 안심거래 페이지입니다",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="max-w-screen-sm mx-auto bg-white min-h-screen flex flex-col">
        <SafeDealNavbar />
        <main className="h-screen min-w-full">{children}</main>
      </body>
    </html>
  );
}
