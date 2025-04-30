import { ReactNode } from 'react';

export default function TabsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="max-w-screen-sm mx-auto">
      {children}
    </div>
  );
}
