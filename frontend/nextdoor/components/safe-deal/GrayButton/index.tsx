interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  txt: string;
}

export default function GrayButton({ txt, ...props }: ButtonProps) {
  return (
    <button type="submit" className="w-full" {...props}>
      <div className="btn w-full h-14 bg-gray500 text-white">{txt}</div>
    </button>
  );
}
