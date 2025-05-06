interface ButtonProps {
    txt: string;
    state: boolean;
}

export default function Button({txt, state}: ButtonProps) {
  return (
    <button type="submit" className="w-full">
        <div className={`
        ${state ? "bg-blue400 text-white" : "bg-gray400 text-gray600" }
        text-center py-4 font-bold rounded-lg`}>
        {txt}
        </div>
    </button>
  );
}

