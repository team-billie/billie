import useUserStore from "@/lib/store/useUserStore";

interface FileUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  disabled?: boolean;
  accept?: string;
  maxFiles?: number;
}

export default function FileUpload({
  onChange,
  multiple = false,
  disabled = false,
  accept = "image/*",
  maxFiles = 10,
}: FileUploadProps) {
  const { userId } = useUserStore();
  console.log("FileUpload userId:", userId);

  if (!userId) {
    return null;
  }

  return (
    <div className="w-full h-28 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200">
      <label
        className={`flex flex-col items-center justify-center w-full h-full cursor-pointer rounded-lg transition-all
          ${
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-blue-50 text-gray-500"
          }
        `}
      >
        <svg
          className="w-8 h-8 mb-2 text-gray500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
        />
      </label>
    </div>
  );
}
