interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    txt: string;
    state: boolean;
}

export default function Button({txt, state, ...props}: ButtonProps) {
  return (
    <button type="submit" className="w-full" {...props}>
        <div className={`
        ${state ? "bg-blue400 text-white" : "bg-gray400 text-gray700" }
        text-center py-4 font-bold rounded-lg`}>
        {txt}
        </div>
    </button>
  );
}

