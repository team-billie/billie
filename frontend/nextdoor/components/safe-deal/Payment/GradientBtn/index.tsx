interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  txt: string;
}

export default function GradientButton({ txt, ...props }: ButtonProps) {
  return (
    <button type="submit" className="w-full" {...props}>
      <div className="btn w-full h-16 bg-graygradient text-gray100 rounded-xl">
        {txt}
      </div>
    </button>
  );
}
