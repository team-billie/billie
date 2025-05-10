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
  return (
    <div className="mt-2">
      <label
        className={`flex items-center justify-center w-full px-4 py-2 border ${
          disabled
            ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
            : "border-blue-300 bg-blue-50 text-blue-500 hover:bg-blue-100 cursor-pointer"
        } rounded-md transition-colors`}
      >
        <span className="mr-2">{disabled ? "업로드 불가" : "파일 선택"}</span>
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
        />
      </label>
      <p className="text-xs text-gray-500 mt-1 text-center">
        {multiple ? `최대 ${maxFiles}장까지 업로드 가능합니다` : ""}
      </p>
    </div>
  );
}
