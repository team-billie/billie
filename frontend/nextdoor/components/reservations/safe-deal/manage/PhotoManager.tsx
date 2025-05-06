import Image from "next/image";
// 1. 이미지 도메인 next.config.mjs 에 설정 해야함.
// 2. Image 컴포넌트를 사용함. -> 가변적으로 하고 싶으면 껍데기를 relative, Image fill, objectFit cover or contain

export default function PhotoManager({ status }: { status: string }) {
  return (
    <div className="flex-1 w-full p-3">
      <div className="flex text-xl text-gray900">{status}</div>
      <div className="text-sm text-gray600 pb-1">1장 등록됨</div>
      {/* <div className="bg-slate-600 h-52 w-52 rounded-md"></div> */}
      {/* <Image
        src="https://picsum.photos/seed/picsum/200/300"
        alt="이미지"
        width={50}
        height={50}
      /> */}
      <div
        style={{
          position: "relative", // 무조건있어야함
          width: "100%",
          height: "100px",
          backgroundColor: "red",
        }}
      >
        <Image
          src="https://picsum.photos/seed/picsum/200/300"
          alt="이미지"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <input type="file" />
    </div>
  );
}
