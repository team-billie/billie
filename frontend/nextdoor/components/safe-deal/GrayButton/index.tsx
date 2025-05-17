interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  txt: string;
}

export default function GrayButton({ txt, ...props }: ButtonProps) {
  return (
    <button type="submit" className="w-full" {...props}>
      <div className="btn w-full h-16  bg-btncolor text-gray900 rounded-xl">
        {txt}
      </div>
    </button>
  );
}
