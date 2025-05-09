import Image from "next/image";

interface ImagePreviewProps {
  preview: string;
  status: string;
  onDelete?: () => void;
  isMultiple?: boolean;
}

export default function ImagePreview({
  preview,
  status,
  onDelete,
  isMultiple = false,
}: ImagePreviewProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: isMultiple ? "120px" : "200px",
        marginBottom: isMultiple ? "0" : "10px",
      }}
      className="rounded-md overflow-hidden group"
    >
      <Image
        src={preview}
        alt={`${status} 이미지`}
        fill
        style={{
          objectFit: "cover",
        }}
      />

      {/* 삭제 버튼 */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="이미지 삭제"
        >
          ✕
        </button>
      )}
    </div>
  );
}
