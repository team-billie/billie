import { useEffect, useState } from "react";

interface AlertModalProps {
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

const typeStyles = {
  success: "text-blue400",
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue400",
};

export default function AlertModal({
  title,
  message,
  type = "info",
  onClose,
}: AlertModalProps) {
  const [visible, setVisible] = useState(true);
  const colorClass = typeStyles[type];

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }, 1500);

    return () => clearTimeout(closeTimer);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      } bg-black bg-opacity-30`}
    >
      <div
        className={`inline-block max-w-[90vw] px-6 py-8 text-center shadow-xl transform transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } bg-white rounded-xl`}
      >
        <h2 className={`text-2xl font-semibold mb-4 ${colorClass}`}>{title}</h2>
        <p className="text-gray-900 text-lg break-words whitespace-pre-line">
          {message}
        </p>
      </div>
    </div>
  );
}
