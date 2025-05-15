interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  txt: string;
}

export default function Button({ txt, ...props }: ButtonProps) {
  return (
    <button type="submit" className="w-full" {...props}>
      <div className="btn w-full h-14 bg-gradient-to-r from-blue200 to-blue400 text-white">
        {txt}
      </div>
    </button>
  );
}
