interface RentalDetailBtnProps {
  onClick?: () => void;
}

export default function RentalDetailBtn({ onClick }: RentalDetailBtnProps) {
  return (
    <button
      className="flex-1 py-2 hover:bg-gray-100 cursor-pointer text-center"
      onClick={onClick}
    >
      상세보기
    </button>
  );
}
