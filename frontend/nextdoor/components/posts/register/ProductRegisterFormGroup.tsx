"use client";

interface ProductRegisterFormGroupProps {
  title: string;
  children: React.ReactNode;
}

export default function ProductRegisterFormGroup({ title, children }: ProductRegisterFormGroupProps) {
  return (
    <div className="mb-6 px-4">
      <h3 className="text-gray-900 font-medium mb-2">{title}</h3>
      {children}
    </div>
  );
}
