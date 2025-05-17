// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { AlertModalProvider } from "@/lib/providers/AlertModalProvider";
// import DraggableWidget from "@/components/common/RentalWidget";
import WidgetProvider from "@/lib/providers/WidgetProvider";
import FloatingWidget from "@/components/common/RentalWidget/FloatingWidget";

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",  
  initialScale: 1,
  minimumScale: 1,
  shrinkToFit: "no",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    template: "%s | 옆집물건",
    default: "옆집물건",
  },
  description: "필요한 물건을 주위에서 빌려보세요",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-[100dvh] max-w-md mx-auto bg-white relative">
        <AlertModalProvider>
          <WidgetProvider>
          {children}
          {/* <FloatingWidget /> */}
          </WidgetProvider>
        </AlertModalProvider>
      </body>
    </html>
  );
}