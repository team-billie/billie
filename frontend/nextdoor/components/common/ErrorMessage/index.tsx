import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg shadow-sm animate-fade-in">
      <AlertCircle className="w-5 h-5" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
