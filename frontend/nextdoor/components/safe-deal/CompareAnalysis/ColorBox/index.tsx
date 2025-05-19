interface ColorBoxProps {
  txt: string;
  num: number;
}

export default function ColorBox({ txt, num }: ColorBoxProps) {
  // num 값에 따라 bg 색상 클래스 결정
  const bgColorClass =
    num > 2 ? "bg-red100" : num > 0 ? "bg-yellow100" : "bg-gray800";
  const textColorClass = num > 0 ? "text-gray900" : "text-white";

  return (
    <div
      className={`flex flex-col justify-center items-center w-1/4 h-24 rounded-3xl ${bgColorClass} ${textColorClass}`}
    >
      <div className="font-bold text-2xl">{num}</div>
      <div className="text-xs">{txt}</div>
    </div>
  );
}
