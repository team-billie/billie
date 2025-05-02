import MainDock from "@/components/common/Dock/MainDock";
import { ReactNode } from "react";

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-screen-sm mx-auto relative">
      {children}
      <MainDock />
    </div>
  );
}
