interface BlueLongBtnProps {
  txt: string;
  handleBtn: () => void;
}

export default function BlueLongBtn({ txt, handleBtn }: BlueLongBtnProps) {
  <div className="px-4 w-full">
    <button
      className="btn w-full h-14 bg-gradient-to-r from-blue200 to-blue400 text-white"
      onClick={handleBtn}
    >
      {txt}
    </button>
  </div>;
}
