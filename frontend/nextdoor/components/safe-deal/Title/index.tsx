interface TitleProps {
  status: string;
}

export default function Title({ status }: TitleProps) {
  const title = status === "before" ? "대여" : "반납";
  const subtitle = status === "before" ? "대여 전" : "반납 후";
  return (
    <div className="p-5 mt-2">
      <div className="font-bold text-xl text-white">
        나의 {title} 물품의 상태는 어떨까?
      </div>
      <div className="text-gray500 mt-2">
        <div>AI를 통해 {subtitle} 물품의 상태를 체크해 보세요</div>
      </div>
    </div>
  );
}
