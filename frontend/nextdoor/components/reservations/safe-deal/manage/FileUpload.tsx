interface FileUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

export default function FileUpload({
  onChange,
  multiple = false,
}: FileUploadProps) {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      multiple={multiple}
      className="w-full text-sm text-gray-500 
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
    />
  );
}
